import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { PDFDocument, PageSizes, StandardFonts, rgb } from 'pdf-lib'

import { readProfileData } from './profile-data.mjs'

const repository = fileURLToPath(new URL('../', import.meta.url))
const margin = 48
const ink = rgb(42 / 255, 35 / 255, 51 / 255)
const muted = rgb(109 / 255, 100 / 255, 119 / 255)
const accent = rgb(111 / 255, 58 / 255, 187 / 255)

const wrap = (text, font, size, availableWidth) => {
  const lines = []
  let line = ''
  for (const word of text.trim().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= availableWidth) {
      line = candidate
      continue
    }
    if (line) lines.push(line)
    line = ''
    // Break long URLs/words rather than drawing outside the page.
    for (const character of word) {
      if (font.widthOfTextAtSize(line + character, size) > availableWidth) {
        lines.push(line)
        line = ''
      }
      line += character
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function createResume(data, details) {
  const profile = data['Profile.csv'][0]
  const name = profile['First Name']
  if (!name)
    throw new Error('Profile.csv: First Name is required for the résumé')
  if (!Array.isArray(details.contacts) || !Array.isArray(details.education)) {
    throw new TypeError('resume.json: contacts and education must be arrays')
  }
  const document = await PDFDocument.create()
  const [regular, semibold] = await Promise.all([
    document.embedFont(StandardFonts.Helvetica),
    document.embedFont(StandardFonts.HelveticaBold),
  ])
  document.setTitle(`${name} — Résumé`)
  document.setAuthor(name)
  document.setSubject(profile.Headline)
  document.setLanguage('en')

  const [width, height] = PageSizes.A4
  const contentWidth = width - 2 * margin
  let page
  let y
  const newPage = () => {
    page = document.addPage(PageSizes.A4)
    y = height - margin
  }
  newPage()
  const ensure = (space) => {
    if (y - space < margin) newPage()
  }
  const block = (text, options = {}) => {
    const {
      size = 10,
      bold = false,
      color = ink,
      indent = 0,
      gap = 5,
    } = options
    const font = bold ? semibold : regular
    const lineHeight = size * 1.45
    const lines = wrap(text, font, size, contentWidth - indent)
    return { lines, font, size, color, indent, gap, lineHeight }
  }
  const draw = (item) => {
    for (const line of item.lines) {
      ensure(item.lineHeight)
      y -= item.lineHeight
      page.drawText(line, {
        x: margin + item.indent,
        y,
        size: item.size,
        font: item.font,
        color: item.color,
      })
    }
    y -= item.gap
  }
  const group = (items) => {
    const space = items.reduce(
      (total, item) => total + item.lines.length * item.lineHeight + item.gap,
      0
    )
    if (space <= height - 2 * margin) ensure(space)
    for (const item of items) draw(item)
  }
  const heading = (title, followingSpace = 40) => {
    ensure(35 + followingSpace)
    y -= 10
    draw(
      block(title.toUpperCase(), {
        size: 10,
        bold: true,
        color: accent,
        gap: 9,
      })
    )
  }

  draw(block(name, { size: 28, bold: true, gap: 0 }))
  draw(block(profile.Headline, { size: 13, bold: true, color: accent, gap: 5 }))
  if (profile['Geo Location'])
    draw(block(profile['Geo Location'], { color: muted }))
  for (const contact of details.contacts)
    draw(block(contact, { size: 9, color: muted, gap: 0 }))
  y -= 10
  heading('About')
  for (const paragraph of profile.Summary.replaceAll(
    String.raw`\n`,
    '\n'
  ).split(/\n+/)) {
    if (paragraph.trim()) draw(block(paragraph, { gap: 7 }))
  }
  heading('Experience', 90)
  for (const position of data['Positions.csv']) {
    const bullets = position.Description.replaceAll(String.raw`\n`, '\n')
      .split(/(?:^|\s+)-\s+/)
      .map((bullet) => bullet.trim())
      .filter(Boolean)
    const items = [
      block(position.Title, { size: 11, bold: true, gap: 1 }),
      block(position['Company Name'], { bold: true, gap: 1 }),
      block(
        `${position['Started On']} – ${position['Finished On'] || 'Present'}`,
        { size: 9, color: muted, gap: 1 }
      ),
      ...(position.Location
        ? [block(position.Location, { size: 9, color: muted, gap: 4 })]
        : []),
      ...bullets.map((bullet) => block(`• ${bullet}`, { indent: 8, gap: 3 })),
    ]
    group(items)
    y -= 9
  }
  if (details.education.length > 0) {
    heading('Education')
    for (const entry of details.education) {
      group([
        block(entry.degree, { bold: true }),
        block(entry.school, { color: muted }),
      ])
    }
  }
  heading('Skills')
  draw(block(data['Skills.csv'].map((skill) => skill.Name).join(' · ')))

  const pages = document.getPages()
  for (const [index, currentPage] of pages.entries()) {
    currentPage.drawLine({
      start: { x: margin, y: 38 },
      end: { x: width - margin, y: 38 },
      color: rgb(226 / 255, 221 / 255, 231 / 255),
      thickness: 0.5,
    })
    currentPage.drawText(`${name} · Résumé`, {
      x: margin,
      y: 24,
      size: 8,
      font: regular,
      color: muted,
    })
    const count = `${index + 1} / ${pages.length}`
    currentPage.drawText(count, {
      x: width - margin - regular.widthOfTextAtSize(count, 8),
      y: 24,
      size: 8,
      font: regular,
      color: muted,
    })
  }
  return document.save()
}

export async function generateResume(root = repository) {
  const [data, details] = await Promise.all([
    readProfileData(root, ['Profile.csv', 'Positions.csv', 'Skills.csv']),
    readFile(path.join(root, 'src/data/resume.json'), 'utf8').then(JSON.parse),
  ])
  // Validate and render completely before replacing the previous PDF.
  const bytes = await createResume(data, details)
  const directory = path.join(root, 'public/documents')
  await mkdir(directory, { recursive: true })
  const output = path.join(directory, 'resume.pdf')
  const temporary = `${output}.${process.pid}.tmp`
  try {
    await writeFile(temporary, bytes)
    await rename(temporary, output)
  } finally {
    await rm(temporary, { force: true })
  }
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  await generateResume()
}

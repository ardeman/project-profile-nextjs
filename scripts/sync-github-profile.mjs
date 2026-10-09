import { readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { readProfileData } from './profile-data.mjs'

const repository = fileURLToPath(new URL('../', import.meta.url))

function html(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function markdown(value) {
  return html(value).replaceAll(/([!#*[\\\]_`{|}])/g, String.raw`\$1`)
}

export function renderGithubProfile(data) {
  const profile = data['Profile.csv'][0]
  if (!profile['First Name']) throw new Error('Profile.csv: empty First Name')
  const roles = data['Positions.csv'].slice(0, 3).map((position) => {
    const bullets = position.Description.replaceAll(String.raw`\n`, '\n')
      .split(/(?:^|\s+)-\s+/)
      .map((bullet) => bullet.trim())
      .filter(Boolean)
    return [
      `### ${markdown(position.Title)} · ${markdown(position['Company Name'])}`,
      `${markdown(position['Started On'])} – ${markdown(
        position['Finished On'] || 'Present'
      )}${position.Location ? ` · ${markdown(position.Location)}` : ''}`,
      bullets.map((bullet) => `- ${markdown(bullet)}`).join('\n'),
    ]
      .filter(Boolean)
      .join('\n\n')
  })
  return {
    intro: [
      `<h1 align="center">${html(profile['First Name'])}</h1>`,
      `<p align="center"><strong>${html(profile.Headline)}</strong></p>`,
      `<p align="center">${html(
        data['Profile Summary.csv'][0]['Profile Summary']
      )}</p>`,
    ].join('\n\n'),
    details: [
      '## About',
      profile.Summary.replaceAll(String.raw`\n`, '\n')
        .split(/\n+/)
        .map((paragraph) => markdown(paragraph))
        .join('\n\n'),
      '## Working with',
      data['Skills.csv']
        .map((skill) => `<code>${html(skill.Name)}</code>`)
        .join(' · '),
      '<details>\n<summary><strong>Recent experience</strong></summary>',
      ...roles,
      '[View my full résumé](https://ardeman.com/documents/resume.pdf)',
      '</details>',
    ].join('\n\n'),
  }
}

export function updateManagedSections(readme, sections) {
  // Require unique, correctly ordered markers before changing any section.
  const ranges = Object.entries(sections)
    .map(([name, content]) => {
      const start = `<!-- portfolio-profile:${name}:start -->`
      const end = `<!-- portfolio-profile:${name}:end -->`
      if (readme.split(start).length !== 2 || readme.split(end).length !== 2) {
        throw new Error(`README.md: expected one pair of ${name} markers`)
      }
      const from = readme.indexOf(start) + start.length
      const to = readme.indexOf(end)
      if (from > to) throw new Error(`README.md: reversed ${name} markers`)
      return { from, to, content: `\n\n${content}\n\n` }
    })
    .sort((left, right) => left.from - right.from)
  for (let index = 1; index < ranges.length; index++) {
    if (ranges[index].from < ranges[index - 1].to)
      throw new Error('README.md: overlapping managed sections')
  }
  for (const range of ranges.reverse()) {
    readme =
      readme.slice(0, range.from) + range.content + readme.slice(range.to)
  }
  return readme
}

export async function syncGithubProfile(filename, root = repository) {
  const sections = renderGithubProfile(await readProfileData(root))
  const original = await readFile(filename, 'utf8')
  const updated = updateManagedSections(original, sections)
  if (updated === original) return false
  const temporary = `${filename}.${process.pid}.tmp`
  await writeFile(temporary, updated)
  await rename(temporary, filename)
  return true
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  if (process.argv.length !== 3)
    throw new Error('Usage: pnpm sync:github-profile /path/to/README.md')
  await syncGithubProfile(path.resolve(process.argv[2]))
}

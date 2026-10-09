import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { decodePDFRawStream, PDFDocument } from 'pdf-lib'

import { createResume, generateResume } from './generate-resume.mjs'

const data = {
  'Profile.csv': [
    {
      'First Name': 'Ardeman',
      Headline: 'Engineer',
      Summary: String.raw`Build interfaces.\nLead teams.`,
      'Geo Location': 'Jakarta, Indonesia',
    },
  ],
  'Positions.csv': [
    {
      'Company Name': 'Example, Inc.',
      Title: 'Lead',
      Description: '- Build back-office tools. - Review code.',
      Location: 'Jakarta',
      'Started On': 'May 2023',
      'Finished On': '',
    },
  ],
  'Skills.csv': [{ Name: 'React.js' }, { Name: 'SQL' }],
}
const details = {
  contacts: ['https://ardeman.com'],
  education: [
    { degree: 'Bachelor of Engineering', school: 'Universitas Syiah Kuala' },
  ],
}

function extractText(document) {
  const decoder = new TextDecoder('windows-1252')
  return document
    .getPages()
    .flatMap((page) =>
      page.node
        .Contents()
        .asArray()
        .flatMap((reference) => {
          const operators = Buffer.from(
            decodePDFRawStream(document.context.lookup(reference)).decode()
          ).toString()
          return [...operators.matchAll(/<([\dA-Fa-f]+)> Tj/g)].map((match) =>
            decoder.decode(Buffer.from(match[1], 'hex'))
          )
        })
    )
    .join(' ')
}

test('generates a readable A4 PDF with profile, history, skills and preserved details', async () => {
  const document = await PDFDocument.load(await createResume(data, details))
  assert.equal(document.getTitle(), 'Ardeman — Résumé')
  assert.equal(document.getPageCount(), 1)
  const { width, height } = document.getPages()[0].getSize()
  assert.ok(Math.abs(width - 595.28) < 1)
  assert.ok(Math.abs(height - 841.89) < 1)
  const text = extractText(document)
  for (const expected of [
    'Ardeman',
    'Engineer',
    'Build interfaces.',
    'Lead teams.',
    'May 2023 – Present',
    'Build back-office tools.',
    'Review code.',
    'React.js · SQL',
    details.contacts[0],
    details.education[0].school,
  ]) {
    assert.ok(text.includes(expected), expected)
  }
})

test('paginates long experience and wraps oversized words without losing the last role', async () => {
  const expanded = {
    ...data,
    'Positions.csv': Array.from({ length: 15 }, (_, index) => ({
      ...data['Positions.csv'][0],
      Title: `Role ${index + 1}`,
      Description: `- ${'Implementation '.repeat(75)} - ${'LongWord'.repeat(
        30
      )}`,
    })),
  }
  const document = await PDFDocument.load(await createResume(expanded, details))
  assert.ok(document.getPageCount() > 1)
  const text = extractText(document)
  assert.ok(text.includes('Role 15'))
  assert.ok(text.includes('SKILLS'))
  assert.ok(text.includes('React.js · SQL'))
})

test('CSV or rendering errors preserve the previously generated PDF', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'resume-export-'))
  try {
    await mkdir(path.join(root, 'public/linkedin'), { recursive: true })
    await mkdir(path.join(root, 'src/data'), { recursive: true })
    const inputs = {
      'Profile.csv': 'First Name,Headline,Summary\nArdeman,Engineer,About',
      'Positions.csv':
        'Company Name,Title,Description,Location,Started On,Finished On\nExample,Lead,- Build tools.,Jakarta,May 2023,',
      'Skills.csv': 'Name\nReact.js\nSQL',
    }
    for (const [filename, content] of Object.entries(inputs)) {
      await writeFile(path.join(root, 'public/linkedin', filename), content)
    }
    await writeFile(
      path.join(root, 'src/data/resume.json'),
      JSON.stringify(details)
    )
    await generateResume(root)
    const output = path.join(root, 'public/documents/resume.pdf')
    const previous = await readFile(output)
    await writeFile(
      path.join(root, 'public/linkedin/Skills.csv'),
      'Wrong column\nReact.js'
    )
    await assert.rejects(generateResume(root), /Skills\.csv:/)
    assert.deepEqual(await readFile(output), previous)
    await writeFile(
      path.join(root, 'public/linkedin/Skills.csv'),
      inputs['Skills.csv']
    )
    await writeFile(
      path.join(root, 'public/linkedin/Profile.csv'),
      'First Name,Headline,Summary\nArdeman,Engineer,Unsupported 🐣'
    )
    await assert.rejects(generateResume(root), /cannot encode/)
    assert.deepEqual(await readFile(output), previous)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

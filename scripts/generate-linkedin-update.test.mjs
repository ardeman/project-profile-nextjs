import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import {
  generateLinkedinUpdate,
  parseProfileCsv,
  renderLinkedinUpdate,
} from './generate-linkedin-update.mjs'

const fixtures = {
  'Profile.csv':
    'Headline,Summary,Address\nEngineer,"Build interfaces.\\nLead teams, too.",PRIVATE',
  'Profile Summary.csv': 'Profile Summary\n"Clear, useful interfaces."',
  'Positions.csv':
    'Company Name,Title,Description,Location,Started On,Finished On\n"Example, Inc.",Lead,"- Build back-office tools. - Review code.",Jakarta,May 2023,',
  'Skills.csv': 'Name\nReact.js\nSQL\n',
}

test('renders quoted CSV, paragraphs, current roles and intact hyphenated words', () => {
  const data = Object.fromEntries(
    Object.entries(fixtures).map(([filename, source]) => [
      filename,
      parseProfileCsv(source, filename),
    ])
  )
  const draft = renderLinkedinUpdate(data)
  assert.match(draft, /Build interfaces\.\n\nLead teams, too\./)
  assert.match(draft, /Lead \| Example, Inc\./)
  assert.match(draft, /May 2023 – Present/)
  assert.match(draft, /- Build back-office tools\.\n- Review code\./)
  assert.match(draft, /React\.js\nSQL/)
  assert.match(draft, /Clear, useful interfaces\./)
  assert.doesNotMatch(draft, /PRIVATE/)
})

test('rejects malformed, missing, empty and multiple profile records', () => {
  for (const source of [
    'Headline,Summary\nEngineer,"unfinished',
    'Headline\nEngineer',
    'Headline,Summary\nEngineer,',
    'Headline,Summary\n',
    'Headline,Summary\nEngineer,About\nOther,About',
  ]) {
    assert.throws(() => parseProfileCsv(source, 'Profile.csv'), /Profile\.csv:/)
  }
})

test('writes a draft and preserves it if a later input is invalid', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'linkedin-draft-'))
  try {
    const input = path.join(root, 'public/linkedin')
    await mkdir(input, { recursive: true })
    await Promise.all(
      Object.entries(fixtures).map(([filename, source]) =>
        writeFile(path.join(input, filename), source)
      )
    )
    await generateLinkedinUpdate(root)
    const output = path.join(root, 'build/linkedin-update/linkedin-profile.txt')
    const previous = await readFile(output, 'utf8')
    assert.match(previous, /HEADLINE\n\nEngineer/)
    const readOutput = (filename) =>
      readFile(path.join(root, 'build/linkedin-update', filename), 'utf8')
    assert.equal(await readOutput('headline.txt'), 'Engineer\n')
    assert.equal(
      await readOutput('about.txt'),
      'Build interfaces.\n\nLead teams, too.\n'
    )
    assert.equal(await readOutput('skills.txt'), 'React.js\nSQL\n')
    assert.match(await readOutput('experience.txt'), /Lead \| Example, Inc\./)
    assert.equal(
      await readOutput('introduction.txt'),
      'Clear, useful interfaces.\n'
    )
    const checklist = await readOutput('manual-sync-checklist.txt')
    assert.match(checklist, /\[ ] Role 1: Lead \| Example, Inc\./)
    assert.match(checklist, /compare all 2 entries/)
    assert.match(checklist, /has not read your current LinkedIn profile/)
    await writeFile(path.join(input, 'Skills.csv'), 'Wrong column\nReact.js')
    await assert.rejects(generateLinkedinUpdate(root), /Skills\.csv:/)
    assert.equal(await readFile(output, 'utf8'), previous)
    assert.equal(await readOutput('manual-sync-checklist.txt'), checklist)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

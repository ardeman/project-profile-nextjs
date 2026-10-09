import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import Papa from 'papaparse'

const repository = fileURLToPath(new URL('../', import.meta.url))
const schemas = {
  'Profile.csv': ['Headline', 'Summary'],
  'Profile Summary.csv': ['Profile Summary'],
  'Positions.csv': [
    'Company Name',
    'Title',
    'Description',
    'Location',
    'Started On',
    'Finished On',
  ],
  'Skills.csv': ['Name'],
}

export function parseProfileCsv(source, filename) {
  const result = Papa.parse(source, {
    header: true,
    delimiter: ',',
    skipEmptyLines: 'greedy',
    transform: (value) => value.trim(),
  })
  if (result.errors.length > 0) {
    throw new Error(`${filename}: ${result.errors[0].message}`)
  }
  for (const column of schemas[filename]) {
    if (!result.meta.fields?.includes(column)) {
      throw new Error(`${filename}: missing column ${column}`)
    }
  }
  if (result.data.length === 0) throw new Error(`${filename}: no content rows`)
  if (
    (filename === 'Profile.csv' || filename === 'Profile Summary.csv') &&
    result.data.length !== 1
  ) {
    throw new Error(`${filename}: expected one profile row`)
  }
  const optional = new Set(['Description', 'Location', 'Finished On'])
  for (const row of result.data) {
    for (const column of schemas[filename]) {
      if (!optional.has(column) && !row[column]) {
        throw new Error(`${filename}: empty ${column}`)
      }
    }
  }
  return result.data
}

function renderLinkedinSections(data) {
  const profile = data['Profile.csv'][0]
  const positions = data['Positions.csv'].map((position) => {
    const description = position.Description.replaceAll(String.raw`\n`, '\n')
      .split(/(?:^|\s+)-\s+/)
      .map((bullet) => bullet.trim())
      .filter(Boolean)
      .map((bullet) => `- ${bullet}`)
      .join('\n')
    return [
      `${position.Title} | ${position['Company Name']}`,
      `${position['Started On']} – ${position['Finished On'] || 'Present'}`,
      position.Location,
      description,
    ]
      .filter(Boolean)
      .join('\n')
  })
  return {
    headline: profile.Headline,
    about: profile.Summary.replaceAll(String.raw`\n`, '\n\n'),
    experience: positions.join('\n\n'),
    skills: data['Skills.csv'].map((skill) => skill.Name).join('\n'),
    introduction: data['Profile Summary.csv'][0]['Profile Summary'],
  }
}

export function renderLinkedinUpdate(
  data,
  sections = renderLinkedinSections(data)
) {
  return [
    'LINKEDIN PROFILE UPDATE DRAFT',
    'Review and paste the relevant sections into LinkedIn. This file does not update your account.',
    'HEADLINE',
    sections.headline,
    'ABOUT',
    sections.about,
    'EXPERIENCE',
    sections.experience,
    'SKILLS (review and add individually)',
    sections.skills,
    'OPTIONAL SHORT INTRODUCTION (portfolio copy; no separate LinkedIn profile field)',
    sections.introduction,
    '',
  ].join('\n\n')
}

export async function generateLinkedinUpdate(root = repository) {
  const entries = await Promise.all(
    Object.keys(schemas).map(async (filename) => [
      filename,
      parseProfileCsv(
        await readFile(path.join(root, 'public/linkedin', filename), 'utf8'),
        filename
      ),
    ])
  )
  // Validate every input before touching an existing draft.
  const data = Object.fromEntries(entries)
  const sections = renderLinkedinSections(data)
  const draft = renderLinkedinUpdate(data, sections)
  const checklist = [
    'MANUAL LINKEDIN SYNC CHECKLIST',
    '',
    'Open your LinkedIn profile while signed in and compare it with this export.',
    'This export reflects repository CSVs; it has not read your current LinkedIn profile.',
    '',
    '[ ] Review linkedin-profile.txt before making edits.',
    '[ ] Edit the profile headline using headline.txt and save.',
    '[ ] Edit About using about.txt and save.',
    '',
    'EXPERIENCE: use experience.txt to match each existing role by company, title and dates.',
    'Update matching roles; add a role only if it is missing. Review company and location selections.',
    ...data['Positions.csv'].map(
      (position, index) =>
        `[ ] Role ${index + 1}: ${position.Title} | ${
          position['Company Name']
        } | ${position['Started On']} – ${position['Finished On'] || 'Present'}`
    ),
    '',
    `SKILLS: compare all ${data['Skills.csv'].length} entries in skills.txt with your profile.`,
    '[ ] Add missing skills individually and check the displayed order.',
    '[ ] Review any LinkedIn roles or skills absent from the CSVs; remove only if intended.',
    '[ ] Reopen your profile and verify saved headline, About, roles, dates and skills.',
    '[ ] Record completion below and keep this checklist locally.',
    '',
    'Synced on: ____________________',
    'Source commit (shown in the Actions run summary, if applicable): ____________________',
    'Notes: ____________________',
    '',
    'introduction.txt is optional portfolio copy, not a separate LinkedIn profile field.',
    'Each new export has an unchecked checklist. Completing it does not notify GitHub.',
    '',
  ].join('\n')
  const output = path.join(root, 'build/linkedin-update')
  await mkdir(output, { recursive: true })
  await Promise.all(
    Object.entries({
      'linkedin-profile.txt': draft,
      'manual-sync-checklist.txt': checklist,
      ...Object.fromEntries(
        Object.entries(sections).map(([name, content]) => [
          `${name}.txt`,
          `${content}\n`,
        ])
      ),
    }).map(([filename, content]) =>
      writeFile(path.join(output, filename), content)
    )
  )
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  await generateLinkedinUpdate()
}

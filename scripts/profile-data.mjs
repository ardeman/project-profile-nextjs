import { readFile } from 'node:fs/promises'
import path from 'node:path'

import Papa from 'papaparse'

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

export async function readProfileData(root, filenames = Object.keys(schemas)) {
  const entries = await Promise.all(
    filenames.map(async (filename) => [
      filename,
      parseProfileCsv(
        await readFile(path.join(root, 'public/linkedin', filename), 'utf8'),
        filename
      ),
    ])
  )
  return Object.fromEntries(entries)
}

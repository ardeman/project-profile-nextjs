import { readFile } from 'node:fs/promises'
import path from 'node:path'

import Papa from 'papaparse'

import {
  LinkedinData,
  TPositions,
  TProfile,
  TProfileSummary,
  TSkills,
} from '@/types'

const readRows = async <T>(filename: string): Promise<T[]> => {
  const csv = await readFile(
    path.join(process.cwd(), 'public/linkedin', filename),
    'utf8'
  )
  const result = Papa.parse<T>(csv, {
    header: true,
    delimiter: ',',
    skipEmptyLines: true,
    transform: (value) => value.trim(),
  })
  if (result.errors.length > 0)
    throw new Error(`Invalid profile data: ${filename}`)
  return result.data
}

export const getProfile = async (): Promise<LinkedinData> => {
  const [profiles, summaries, positions, skills] = await Promise.all([
    readRows<TProfile>('Profile.csv'),
    readRows<TProfileSummary>('Profile Summary.csv'),
    readRows<TPositions>('Positions.csv'),
    readRows<TSkills>('Skills.csv'),
  ])
  if (!profiles[0]?.Headline || !summaries[0]?.['Profile Summary']) {
    throw new Error('Profile headline and summary are required')
  }
  return {
    profileData: {
      'First Name': profiles[0]['First Name'],
      Headline: profiles[0].Headline,
      Summary: profiles[0].Summary,
    },
    profileSummary: { 'Profile Summary': summaries[0]['Profile Summary'] },
    positions: positions
      .filter((position) => position['Company Name'])
      .map((position) => ({
        'Company Name': position['Company Name'],
        Title: position.Title,
        Description: position.Description,
        Location: position.Location,
        'Started On': position['Started On'],
        'Finished On': position['Finished On'],
      })),
    skills: skills.filter((skill) => skill.Name).map(({ Name }) => ({ Name })),
  }
}

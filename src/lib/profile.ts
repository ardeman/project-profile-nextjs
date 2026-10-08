import { readFile } from 'node:fs/promises'
import path from 'node:path'

import Papa from 'papaparse'

import { LinkedinData } from '@/contexts'
import { TPositions, TProfile, TProfileSummary, TSkills } from '@/types'

const readRows = async <T>(filename: string): Promise<T[]> => {
  const csv = await readFile(
    path.join(process.cwd(), 'public/linkedin', filename),
    'utf8'
  )
  const result = Papa.parse<T>(csv, {
    header: true,
    delimiter: ',',
    skipEmptyLines: true,
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
    profileData: profiles[0],
    profileSummary: summaries[0],
    positions: positions.filter((position) => position['Company Name']),
    skills: skills.filter((skill) => skill.Name),
  }
}

import Papa from 'papaparse'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  useGetPositions,
  useGetProfile,
  useGetProfileSummary,
  useGetSkills,
} from '@/hooks'
import { TPositions, TProfile, TProfileSummary, TSkills } from '@/types'

type LinkedinContextValue = {
  profileData: TProfile | null
  setProfileData: Dispatch<SetStateAction<TProfile | null>>
  profileSummary: TProfileSummary | null
  setProfileSummary: Dispatch<SetStateAction<TProfileSummary | null>>
  positions: TPositions[] | null
  setPositions: Dispatch<SetStateAction<TPositions[] | null>>
  skills: TSkills[] | null
  setSkills: Dispatch<SetStateAction<TSkills[] | null>>
}

const LinkedinContext = createContext<LinkedinContextValue | undefined>(
  undefined
)

const LinkedinProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [profileData, setProfileData] = useState<TProfile | null>(null)
  const [profileSummary, setProfileSummary] = useState<TProfileSummary | null>(
    null
  )
  const [positions, setPositions] = useState<TPositions[] | null>(null)
  const [skills, setSkills] = useState<TSkills[] | null>(null)

  const { data: profileDataCsv } = useGetProfile()
  const { data: profileSummaryCsv } = useGetProfileSummary()
  const { data: positionsCsv } = useGetPositions()
  const { data: skillsCsv } = useGetSkills()

  useEffect(() => {
    if (profileDataCsv) {
      Papa.parse<Record<string, string>>(profileDataCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const row = results.data[0]
          if (row) {
            setProfileData({
              'First Name': row['First Name'] || '',
              Headline: row.Headline || '',
              Summary: row.Summary || '',
              firstName: row['First Name'] || '',
              headline: row.Headline || '',
              summary: row.Summary || '',
            })
          }
        },
      })
    }
  }, [profileDataCsv])

  useEffect(() => {
    if (profileSummaryCsv) {
      Papa.parse<Record<string, string>>(profileSummaryCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const row = results.data[0]
          if (row) {
            setProfileSummary({
              'Profile Summary': row['Profile Summary'] || '',
              profileSummary: row['Profile Summary'] || '',
            })
          }
        },
      })
    }
  }, [profileSummaryCsv])

  useEffect(() => {
    if (positionsCsv) {
      Papa.parse<Record<string, string>>(positionsCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items: TPositions[] = results.data
            .filter((row) => Boolean(row['Company Name']))
            .map((row) => ({
              'Company Name': row['Company Name'] || '',
              Title: row.Title || '',
              Description: row.Description || '',
              Location: row.Location || '',
              'Started On': row['Started On'] || '',
              'Finished On': row['Finished On'] || '',
              companyName: row['Company Name'] || '',
              title: row.Title || '',
              description: row.Description || '',
              location: row.Location || '',
              startedOn: row['Started On'] || '',
              finishedOn: row['Finished On'] || '',
            }))
          setPositions(items)
        },
      })
    }
  }, [positionsCsv])

  useEffect(() => {
    if (skillsCsv) {
      Papa.parse<Record<string, string>>(skillsCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items: TSkills[] = results.data
            .filter((row) => Boolean(row.Name))
            .map((row) => ({
              Name: row.Name || '',
              name: row.Name || '',
            }))
          setSkills(items)
        },
      })
    }
  }, [skillsCsv])

  const value = {
    profileData,
    setProfileData,
    profileSummary,
    setProfileSummary,
    positions,
    setPositions,
    skills,
    setSkills,
  }

  return (
    <LinkedinContext.Provider value={value}>
      {children}
    </LinkedinContext.Provider>
  )
}

const useLinkedinContext = () => {
  const context = useContext(LinkedinContext)
  if (context === undefined) {
    throw new Error('useLinkedinContext must be used within a LinkedinProvider')
  }
  return context
}

export { LinkedinProvider, useLinkedinContext }

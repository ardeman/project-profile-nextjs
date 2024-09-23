'use client'

import Papa from 'papaparse'
import { useEffect } from 'react'

import { About, Experience, Footer } from '@/components'
import { useLinkedinContext } from '@/contexts'
import {
  useGetPositions,
  useGetProfile,
  useGetProfileSummary,
  useGetSkills,
} from '@/hooks'
import { TPositions, TProfile, TProfileSummary, TSkills } from '@/types'

import { Skills } from '../skill'

export const Homepage = () => {
  const { setProfileData, setProfileSummary, setPositions, setSkills } =
    useLinkedinContext()
  const { data: profileDataCsv } = useGetProfile()
  const { data: profileSummaryCsv } = useGetProfileSummary()
  const { data: positionsCsv } = useGetPositions()
  const { data: skillsCsv } = useGetSkills()

  useEffect(() => {
    if (profileDataCsv) {
      // Parse the CSV data
      Papa.parse(profileDataCsv, {
        header: true,
        complete: (results) => {
          const data = results.data as TProfile[]
          if (data.length > 0) {
            setProfileData(data[0]) // Set the first row of CSV as profileData
          }
        },
      })
    }
  }, [profileDataCsv, setProfileData])

  useEffect(() => {
    if (profileSummaryCsv) {
      // Parse the profile summary CSV
      Papa.parse(profileSummaryCsv, {
        header: true,
        complete: (results) => {
          const data = results.data as TProfileSummary[]
          if (data.length > 0) {
            setProfileSummary(data[0]) // Set the first row of CSV as profile summary
          }
        },
      })
    }
  }, [profileSummaryCsv, setProfileSummary])

  useEffect(() => {
    if (positionsCsv) {
      // Parse the positions CSV
      Papa.parse(positionsCsv, {
        header: true,
        complete: (results) => {
          const data = results.data as TPositions[]
          setPositions(data) // Set the CSV data as positions
        },
      })
    }
  }, [positionsCsv, setPositions])

  useEffect(() => {
    if (skillsCsv) {
      // Parse the skills CSV
      Papa.parse(skillsCsv, {
        header: true,
        complete: (results) => {
          const data = results.data as TSkills[]
          setSkills(data) // Set the CSV data as skills
        },
      })
    }
  }, [skillsCsv, setSkills])

  return (
    <main
      id="content"
      className="space-y-16 pt-24 md:space-y-24 lg:w-1/2 lg:space-y-36 lg:py-24"
    >
      <About />
      <Skills />
      <Experience />
      {/* <Projects /> */}
      {/* <Blog /> */}
      <Footer />
    </main>
  )
}

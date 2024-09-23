'use client'

import Papa from 'papaparse'
import { useEffect } from 'react'

import { About, Experience, Projects, Blog, Footer } from '@/components'
import { useLinkedinContext } from '@/contexts'
import { useGetProfile, useGetProfileSummary } from '@/hooks'
import { TProfile, TProfileSummary } from '@/types'

export const Homepage = () => {
  const { setProfileData, setProfileSummary } = useLinkedinContext()
  const { data: profileDataCsv } = useGetProfile()
  const { data: profileSummaryCsv } = useGetProfileSummary()

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

  return (
    <main
      id="content"
      className="space-y-16 pt-24 md:space-y-24 lg:w-1/2 lg:space-y-36 lg:py-24"
    >
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Footer />
    </main>
  )
}

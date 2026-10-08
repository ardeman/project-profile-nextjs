'use client'

import { createContext, useContext } from 'react'

import { TPositions, TProfile, TProfileSummary, TSkills } from '@/types'

export type LinkedinData = {
  profileData: TProfile
  profileSummary: TProfileSummary
  positions: TPositions[]
  skills: TSkills[]
}

const LinkedinContext = createContext<LinkedinData | undefined>(undefined)

export const LinkedinProvider = ({
  children,
  data,
}: {
  children: React.ReactNode
  data: LinkedinData
}) => (
  <LinkedinContext.Provider value={data}>{children}</LinkedinContext.Provider>
)

export const useLinkedinContext = () => {
  const context = useContext(LinkedinContext)
  if (!context)
    throw new Error('useLinkedinContext must be used within a LinkedinProvider')
  return context
}

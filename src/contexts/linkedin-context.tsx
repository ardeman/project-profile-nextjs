import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

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

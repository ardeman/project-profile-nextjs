import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { TProfile, TProfileSummary } from '@/types'

type LinkedinContextValue = {
  profileData: TProfile | null
  setProfileData: Dispatch<SetStateAction<TProfile | null>>
  profileSummary: TProfileSummary | null
  setProfileSummary: Dispatch<SetStateAction<TProfileSummary | null>>
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

  const value = {
    profileData,
    setProfileData,
    profileSummary,
    setProfileSummary,
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

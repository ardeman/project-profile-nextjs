import { Dispatch, SetStateAction } from 'react'

export type TProps = {
  setActiveSection: Dispatch<SetStateAction<string>>
  activeSection: string
}

export type TProfileSummary = {
  'Profile Summary': string
}

export type TProfile = {
  'First Name': string
  Headline: string
  Summary: string
}

export type TSocial = {
  name: string
  url: string
  icon: JSX.Element
}

export type TProfileSummary = {
  'Profile Summary': string
  profileSummary?: string
}

export type TProfile = {
  'First Name': string
  Headline: string
  Summary: string
  firstName?: string
  headline?: string
  summary?: string
}

export type TPositions = {
  'Company Name': string
  Title: string
  Description: string
  Location: string
  'Started On': string
  'Finished On': string
  companyName?: string
  title?: string
  description?: string
  location?: string
  startedOn?: string
  finishedOn?: string
}

export type TSkills = {
  Name: string
  name?: string
  category?: 'frontend' | 'backend' | 'languages' | 'tools'
}

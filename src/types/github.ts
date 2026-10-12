export type TGithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  license: { spdx_id: string } | null
  topics: string[]
  fork: boolean
  archived: boolean
}

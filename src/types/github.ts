export type TGithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  license: { name: string; spdx_id: string } | null
  topics: string[]
  fork: boolean
  archived: boolean
}

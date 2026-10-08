import axios from 'axios'

import { github } from '@/constants'
import { TGithubRepo } from '@/types'

export const getGithubRepoRequest = async (): Promise<TGithubRepo[]> => {
  const projects: TGithubRepo[] = []
  for (let page = 1; ; page++) {
    const { data } = await axios.get<TGithubRepo[]>(
      `https://api.github.com/users/${github.username}/repos`,
      {
        params: { sort: 'updated', direction: 'desc', per_page: 100, page },
        timeout: 10_000,
      }
    )
    if (!Array.isArray(data)) throw new TypeError('Invalid GitHub response')
    projects.push(...data)
    if (data.length < 100) return projects
  }
}

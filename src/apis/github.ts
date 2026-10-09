import { github } from '@/constants'
import { TGithubRepo } from '@/types'

export const getGithubRepoRequest = async (
  signal?: AbortSignal
): Promise<TGithubRepo[]> => {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (signal?.aborted) abort()
  signal?.addEventListener('abort', abort, { once: true })
  const timeout = setTimeout(abort, 10_000)
  try {
    const projects: TGithubRepo[] = []
    for (let page = 1; page <= 10; page++) {
      const url = new URL(
        `https://api.github.com/users/${github.username}/repos`
      )
      url.search = new URLSearchParams({
        sort: 'updated',
        direction: 'desc',
        per_page: '100',
        page: String(page),
      }).toString()
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
      const data: TGithubRepo[] = await response.json()
      if (!Array.isArray(data)) throw new TypeError('Invalid GitHub response')
      projects.push(...data)
      if (data.length < 100) return projects
    }
    throw new Error('GitHub pagination limit exceeded; keeping saved projects')
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abort)
  }
}

import { writeFile } from 'node:fs/promises'

const projects = []
const signal = AbortSignal.timeout(15_000)
for (let page = 1; page <= 10; page++) {
  const response = await fetch(
    `https://api.github.com/users/ardeman/repos?per_page=100&sort=updated&page=${page}`,
    { signal }
  )
  if (!response.ok)
    throw new Error(
      `GitHub returned ${response.status}; saved snapshot was not changed`
    )
  const repositories = await response.json()
  if (!Array.isArray(repositories))
    throw new TypeError('Invalid GitHub response')
  projects.push(...repositories)
  if (repositories.length < 100) break
  if (page === 10)
    throw new Error(
      'GitHub pagination limit exceeded; saved snapshot was not changed'
    )
}
const fields = [
  'id',
  'name',
  'html_url',
  'description',
  'homepage',
  'language',
  'stargazers_count',
  'forks_count',
  'license',
  'topics',
  'fork',
  'archived',
]
const snapshot = projects.map((project) =>
  Object.fromEntries(fields.map((field) => [field, project[field]]))
)
await writeFile(
  new URL('../src/data/projects.json', import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`
)

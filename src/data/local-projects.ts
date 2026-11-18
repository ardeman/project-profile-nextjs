import { TGithubRepo } from '@/types'

// Portfolio-only entries that are not in the public GitHub snapshot (for example
// private repositories). Empty html_url hides the Source link in the UI.
export const localProjects: TGithubRepo[] = [
  {
    id: 1_458_110_365,
    name: 'project-bilahaksara-godot',
    html_url: '',
    description:
      'Bilah Aksara — story-driven pixel-art adventure set in the Acehnese sultanate, built with Godot 4 for Android and iOS.',
    homepage: 'https://bilahaksara.ardeman.com',
    language: 'GDScript',
    topics: [
      'adventure-game',
      'android',
      'gdscript',
      'godot',
      'godot4',
      'indonesia',
      'ios',
      'pixel-art',
    ],
    fork: false,
    archived: false,
    license: null,
  },
]

export const mergeProjectsWithLocal = (
  projects: TGithubRepo[],
): TGithubRepo[] => {
  const names = new Set(projects.map((project) => project.name))
  const missing = localProjects.filter((project) => !names.has(project.name))
  return missing.length === 0 ? projects : [...projects, ...missing]
}

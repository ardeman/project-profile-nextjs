export type TProjectDetails = {
  name: string
  title: string
  linkLabel: string
  category: string
  summary: string
  technologies: string[]
  image?: string
  darkImage?: string
  alt?: string
  video?: { id: string; title: string }
  problem: string
  contribution: string
  result: string
}

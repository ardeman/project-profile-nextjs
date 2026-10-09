import { ReactNode } from 'react'
import { FaDatabase } from 'react-icons/fa'
import {
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNuxtdotjs,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'

export type SkillCategory = 'all' | 'frontend' | 'languages' | 'backend'

const SKILL_METADATA: Record<
  string,
  { categories: SkillCategory[]; icon: ReactNode }
> = {
  'React.js': {
    categories: ['frontend'],
    icon: <SiReact className="h-3.5 w-3.5 text-[#61DAFB]" />,
  },
  'Next.js': {
    categories: ['frontend'],
    icon: <SiNextdotjs className="h-3.5 w-3.5" />,
  },
  'Vue.js': {
    categories: ['frontend'],
    icon: <SiVuedotjs className="h-3.5 w-3.5 text-[#4FC08D]" />,
  },
  Nuxt: {
    categories: ['frontend'],
    icon: <SiNuxtdotjs className="h-3.5 w-3.5 text-[#00DC82]" />,
  },
  JavaScript: {
    categories: ['frontend', 'languages'],
    icon: <SiJavascript className="h-3.5 w-3.5 text-[#F7DF1E]" />,
  },
  TypeScript: {
    categories: ['frontend', 'languages'],
    icon: <SiTypescript className="h-3.5 w-3.5 text-[#3178C6]" />,
  },
  'Tailwind CSS': {
    categories: ['frontend'],
    icon: <SiTailwindcss className="h-3.5 w-3.5 text-[#06B6D4]" />,
  },
  HTML5: {
    categories: ['frontend', 'languages'],
    icon: <SiHtml5 className="h-3.5 w-3.5 text-[#E34F26]" />,
  },
  SCSS: {
    categories: ['frontend', 'languages'],
    icon: <SiSass className="h-3.5 w-3.5 text-[#CC6699]" />,
  },
  Firebase: {
    categories: ['backend'],
    icon: <SiFirebase className="h-3.5 w-3.5 text-[#FFCA28]" />,
  },
  SQL: {
    categories: ['backend', 'languages'],
    icon: <FaDatabase className="h-3 w-3 text-[#336791]" />,
  },
}

export const getSkillIcon = (name: string): ReactNode | null => {
  return SKILL_METADATA[name]?.icon || null
}

export const getSkillCategories = (name: string): SkillCategory[] => {
  return SKILL_METADATA[name]?.categories || ['frontend']
}

'use client'

import { useState } from 'react'

import { Capsule, Skeleton, Title } from '@/components/base'
import { useLinkedinContext } from '@/contexts'
import { getSkillCategories, getSkillIcon, SkillCategory } from '@/utils'

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'languages', label: 'Languages' },
  { id: 'backend', label: 'Backend & DB' },
]

export const Skills = () => {
  const { skills } = useLinkedinContext()
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all')

  const filteredSkills = skills?.filter((skill) => {
    if (!skill.Name) return false
    if (activeCategory === 'all') return true
    return getSkillCategories(skill.Name).includes(activeCategory)
  })

  return (
    <section
      id="skills"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Skill Set"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-purple-950/75">
        <Title>Skills</Title>
      </div>

      <div
        className="mb-3 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Skill categories"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-3 py-1 text-xs transition-all ${
                isActive
                  ? 'bg-red-900 font-semibold text-white shadow-sm dark:bg-fuchsia-400 dark:text-purple-950'
                  : 'bg-red-900/5 font-medium text-slate-700 hover:bg-red-900/10 dark:bg-zinc-800/60 dark:text-slate-300 dark:hover:bg-zinc-800'
              }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      {filteredSkills?.length ? (
        <ul
          className="flex flex-wrap"
          aria-label="Technologies used"
        >
          {filteredSkills.map((skill) => {
            const icon = getSkillIcon(skill.Name)
            return (
              <Capsule key={skill.Name}>
                <span className="flex items-center gap-1.5">
                  {icon}
                  <span>{skill.Name}</span>
                </span>
              </Capsule>
            )
          })}
        </ul>
      ) : (
        <Skeleton lines={2} />
      )}
    </section>
  )
}

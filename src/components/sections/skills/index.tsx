'use client'

import { useState } from 'react'

import { Capsule, Title } from '@/components/base'
import { useLinkedinContext } from '@/contexts'
import { getSkillCategories, getSkillIcon, SkillCategory } from '@/utils'

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All skills' },
  { id: 'frontend', label: 'Front-end' },
  { id: 'languages', label: 'Languages' },
  { id: 'backend', label: 'Back-end & databases' },
]

export const Skills = () => {
  const { skills } = useLinkedinContext()
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all')

  const filteredSkills = skills?.filter((skill) => {
    if (!skill.Name) return false
    return activeCategory === 'all'
      ? true
      : getSkillCategories(skill.Name).includes(activeCategory)
  })

  return (
    <section
      id="skills"
      className="scroll-mt-24 lg:scroll-mt-20"
      aria-label="Skills"
    >
      <div className="section-heading">
        <Title>Skills</Title>
      </div>

      <div
        className="mb-3 flex flex-wrap gap-2"
        role="group"
        aria-label="Skill categories"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-accent/20 bg-accent-soft font-medium text-accent'
                  : 'border-transparent font-medium text-muted hover:border-line hover:bg-accent-soft'
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
        <p
          role="status"
          className="text-sm"
        >
          No skills in this category yet.
        </p>
      )}
    </section>
  )
}

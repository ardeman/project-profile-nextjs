'use client'

import { Capsule, Skeleton, Title } from '@/components/base'
import { useLinkedinContext } from '@/contexts'

export const Skills = () => {
  const { skills } = useLinkedinContext()

  return (
    <section
      id="skills"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Skill Set"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-900/75">
        <Title>Skills</Title>
      </div>
      {skills?.length ? (
        <ul
          className="flex flex-wrap"
          aria-label="Technologies used"
        >
          {skills?.map(
            (skill) =>
              skill.Name && <Capsule key={skill.Name}>{skill.Name}</Capsule>
          )}
        </ul>
      ) : (
        <Skeleton lines={2} />
      )}
    </section>
  )
}

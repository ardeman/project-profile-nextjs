'use client'

import { useLinkedinContext } from '@/contexts'

export const Skills = () => {
  const { skills } = useLinkedinContext()

  return (
    <section
      id="skills"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Skill Set"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-orange-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-900/75">
        <h2 className="text-sm font-bold uppercase tracking-widest text-red-900 lg:sr-only dark:text-slate-200">
          Skills
        </h2>
      </div>
      <div>
        <ul
          className="flex flex-wrap"
          aria-label="Technologies used"
        >
          {skills?.map(
            (skill) =>
              skill.Name && (
                <li
                  key={skill.Name}
                  className="mr-1.5 mt-2"
                >
                  <div className="flex items-center rounded-full bg-red-700/10 px-3 py-1 text-xs font-medium leading-5 text-gray-900 dark:bg-teal-400/10 dark:text-teal-400">
                    {skill.Name}
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </section>
  )
}

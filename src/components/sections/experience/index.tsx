'use client'

import { GoArrowUpRight, GoLocation } from 'react-icons/go'

import { Capsule, Hover, Title, TitleLink } from '@/components/base'
import { useLinkedinContext } from '@/contexts'
import {
  calculateDuration,
  getPositionSkills,
  parseDescriptionBullets,
} from '@/utils'

export const Experience = () => {
  const { positions } = useLinkedinContext()

  return (
    <section
      id="experience"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-purple-950/75">
        <Title>Experience</Title>
      </div>
      <div>
        {positions?.length ? (
          <ol className="group/list">
            {positions?.map((position, index) => {
              if (!position['Company Name']) return null

              const isCurrent = !position['Finished On']
              const duration = calculateDuration(
                position['Started On'],
                position['Finished On']
              )
              const bullets = parseDescriptionBullets(position.Description)
              const skills = getPositionSkills(
                position['Company Name'],
                position.Description
              )

              return (
                <li
                  className="mb-12"
                  key={index}
                >
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <Hover />
                    <header
                      className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-red-600 sm:col-span-2 dark:text-slate-500"
                      aria-label={`${position['Started On']} — ${
                        position['Finished On'] || 'Present'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-900 dark:text-slate-200">
                          {position['Started On']} —{' '}
                          {position['Finished On'] || 'Present'}
                        </span>
                        {duration && (
                          <span className="text-[11px] font-normal normal-case text-slate-500 dark:text-slate-400">
                            {duration}
                          </span>
                        )}
                        {isCurrent && (
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium normal-case text-emerald-600 dark:border-emerald-400/20 dark:text-emerald-400">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none"></span>
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              </span>
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                    </header>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-red-900 dark:text-zinc-200">
                        <TitleLink
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            position['Company Name']
                          )}`}
                          title={`${position.Title} · ${position['Company Name']}`}
                        />
                        {position.Location && (
                          <div className="mt-1 flex items-center gap-1 text-xs font-normal text-red-600/80 dark:text-slate-400">
                            <GoLocation
                              aria-hidden="true"
                              className="h-3 w-3 shrink-0"
                            />
                            <span>{position.Location}</span>
                          </div>
                        )}
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm leading-normal text-slate-700 dark:text-slate-300">
                        {bullets.slice(0, 2).map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-600 dark:bg-fuchsia-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      {bullets.length > 2 && (
                        <details className="mt-3 text-sm">
                          <summary className="cursor-pointer font-medium text-red-900 dark:text-zinc-200">
                            More about this role
                          </summary>
                          <ul className="mt-2 list-disc space-y-2 pl-4">
                            {bullets.slice(2).map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                      {skills.length > 0 && (
                        <ul
                          className="mt-3 flex flex-wrap"
                          aria-label="Technologies used"
                        >
                          {skills.map((skill) => (
                            <Capsule key={skill}>{skill}</Capsule>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <p>No work experience has been added yet.</p>
        )}
        <div className="mt-12">
          <a
            className="group/link inline-flex items-baseline text-base font-semibold leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-zinc-200 dark:hover:text-fuchsia-400 dark:focus-visible:text-fuchsia-400"
            href="/documents/resume-2025.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Full Résumé (opens in a new tab)"
          >
            <span className="inline-block">
              View Full Résumé{' '}
              <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

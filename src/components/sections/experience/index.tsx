'use client'

import { GoArrowUpRight, GoLocation } from 'react-icons/go'

import { Capsule, Title, TitleLink } from '@/components/base'
import { useLinkedinContext } from '@/contexts'
import { TPositions } from '@/types'
import {
  calculateDuration,
  getPositionSkills,
  parseDescriptionBullets,
} from '@/utils'

export const Experience = () => {
  const { positions } = useLinkedinContext()

  const renderPosition = (position: TPositions, index: number) => {
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
        className="border-line border-b pb-8 last:border-none last:pb-0"
        key={index}
      >
        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
          <header
            className="text-muted z-10 mb-2 mt-1 font-mono text-[11px] font-medium uppercase tracking-wide sm:col-span-2"
            aria-label={`${position['Started On']} — ${
              position['Finished On'] || 'Present'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-ink">
                {position['Started On']} —{' '}
                {position['Finished On'] || 'Present'}
              </span>
              {duration && (
                <span className="text-muted text-[11px] font-normal normal-case">
                  {duration}
                </span>
              )}
              {isCurrent && (
                <div className="mt-1">
                  <span className="bg-accent-soft text-accent inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] font-medium normal-case">
                    <span
                      className="bg-accent h-1 w-1 rounded-full"
                      aria-hidden="true"
                    />
                    Current
                  </span>
                </div>
              )}
            </div>
          </header>
          <div className="z-10 sm:col-span-6">
            <h3 className="text-ink font-medium leading-snug">
              <TitleLink
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  position['Company Name']
                )}`}
                title={`${position.Title} · ${position['Company Name']}`}
              />
              {position.Location && (
                <div className="text-muted mt-1 flex items-center gap-1 text-xs font-normal">
                  <GoLocation
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0"
                  />
                  <span>{position.Location}</span>
                </div>
              )}
            </h3>
            <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
              {bullets.slice(0, 2).map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="flex items-start gap-2"
                >
                  <span className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {bullets.length > 2 && (
              <details className="mt-3 text-sm">
                <summary className="text-ink cursor-pointer font-medium">
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
  }

  return (
    <section
      id="experience"
      className="scroll-mt-24 lg:scroll-mt-20"
      aria-label="Work experience"
    >
      <div className="section-heading">
        <Title>Experience</Title>
      </div>
      <div>
        {positions?.length ? (
          <>
            <ol className="space-y-8">
              {positions
                .slice(0, 3)
                .map((position, index) => renderPosition(position, index))}
            </ol>
            {positions.length > 3 && (
              <details className="border-line mt-8 rounded-xl border p-5">
                <summary className="text-ink hover:text-accent cursor-pointer text-sm font-medium transition-colors">
                  Earlier experience{' '}
                  <span className="text-muted ml-2 font-mono text-xs font-normal">
                    {positions.length - 3} roles
                  </span>
                </summary>
                <ol className="mt-6 space-y-8">
                  {positions
                    .slice(3)
                    .map((position, index) =>
                      renderPosition(position, index + 3)
                    )}
                </ol>
              </details>
            )}
          </>
        ) : (
          <p>No work experience has been added yet.</p>
        )}
        <div className="mt-6">
          <a
            className="text-link"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View résumé (opens in a new tab)"
          >
            <span className="inline-block">
              View résumé{' '}
              <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

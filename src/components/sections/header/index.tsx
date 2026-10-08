'use client'

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { ThemeToggle } from '@/components/base'
import { metadata } from '@/constants'
import { useLinkedinContext } from '@/contexts'

import { socials } from './data'
import { TProps } from './type'

export const Header = (props: TProps) => {
  const { setActiveSection, activeSection } = props
  const sections = ['about', 'skills', 'experience', 'projects']
  const { profileData, profileSummary } = useLinkedinContext()

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // eslint-disable-next-line unicorn/prefer-spread
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>('section[id]')
        )
        const active =
          elements.findLast(
            (section) => section.getBoundingClientRect().top <= 160
          ) || elements[0]
        if (active) setActiveSection(active.id)
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [setActiveSection])

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-red-900 sm:text-5xl dark:text-zinc-200">
          <a
            href="/"
            className="oldenburg-regular"
          >
            {metadata.title?.toString()}
          </a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-red-900 sm:text-xl dark:text-zinc-200">
          {profileData.Headline}
        </h2>
        <p className="mt-4 max-w-xs text-sm leading-normal">
          {profileSummary['Profile Summary']}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/ardeman/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Contact me on LinkedIn (opens in a new tab)"
            className="rounded-lg bg-red-900 px-4 py-2 text-sm font-semibold text-white dark:bg-fuchsia-300 dark:text-purple-950"
          >
            Contact me
          </a>
          <a
            href="/documents/resume-2025.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View résumé (opens in a new tab)"
            className="rounded-lg border border-red-900/30 px-4 py-2 text-sm font-semibold text-red-900 dark:border-slate-400/50 dark:text-zinc-200"
          >
            View résumé
          </a>
        </div>
        {sections.length > 0 && (
          <nav
            className="nav mt-8 lg:mt-16"
            aria-label="In-page jump links"
          >
            <ul className="flex flex-wrap gap-x-5 lg:block lg:w-max">
              {sections.map((sectionId) => (
                <li key={sectionId}>
                  <a
                    className="group flex items-center py-3"
                    href={`#${sectionId}`}
                    aria-current={
                      activeSection === sectionId ? 'location' : undefined
                    }
                  >
                    <span
                      className={twMerge(
                        'nav-indicator mr-4 hidden h-px w-8 bg-red-600 transition-all motion-reduce:transition-none lg:block dark:bg-slate-600',
                        activeSection === sectionId
                          ? 'w-16 bg-red-900 dark:bg-zinc-200'
                          : 'group-hover:w-16 group-hover:bg-red-900 group-focus-visible:w-16 group-focus-visible:bg-red-900 dark:group-hover:bg-zinc-200 dark:group-focus-visible:bg-zinc-200'
                      )}
                    ></span>
                    <span
                      className={twMerge(
                        'nav-text text-xs font-bold uppercase tracking-widest',
                        activeSection === sectionId
                          ? 'text-red-900 dark:text-zinc-200'
                          : 'text-red-600 group-hover:text-red-900 group-focus-visible:text-red-900 dark:text-slate-500 dark:group-hover:text-zinc-200 dark:group-focus-visible:text-zinc-200'
                      )}
                    >
                      {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="mt-8 flex justify-start gap-5">
        {!!socials?.length && (
          <ul
            className="flex items-center space-x-5"
            aria-label="Social media"
          >
            {socials.map((social) => (
              <li
                key={social.name}
                className="shrink-0 text-xs"
              >
                <a
                  className="block hover:text-red-900 dark:hover:text-zinc-200"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.name} (opens in a new tab)`}
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}

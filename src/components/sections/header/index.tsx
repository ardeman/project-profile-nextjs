'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Skeleton, ThemeToggle } from '@/components/base'
import { metadata } from '@/constants'
import { useLinkedinContext } from '@/contexts'

import { socials } from './data'
import { TProps } from './type'

export const Header = (props: TProps) => {
  const { setActiveSection, activeSection } = props
  const [sections, setSections] = useState<string[]>([])
  const { profileData, profileSummary } = useLinkedinContext()

  useEffect(() => {
    const sectionElements = document.querySelectorAll('section[id]')
    // eslint-disable-next-line unicorn/prefer-spread
    const sectionIds = Array.from(sectionElements).map(
      (section) => section.getAttribute('id') || ''
    )
    setSections(sectionIds)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      for (const sectionId of sections) {
        const section = document.querySelector(`#${sectionId}`)
        if (section) {
          const { top, bottom } = section.getBoundingClientRect()
          const isActive = top <= 96 && bottom >= 0
          if (isActive) {
            setActiveSection(sectionId)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call it once to initialize

    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections])

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
          <Skeleton>{profileData?.['Headline']}</Skeleton>
        </h2>
        <p className="mt-4 max-w-xs text-sm leading-normal">
          <Skeleton lines={2}>{profileSummary?.['Profile Summary']}</Skeleton>
        </p>
        {!!sections?.length && (
          <nav
            className="nav hidden lg:block"
            aria-label="In-page jump links"
          >
            <ul className="mt-16 w-max">
              {sections.map((sectionId) => (
                <li key={sectionId}>
                  <a
                    className="group flex items-center py-3"
                    href={`#${sectionId}`}
                  >
                    <span
                      className={twMerge(
                        'nav-indicator mr-4 h-px w-8 bg-red-600 transition-all motion-reduce:transition-none dark:bg-slate-600',
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

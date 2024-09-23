'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useLinkedinContext } from '@/contexts'

import { socials } from './data'
import { TProps } from './type'

export const Header = (props: TProps) => {
  const { setActiveSection, activeSection } = props
  const [sections, setSections] = useState<string[]>([])
  const { profileData, profileSummary, skills } = useLinkedinContext()

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
        <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl">
          <a href="/">{profileData?.['First Name']}</a>
        </h1>
        <h2 className="text-primary mt-3 text-lg font-medium tracking-tight sm:text-xl">
          {profileData?.['Headline']}
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          {profileSummary?.['Profile Summary']}
        </p>
        <ul
          className="mt-2 flex flex-wrap"
          aria-label="Technologies used"
        >
          {skills?.map(
            (skill) =>
              skill.Name && (
                <li
                  key={skill.Name}
                  className="mr-1.5 mt-2"
                >
                  <div className="text-info flex items-center rounded-full bg-[#6C5C5C]/10 px-3 py-1 text-xs font-medium leading-5 dark:bg-teal-400/10">
                    {skill.Name}
                  </div>
                </li>
              )
          )}
        </ul>
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
                      'nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all motion-reduce:transition-none',
                      activeSection === sectionId
                        ? 'bg-primary w-16'
                        : 'group-hover:bg-primary group-focus-visible:bg-primary group-hover:w-16 group-focus-visible:w-16'
                    )}
                  ></span>
                  <span
                    className={twMerge(
                      'nav-text text-xs font-bold uppercase tracking-widest',
                      activeSection === sectionId
                        ? 'text-primary'
                        : 'group-hover:text-primary group-focus-visible:text-primary text-tertiary'
                    )}
                  >
                    {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ul
        className="ml-1 mt-8 flex items-center"
        aria-label="Social media"
      >
        {socials.map((social) => (
          <li
            key={social.name}
            className="mr-5 shrink-0 text-xs"
          >
            <a
              className="hover:text-primary block"
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
    </header>
  )
}

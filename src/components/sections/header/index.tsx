'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { ThemeToggle } from '@/components/base'
import { useLinkedinContext } from '@/contexts'

import { socials } from './data'
import { TProps } from './type'

const sections = ['about', 'projects', 'experience', 'skills']

export const MobileNavigation = ({
  activeSection,
}: Pick<TProps, 'activeSection'>) => (
  <nav
    aria-label="Mobile section navigation"
    className="sticky top-0 z-40 -mx-6 mt-8 border-b border-line bg-canvas/95 px-6 backdrop-blur-sm md:-mx-12 md:px-12 lg:hidden"
  >
    <ul className="flex justify-between gap-2">
      {sections.map((section) => (
        <li key={section}>
          <a
            href={`#${section}`}
            aria-current={activeSection === section ? 'location' : undefined}
            className={`block border-b-2 py-4 font-mono text-[10px] font-medium tracking-wider uppercase transition-colors sm:text-xs ${
              activeSection === section
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-accent'
            }`}
          >
            {section}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export const Header = ({ setActiveSection, activeSection }: TProps) => {
  const { profileData, profileSummary } = useLinkedinContext()
  useEffect(() => {
    let frame = 0
    const elements = sections
      .map((id) => document.querySelector<HTMLElement>(`#${id}`))
      .filter((element): element is HTMLElement => element !== null)
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const offset = window.innerWidth >= 1024 ? 160 : 110
        const isAtBottom =
          Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight
        const active =
          (isAtBottom
            ? elements.at(-1)
            : elements.findLast(
                (section) => section.getBoundingClientRect().top <= offset,
              )) || elements[0]
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
    <header className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[34%] lg:shrink-0 lg:flex-col lg:justify-between lg:gap-8 lg:overflow-y-auto lg:py-16 xl:w-[36%] xl:py-20">
      <div>
        <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          Building useful apps
        </p>
        <h1 className="oldenburg-regular text-5xl tracking-tight text-ink sm:text-6xl">
          <Link href="/">Ardeman</Link>
        </h1>
        <p className="mt-4 text-xl font-medium tracking-tight text-ink">
          {profileData.Headline}
        </p>
        <p className="mt-5 max-w-sm text-base leading-7 text-muted">
          {profileSummary['Profile Summary']}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/ardeman/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Message on LinkedIn (opens in a new tab)"
            className="button-primary"
          >
            Message on LinkedIn
          </a>
          <a
            href="/documents/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View résumé (opens in a new tab)"
            className="button-secondary"
          >
            View résumé
          </a>
        </div>
        <nav
          className="mt-12 hidden lg:block"
          aria-label="In-page jump links"
        >
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  aria-current={
                    activeSection === section ? 'location' : undefined
                  }
                  className={`group flex w-fit items-center gap-4 py-2.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors ${
                    activeSection === section
                      ? 'text-accent'
                      : 'text-muted hover:text-accent'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-px bg-current transition-all duration-200 ${
                      activeSection === section
                        ? 'w-10'
                        : 'w-5 group-hover:w-10 group-focus-visible:w-10'
                    }`}
                  />
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-7 flex items-center gap-1">
        <ul
          className="flex gap-1"
          aria-label="Social media"
        >
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className="icon-button"
                aria-label={`${social.name} (opens in a new tab)`}
                title={social.name}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
        <span
          className="mx-3 h-5 w-px bg-line"
          aria-hidden="true"
        />
        <ThemeToggle />
      </div>
    </header>
  )
}

'use client'

import { GoArrowUpRight } from 'react-icons/go'

import { Hover, Skeleton, Title, TitleLink } from '@/components/base'
import { useLinkedinContext } from '@/contexts'

export const Experience = () => {
  const { positions } = useLinkedinContext()

  return (
    <section
      id="experience"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-900/75">
        <Title>Experience</Title>
      </div>
      <div>
        {positions?.length ? (
          <ol className="group/list">
            {positions?.map(
              (position, index) =>
                position['Company Name'] && (
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
                        <div>{position['Started On']}</div>
                        <div>{position['Finished On'] || 'Present'}</div>
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-red-900 dark:text-slate-200">
                          <TitleLink
                            href={`https://www.google.com/search?q=${position['Company Name']}`}
                            title={`${position.Title} - ${position['Company Name']}`}
                          />
                          <div
                            className="text-red-600 dark:text-slate-500"
                            aria-hidden="true"
                          >
                            {position.Location}
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          {position.Description?.split(/(?<=\.)\s+(?=-)/)?.map(
                            (sentence, index) => (
                              <span key={index}>
                                {index > 0 && <br />}
                                {sentence.trim()}
                              </span>
                            )
                          )}
                        </p>
                        {/* <ul
                        className="mt-2 flex flex-wrap"
                        aria-label="Related links"
                      >
                        <li className="mr-4">
                          <a
                            className="relative mt-2 inline-flex items-center text-sm font-medium text-red-900 dark:text-slate-200 hover:text-gray-900 focus-visible:text-gray-900 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                            href="https://developer.apple.com/documentation/musickitjs"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="MusicKit.js (opens in a new tab)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="mr-1 h-3 w-3"
                              aria-hidden="true"
                            >
                              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"></path>
                              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"></path>
                            </svg>
                            <span>MusicKit.js</span>
                          </a>
                        </li>
                      </ul> */}
                      </div>
                    </div>
                  </li>
                )
            )}
          </ol>
        ) : (
          <Skeleton lines={10} />
        )}
        <div className="mt-12">
          <a
            className="group/link inline-flex items-baseline text-base font-semibold leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-200 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
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

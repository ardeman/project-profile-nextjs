'use client'

import { gemoji } from 'gemoji'
import {
  GoArrowRight,
  GoArrowUpRight,
  GoRepoForked,
  GoStarFill,
} from 'react-icons/go'

import { Capsule, Hover, Skeleton, Title, TitleLink } from '@/components/base'
import { useGetProjects } from '@/hooks'
import { TGithubRepo } from '@/types'
import { getLanguageColor } from '@/utils'

/**
 * Converts GitHub emoji codes (like :zap:) to actual emoji characters
 * @param text - The text containing GitHub emoji codes
 * @returns The text with emoji codes replaced by actual emojis
 */
const convertGitHubEmoji = (text: string): string => {
  if (!text) return text

  // Replace all emoji codes with actual emojis
  let result = text
  for (const emoji of gemoji) {
    for (const name of emoji.names) {
      const code = `:${name}:`
      result = result.replaceAll(new RegExp(code, 'g'), emoji.emoji)
    }
  }

  return result
}

export const Projects = () => {
  const { data: projects } = useGetProjects()
  const projectData = projects?.data as TGithubRepo[]
  const filteredProjects = projectData
    ?.filter((project) => Boolean(project.license))
    ?.filter((_, index) => index < 5)

  return (
    <section
      id="projects"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-purple-950/75">
        <Title>Projects</Title>
      </div>
      <div>
        {filteredProjects?.length ? (
          <ul className="group/list">
            {filteredProjects.map((project) => {
              const hasLiveDemo =
                project.homepage &&
                project.homepage.trim() !== '' &&
                project.homepage !== project.html_url

              return (
                <li
                  key={project.id}
                  className="mb-12"
                >
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <Hover />
                    <div className="z-10 sm:order-2 sm:col-span-8">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3>
                          <TitleLink
                            href={project.homepage || project.html_url}
                            title={project.name}
                          />
                        </h3>
                        {hasLiveDemo && (
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-red-900 transition-colors hover:text-red-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"
                            aria-label={`Live demo for ${project.name}`}
                          >
                            <span>Live Demo</span>
                            <GoArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-normal text-slate-700 dark:text-slate-300">
                        {convertGitHubEmoji(project.description)}
                      </p>

                      <div className="relative mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                        {project.language && (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: getLanguageColor(
                                  project.language
                                ),
                              }}
                              aria-hidden="true"
                            />
                            <span>{project.language}</span>
                          </span>
                        )}

                        <a
                          className="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-zinc-200"
                          href={project.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`GitHub ${project.name} (opens in a new tab)`}
                        >
                          {Boolean(project.stargazers_count) && (
                            <span className="inline-flex items-center">
                              <GoStarFill className="mr-1 h-3 w-3 text-amber-500" />
                              <span>{project.stargazers_count}</span>
                            </span>
                          )}
                          {Boolean(project.forks_count) && (
                            <span className="inline-flex items-center">
                              <GoRepoForked className="mr-1 h-3 w-3" />
                              <span>{project.forks_count}</span>
                            </span>
                          )}
                        </a>

                        {project.license?.spdx_id && (
                          <span className="rounded border border-slate-300/60 px-1.5 py-0.5 text-[10px] dark:border-slate-700">
                            {project.license.spdx_id}
                          </span>
                        )}
                      </div>

                      {project.topics && project.topics.length > 0 && (
                        <ul
                          className="mt-2 flex flex-wrap"
                          aria-label="Topics"
                        >
                          {project.topics.map((topic) => (
                            <Capsule key={topic}>{topic}</Capsule>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <Skeleton lines={10} />
        )}
        <div className="mt-12">
          <a
            className="group inline-flex items-center font-semibold leading-tight text-red-900 dark:text-zinc-200"
            aria-label="View Full Project Archive"
            href="/archive"
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-gray-900 motion-reduce:transition-none dark:group-hover:border-fuchsia-400">
                View Full Project{' '}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-gray-900 motion-reduce:transition-none dark:group-hover:border-fuchsia-400">
                  Archive
                </span>
                <GoArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { GoArrowRight, GoRepoForked, GoStarFill } from 'react-icons/go'

import { Capsule, Hover, Skeleton, Title, TitleLink } from '@/components/base'
import { useGetProjects } from '@/hooks'
import { TGithubRepo } from '@/types'

export const Projects = () => {
  const { data: projects } = useGetProjects()
  const projectData = projects?.data as TGithubRepo[]
  const filteredProjects = projectData
    ?.filter((project) => !!project.license)
    ?.filter((_, index) => index < 5)

  return (
    <section
      id="projects"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-900/75">
        <Title>Projects</Title>
      </div>
      <div>
        {filteredProjects?.length ? (
          <ul className="group/list">
            {filteredProjects?.map((project) => (
              <li
                key={project.id}
                className="mb-12"
              >
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <Hover />
                  {/* <div className="z-10 sm:order-2 sm:col-span-6"> */}
                  <div className="z-10 sm:order-2 sm:col-span-8">
                    <h3>
                      <TitleLink
                        href={project.homepage || project.html_url}
                        title={project.name}
                      />
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      {project.description}
                    </p>
                    <a
                      className="relative mt-2 flex items-center gap-x-2 text-sm font-medium  text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-200 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`GitHub ${project.name} (opens in a new tab)`}
                    >
                      {!!project.stargazers_count && (
                        <span className="inline-flex items-center">
                          <GoStarFill className="mr-1 h-3 w-3" />
                          <span>{project.stargazers_count}</span>
                        </span>
                      )}
                      {!!project.forks_count && (
                        <span className="inline-flex items-center">
                          <GoRepoForked className="mr-1 h-3 w-3" />
                          <span>{project.forks_count}</span>
                        </span>
                      )}
                      {project.license?.spdx_id && (
                        <span>{project.license.spdx_id}</span>
                      )}
                    </a>
                    <ul
                      className="mt-2 flex flex-wrap"
                      aria-label="Topic:"
                    >
                      {project.topics.map((topic) => (
                        <Capsule key={topic}>{topic}</Capsule>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="h-12 w-24 rounded border-2 border-red-900/10 text-transparent transition group-hover:border-red-900/30 sm:order-1 sm:col-span-2 sm:translate-y-1 dark:border-slate-200/10 dark:group-hover:border-slate-200/30"></div> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Skeleton lines={10} />
        )}
        <div className="mt-12">
          <a
            className="group inline-flex items-center font-semibold leading-tight text-red-900 dark:text-slate-200"
            aria-label="View Full Project Archive"
            href="/archive"
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-gray-900 motion-reduce:transition-none dark:group-hover:border-sky-400">
                View Full Project{' '}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-gray-900 motion-reduce:transition-none dark:group-hover:border-sky-400">
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

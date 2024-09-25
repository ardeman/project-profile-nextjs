'use client'

import { useGetProjects } from '@/hooks'
import { TGithubRepo } from '@/types'
import {
  GoArrowRight,
  GoArrowUpRight,
  GoRepoForked,
  GoStarFill,
} from 'react-icons/go'

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
        <h2 className="text-sm font-bold uppercase tracking-widest text-red-900 lg:sr-only dark:text-slate-200">
          Projects
        </h2>
      </div>
      <div>
        {filteredProjects?.length && (
          <ul className="group/list">
            {filteredProjects?.map((project) => (
              <li
                key={project.id}
                className="mb-12"
              >
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  {/* <div className="z-10 sm:order-2 sm:col-span-6"> */}
                  <div className="z-10 sm:order-2 sm:col-span-8">
                    <h3>
                      <a
                        className="group/link inline-flex items-baseline text-base font-medium leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-200 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                        href={project.homepage || project.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.name} (opens in a new tab)`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                        <span>
                          {project.name}{' '}
                          <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                        </span>
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      {project.description}
                    </p>
                    <p className="space-x-2">
                      {!!project.stargazers_count && (
                        <a
                          className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-gray-900 focus-visible:text-gray-900 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                          href={project.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${project.stargazers_count} stars on GitHub (opens in a new tab)`}
                        >
                          <GoStarFill className="mr-1 h-3 w-3" />
                          <span>{project.stargazers_count}</span>
                        </a>
                      )}
                      {!!project.forks_count && (
                        <a
                          className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-gray-900 focus-visible:text-gray-900 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                          href={project.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${project.forks_count} forks on GitHub (opens in a new tab)`}
                        >
                          <GoRepoForked className="mr-1 h-3 w-3" />
                          <span>{project.forks_count}</span>
                        </a>
                      )}
                    </p>
                    <ul
                      className="mt-2 flex flex-wrap"
                      aria-label="Topic:"
                    >
                      {project.topics.map((topic) => (
                        <li
                          className="mr-1.5 mt-2"
                          key={topic}
                        >
                          <div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-gray-900 dark:text-sky-400">
                            {topic}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="h-12 w-24 rounded border-2 border-red-900/10 text-transparent transition group-hover:border-red-900/30 sm:order-1 sm:col-span-2 sm:translate-y-1 dark:border-slate-200/10 dark:group-hover:border-slate-200/30"></div> */}
                </div>
              </li>
            ))}
          </ul>
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

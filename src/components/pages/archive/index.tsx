'use client'

import { FaGithub } from 'react-icons/fa6'
import { GoArrowLeft, GoArrowUpRight } from 'react-icons/go'

import { Capsule, Skeleton } from '@/components/base'
import { metadata } from '@/data'
import { useGetProjects } from '@/hooks'
import { TGithubRepo } from '@/types'

export const ArchivePage = () => {
  const { data: projects, isLoading } = useGetProjects()
  const projectData = projects?.data as TGithubRepo[]
  const filteredProjects = projectData?.filter((project) => !!project.license)

  return (
    <main className="lg:py-24">
      <a
        className="oldenburg-regular group mb-2 inline-flex items-center font-semibold leading-tight text-gray-900 dark:text-sky-400"
        href="/"
      >
        <GoArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2" />
        {metadata.title?.toString()}
      </a>
      <h1 className="text-4xl font-bold tracking-tight text-red-900 sm:text-5xl dark:text-slate-200">
        All Projects
      </h1>
      <table
        id="content"
        className="mt-12 w-full border-collapse text-left"
      >
        <thead className="sticky top-0 z-10 border-b border-red-900/10 bg-slate-100/75 px-6 py-5 uppercase backdrop-blur dark:border-slate-200/10 dark:bg-slate-900/75">
          <tr>
            <th className="py-4 pr-8 text-sm font-semibold text-red-900 dark:text-slate-200">
              Project
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-red-900 lg:table-cell dark:text-slate-200">
              License
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-red-900 lg:table-cell dark:text-slate-200">
              Topic
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-red-900 sm:table-cell dark:text-slate-200">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <tr
                className="border-b border-red-900/10 last:border-none dark:border-slate-200/10"
                key={index}
              >
                <td className="py-4 pr-4 align-top font-semibold leading-snug text-red-900 dark:text-slate-200">
                  <Skeleton />
                </td>
                <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
                  <Skeleton />
                </td>
                <td className="hidden py-4 pr-4 align-top lg:table-cell">
                  <Skeleton />
                </td>
                <td className="hidden py-4 align-top sm:table-cell">
                  <Skeleton />
                </td>
              </tr>
            ))
          ) : filteredProjects?.length ? (
            filteredProjects.map((project) => (
              <tr
                className="border-b border-red-900/10 last:border-none dark:border-slate-200/10"
                key={project.id}
              >
                <td className="py-4 pr-4 align-top font-semibold leading-snug text-red-900 dark:text-slate-200">
                  <div>
                    <div className="block sm:hidden">
                      <a
                        className="group/link inline-flex items-baseline text-base font-medium leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 sm:hidden dark:text-slate-200 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                        href={project.homepage || project.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.name} (opens in a new tab)`}
                      >
                        <span>
                          {project.name}{' '}
                          <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                        </span>
                      </a>
                    </div>
                    <div className="hidden sm:block">{project.name}</div>
                  </div>
                </td>
                <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
                  <div className="translate-y-px whitespace-nowrap">
                    {project.license?.name}
                  </div>
                </td>
                <td className="hidden py-4 pr-4 align-top lg:table-cell">
                  <ul className="flex -translate-y-1.5 flex-wrap">
                    {project.topics.map((topic) => (
                      <Capsule key={topic}>{topic}</Capsule>
                    ))}
                  </ul>
                </td>
                <td className="hidden py-4 align-top sm:table-cell">
                  <ul className="translate-y-1">
                    <li className="mb-1 flex items-center">
                      <a
                        className="group/link inline-flex items-baseline text-sm font-medium leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
                        href={project.homepage || project.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.name} (opens in a new tab)`}
                      >
                        <span>
                          {project.homepage || project.html_url}{' '}
                          {project.homepage ? (
                            <GoArrowUpRight className="ml-0.5 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                          ) : (
                            <FaGithub className="ml-0.5 inline-block h-3.5 w-3.5 shrink-0" />
                          )}
                        </span>
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="py-4 pr-4 align-top text-red-900 dark:text-slate-200"
                colSpan={4}
              >
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}

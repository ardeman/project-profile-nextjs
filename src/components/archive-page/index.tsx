'use client'

import { metadata } from '@/data'
import { useGetProjects } from '@/hooks'
import { TGithubRepo } from '@/types'
import { FaGithub } from 'react-icons/fa6'
import { GoArrowLeft, GoArrowUpRight } from 'react-icons/go'
import { Capsule } from '@/components'

export const ArchivePage = () => {
  const { data: projects } = useGetProjects()
  const projectData = projects?.data as TGithubRepo[]

  return (
    <main className="lg:py-24">
      <a
        className="group mb-2 inline-flex items-center font-semibold leading-tight text-sky-300"
        href="/"
      >
        <GoArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2" />
        {metadata.title?.toString()}
      </a>
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
        All Projects
      </h1>
      <table
        id="content"
        className="mt-12 w-full border-collapse text-left"
      >
        <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">
          <tr>
            <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
              Project
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
              License
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
              Topic
            </th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {projectData?.map((project) => (
            <tr className="border-b border-slate-300/10 last:border-none">
              <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                <div>
                  <div className="block sm:hidden">
                    <a
                      className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-sky-300 focus-visible:text-sky-300 sm:hidden"
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
                      className="group/link inline-flex items-baseline text-sm font-medium leading-tight text-slate-400 hover:text-sky-300 focus-visible:text-sky-300"
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
          ))}
        </tbody>
      </table>
    </main>
  )
}

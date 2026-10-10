'use client'

import Link from 'next/link'
import { GoArrowLeft, GoArrowUpRight } from 'react-icons/go'

import { Capsule } from '@/components/base'
import { featuredProjects } from '@/data/featured-projects'
import { useGetProjects } from '@/hooks'

const getTitle = (name: string) =>
  featuredProjects.find((project) => project.name === name)?.title ||
  name.replace(/^(project|exercise)[_-]/, '').replaceAll(/[_-]/g, ' ')

export const ArchivePage = () => {
  const { data: projects, isError, isFetching, refetch } = useGetProjects()
  const filteredProjects = projects?.filter(
    (project) =>
      project.name.startsWith('project') && !project.fork && !project.archived,
  )
  return (
    <main
      id="content"
      tabIndex={-1}
      className="lg:py-20"
    >
      <Link
        href="/"
        className="text-link"
      >
        <GoArrowLeft aria-hidden="true" />
        Back to portfolio
      </Link>
      <p className="mt-10 mb-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
        The collection
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Project archive
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        Web applications, coding experiments, and tools I have built.
      </p>
      <table className="mt-10 w-full border-collapse text-left">
        <caption className="sr-only">
          Projects, their technologies, licenses, and links
        </caption>
        <thead className="border-b border-line font-mono text-[11px] tracking-wider text-muted uppercase">
          <tr>
            <th
              scope="col"
              className="py-4 pr-4 font-normal"
            >
              Project
            </th>
            <th
              scope="col"
              className="hidden py-4 pr-4 font-normal md:table-cell"
            >
              Built with
            </th>
            <th
              scope="col"
              className="hidden py-4 pr-4 font-normal lg:table-cell"
            >
              License
            </th>
            <th
              scope="col"
              className="py-4 font-normal"
            >
              Explore
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects?.length ? (
            filteredProjects.map((project) => {
              const title = getTitle(project.name)
              return (
                <tr
                  key={project.id}
                  className="border-b border-line/70 last:border-none"
                >
                  <th
                    scope="row"
                    className="py-5 pr-4 align-top font-medium"
                  >
                    <a
                      href={project.homepage || project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink capitalize transition-colors hover:text-accent"
                      aria-label={`${title} (opens in a new tab)`}
                    >
                      {title}
                    </a>
                    {project.description && (
                      <p className="mt-1 hidden max-w-md text-sm leading-6 font-normal text-muted sm:block">
                        {project.description}
                      </p>
                    )}
                    {project.language && (
                      <p className="mt-2 font-mono text-[11px] font-normal text-muted md:hidden">
                        {project.language}
                      </p>
                    )}
                  </th>
                  <td className="hidden py-5 pr-4 align-top md:table-cell">
                    <ul className="flex flex-wrap">
                      {[
                        ...(project.language ? [project.language] : []),
                        ...project.topics.slice(0, 2),
                      ].map((topic) => (
                        <Capsule key={topic}>{topic}</Capsule>
                      ))}
                    </ul>
                  </td>
                  <td className="hidden py-5 pr-4 align-top font-mono text-xs text-muted lg:table-cell">
                    {project.license?.spdx_id &&
                    project.license.spdx_id !== 'NOASSERTION'
                      ? project.license.spdx_id
                      : '—'}
                  </td>
                  <td className="py-3 align-top">
                    <div className="flex flex-col items-start">
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-link"
                          aria-label={`${title} website (opens in a new tab)`}
                        >
                          Website
                          <GoArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-link"
                        aria-label={`${title} source code (opens in a new tab)`}
                      >
                        Source
                        <GoArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-muted"
              >
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isError && (
        <p
          role="status"
          className="mt-6 text-xs text-muted"
        >
          Showing saved projects.{' '}
          <button
            type="button"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="min-h-11 px-1 underline underline-offset-4 hover:text-accent"
          >
            {isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
        </p>
      )}
    </main>
  )
}

'use client'

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
      !project.fork && !project.archived && project.name !== 'ardeman'
  )
  return (
    <main
      id="content"
      tabIndex={-1}
      className="lg:py-20"
    >
      <a
        href="/"
        className="text-link"
      >
        <GoArrowLeft aria-hidden="true" />
        Back to portfolio
      </a>
      <p className="text-muted mb-3 mt-10 font-mono text-xs uppercase tracking-[0.18em]">
        The collection
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Project archive
      </h1>
      <p className="text-muted mt-4 max-w-xl text-base leading-7">
        Web applications, coding experiments, and tools I have built.
      </p>
      <table className="mt-10 w-full border-collapse text-left">
        <caption className="sr-only">
          Projects, their technologies, licenses, and links
        </caption>
        <thead className="border-line text-muted border-b font-mono text-[11px] uppercase tracking-wider">
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
                  className="border-line/70 border-b last:border-none"
                >
                  <th
                    scope="row"
                    className="py-5 pr-4 align-top font-medium"
                  >
                    <a
                      href={project.homepage || project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink hover:text-accent capitalize transition-colors"
                      aria-label={`${title} (opens in a new tab)`}
                    >
                      {title}
                    </a>
                    {project.description && (
                      <p className="text-muted mt-1 hidden max-w-md text-sm font-normal leading-6 sm:block">
                        {project.description}
                      </p>
                    )}
                    {project.language && (
                      <p className="text-muted mt-2 font-mono text-[11px] font-normal md:hidden">
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
                  <td className="text-muted hidden py-5 pr-4 align-top font-mono text-xs lg:table-cell">
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
                className="text-muted py-8"
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
          className="text-muted mt-6 text-xs"
        >
          Showing saved projects.{' '}
          <button
            type="button"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="hover:text-accent min-h-11 px-1 underline underline-offset-4"
          >
            {isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
        </p>
      )}
    </main>
  )
}

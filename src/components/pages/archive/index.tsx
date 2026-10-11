'use client'

import Link from 'next/link'
import { GoArrowUpRight } from 'react-icons/go'

import { Capsule, PageNavigation } from '@/components/base'
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
      className="min-w-0 lg:py-12"
    >
      <PageNavigation />
      <header className="py-10 sm:py-14">
        <p className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          The collection
        </p>
        <h1 className="oldenburg-regular text-4xl leading-tight tracking-tight sm:text-6xl">
          Project archive
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted">
          Web applications, coding experiments, and tools I have built. Explore
          the live projects or take a look at the code behind them.
        </p>
      </header>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-line py-3 font-mono text-xs text-muted">
        <p>{filteredProjects?.length ?? 0} projects</p>
        <p>Open source & ongoing experiments</p>
      </div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Projects, their technologies, licenses, and links
        </caption>
        <thead className="border-b border-line font-mono text-[11px] tracking-wider text-muted uppercase">
          <tr>
            <th
              scope="col"
              className="py-4 pr-4 font-normal md:w-1/2"
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
              const featured = featuredProjects.find(
                (item) => item.name === project.name,
              )
              const title = getTitle(project.name)
              const description = featured?.summary || project.description
              const technologies = featured?.technologies || [
                ...(project.language ? [project.language] : []),
                ...project.topics.slice(0, 2),
              ]
              return (
                <tr
                  key={project.id}
                  className="border-b border-line/70 transition-colors focus-within:bg-surface/60 hover:bg-surface/60"
                >
                  <th
                    scope="row"
                    className="py-6 pr-4 align-top font-medium sm:pr-8"
                  >
                    <a
                      href={project.homepage || project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 items-center text-base leading-6 text-ink capitalize transition-colors hover:text-accent sm:text-lg"
                      aria-label={`${title} (opens in a new tab)`}
                    >
                      {title}
                    </a>
                    {description && (
                      <p className="mt-1 max-w-md text-sm leading-6 font-normal text-muted">
                        {description}
                      </p>
                    )}
                    {project.language && (
                      <p className="mt-2 font-mono text-[11px] font-normal text-muted md:hidden">
                        {project.language}
                      </p>
                    )}
                  </th>
                  <td className="hidden py-7 pr-4 align-top md:table-cell">
                    <ul className="flex flex-wrap">
                      {technologies.map((topic) => (
                        <Capsule key={topic}>{topic}</Capsule>
                      ))}
                    </ul>
                  </td>
                  <td className="hidden py-9 pr-4 align-top font-mono text-xs text-muted lg:table-cell">
                    {project.license?.spdx_id &&
                    project.license.spdx_id !== 'NOASSERTION'
                      ? project.license.spdx_id
                      : '—'}
                  </td>
                  <td className="py-6 align-top">
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
      <footer className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-sm text-sm leading-6 text-muted">
          For a closer look at the ideas and decisions behind selected projects,
          visit the portfolio.
        </p>
        <Link
          href="/#projects"
          className="button-secondary"
        >
          Explore selected work
          <GoArrowUpRight aria-hidden="true" />
        </Link>
      </footer>
    </main>
  )
}

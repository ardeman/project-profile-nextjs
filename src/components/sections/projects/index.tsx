'use client'

import Image from 'next/image'
import { GoArrowRight, GoArrowUpRight } from 'react-icons/go'

import { Capsule, Title } from '@/components/base'
import { featuredProjects } from '@/data/featured-projects'
import snapshot from '@/data/projects.json'
import { useGetProjects } from '@/hooks'

export const Projects = () => {
  const { data: projects, isError, isFetching, refetch } = useGetProjects()
  return (
    <section
      id="projects"
      className="scroll-mt-24 lg:scroll-mt-20"
      aria-label="Selected projects"
    >
      <div className="section-heading">
        <Title>Selected work</Title>
      </div>
      <ul className="space-y-8">
        {featuredProjects.map((feature, index) => {
          const project =
            projects?.find((item) => item.name === feature.name) ||
            snapshot.find((item) => item.name === feature.name)
          if (!project) return null
          return (
            <li key={feature.name}>
              <article className="border-line bg-surface overflow-hidden rounded-2xl border shadow-[0_2px_12px_rgba(30,15,50,0.025)]">
                <a
                  href={project.homepage || project.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${feature.title} (opens in a new tab)`}
                  className="border-line bg-accent-soft/40 group block overflow-hidden border-b"
                >
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
                    className="aspect-[8/5] w-full object-contain transition-opacity duration-200 group-hover:opacity-90"
                  />
                </a>
                <div className="p-5 sm:p-6">
                  <p className="text-muted mb-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                    0{index + 1} / {feature.category}
                  </p>
                  <h3 className="text-ink text-2xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-6">
                    {feature.summary}
                  </p>
                  <ul
                    className="mt-3 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {feature.technologies.map((technology) => (
                      <Capsule key={technology}>{technology}</Capsule>
                    ))}
                  </ul>
                  <details className="border-line text-muted mt-4 border-t pt-4 text-sm leading-6">
                    <summary className="text-ink hover:text-accent w-fit cursor-pointer font-medium transition-colors">
                      Read more
                      <span className="sr-only"> about {feature.title}</span>
                    </summary>
                    <dl className="mt-4 space-y-3">
                      <div>
                        <dt className="text-ink font-medium">The idea</dt>
                        <dd>{feature.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-ink font-medium">What I built</dt>
                        <dd>{feature.contribution}</dd>
                      </div>
                      <div>
                        <dt className="text-ink font-medium">How it works</dt>
                        <dd>{feature.result}</dd>
                      </div>
                    </dl>
                  </details>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5">
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-link"
                        aria-label={`${feature.linkLabel} for ${feature.title} (opens in a new tab)`}
                      >
                        {feature.linkLabel}
                        <GoArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-link"
                      aria-label={`${feature.title} source code (opens in a new tab)`}
                    >
                      Source code
                      <GoArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <a
          href="/archive"
          className="text-link"
        >
          Explore the project archive
          <GoArrowRight aria-hidden="true" />
        </a>
        {isError && (
          <p
            role="status"
            className="text-muted text-xs"
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
      </div>
    </section>
  )
}

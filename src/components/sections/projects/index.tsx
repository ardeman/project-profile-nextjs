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
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 dark:bg-purple-950/75">
        <Title>Projects</Title>
      </div>
      <p className="mb-6 text-sm">
        Selected work across web applications and playful learning.
      </p>
      {isError && (
        <p
          role="status"
          className="mb-6 rounded-lg border border-slate-400/30 p-3 text-sm"
        >
          Live project updates are unavailable. Showing saved projects.{' '}
          <button
            type="button"
            disabled={isFetching}
            onClick={() => void refetch()}
            className="font-semibold underline"
          >
            {isFetching ? 'Retrying…' : 'Retry'}
          </button>
        </p>
      )}
      <ul className="space-y-10">
        {featuredProjects.map((feature) => {
          const project =
            projects?.find((item) => item.name === feature.name) ||
            snapshot.find((item) => item.name === feature.name)
          if (!project) return null
          return (
            <li key={feature.name}>
              <article className="overflow-hidden rounded-xl border border-red-900/10 bg-white/40 dark:border-slate-400/20 dark:bg-white/[0.025]">
                <a
                  href={project.homepage || project.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${feature.title} (opens in a new tab)`}
                  className="block"
                >
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 512px, 100vw"
                    className="aspect-[8/5] w-full bg-slate-200 object-contain dark:bg-slate-900"
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-red-900 dark:text-zinc-200">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm">{feature.problem}</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-red-900 dark:text-zinc-200">
                        What I built
                      </dt>
                      <dd>{feature.contribution}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-red-900 dark:text-zinc-200">
                        Outcome
                      </dt>
                      <dd>{feature.result}</dd>
                    </div>
                  </dl>
                  <ul
                    className="mt-4 flex flex-wrap"
                    aria-label="Technologies and topics"
                  >
                    {[
                      ...(project.language ? [project.language] : []),
                      ...project.topics.slice(0, 4),
                    ].map((topic) => (
                      <Capsule key={topic}>{topic}</Capsule>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-5 text-sm font-semibold text-red-900 dark:text-fuchsia-300">
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${feature.linkLabel} for ${feature.title} (opens in a new tab)`}
                      >
                        {feature.linkLabel}{' '}
                        <GoArrowUpRight className="inline" />
                      </a>
                    )}
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${feature.title} source code (opens in a new tab)`}
                    >
                      Source code <GoArrowUpRight className="inline" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      <a
        href="/archive"
        className="mt-8 inline-flex items-center gap-2 font-semibold text-red-900 dark:text-zinc-200"
      >
        View full project archive <GoArrowRight />
      </a>
    </section>
  )
}

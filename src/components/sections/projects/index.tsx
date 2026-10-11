'use client'

import Image from 'next/image'
import { useState } from 'react'
import { GoArrowRight, GoArrowUpRight, GoPlay } from 'react-icons/go'

import { Capsule, Title } from '@/components/base'
import { featuredProjects } from '@/data/featured-projects'
import snapshot from '@/data/projects.json'
import { useGetProjects } from '@/hooks'

const focusVideoPlayer = (player: HTMLIFrameElement | null) => {
  player?.focus()
}

const ProjectMedia = ({
  feature,
  projectUrl,
}: {
  feature: (typeof featuredProjects)[number]
  projectUrl: string
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying && feature.video) {
    return (
      <iframe
        ref={focusVideoPlayer}
        src={`https://www.youtube-nocookie.com/embed/${feature.video.id}?autoplay=1&rel=0`}
        title={feature.video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="aspect-[8/5] w-full border-b border-line"
      />
    )
  }

  return (
    <a
      href={
        feature.video
          ? `https://www.youtube.com/watch?v=${feature.video.id}`
          : projectUrl
      }
      target="_blank"
      rel="noreferrer noopener"
      aria-label={
        feature.video
          ? `Play ${feature.title} video demo`
          : `${feature.title} (opens in a new tab)`
      }
      onClick={
        feature.video
          ? (event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return
              event.preventDefault()
              setIsPlaying(true)
            }
          : undefined
      }
      className="group relative block overflow-hidden border-b border-line bg-accent-soft/40"
    >
      <Image
        src={feature.image}
        alt={feature.alt}
        width={1200}
        height={750}
        sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
        className={`aspect-[8/5] w-full object-contain transition-opacity duration-200 group-hover:opacity-90 ${feature.darkImage ? 'dark:hidden' : ''}`}
      />
      {feature.darkImage && (
        <Image
          src={feature.darkImage}
          alt={feature.alt}
          width={1200}
          height={750}
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, 100vw"
          className="hidden aspect-[8/5] w-full object-contain transition-opacity duration-200 group-hover:opacity-90 dark:block"
        />
      )}
      {feature.video && (
        <span className="absolute inset-x-0 bottom-5 flex justify-center">
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent shadow-lg">
            <GoPlay aria-hidden="true" />
            Watch demo
          </span>
        </span>
      )}
    </a>
  )
}

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
              <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_2px_12px_rgba(30,15,50,0.025)]">
                <ProjectMedia
                  feature={feature}
                  projectUrl={project.homepage || project.html_url}
                />
                <div className="p-5 sm:p-6">
                  <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                    0{index + 1} / {feature.category}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
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
                  <details className="mt-4 border-t border-line pt-4 text-sm leading-6 text-muted">
                    <summary className="w-fit cursor-pointer font-medium text-ink transition-colors hover:text-accent">
                      Read more
                      <span className="sr-only"> about {feature.title}</span>
                    </summary>
                    <dl className="mt-4 space-y-3">
                      <div>
                        <dt className="font-medium text-ink">The idea</dt>
                        <dd>{feature.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">What I built</dt>
                        <dd>{feature.contribution}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-ink">How it works</dt>
                        <dd>{feature.result}</dd>
                      </div>
                    </dl>
                  </details>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5">
                    {feature.video && (
                      <a
                        href={`https://www.youtube.com/watch?v=${feature.video.id}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-link"
                        aria-label={`Watch ${feature.title} on YouTube (opens in a new tab)`}
                      >
                        Watch on YouTube
                        <GoArrowUpRight aria-hidden="true" />
                      </a>
                    )}
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
            className="text-xs text-muted"
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
      </div>
    </section>
  )
}

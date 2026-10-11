import Link from 'next/link'
import { GoArrowRight } from 'react-icons/go'

import { PageNavigation } from '@/components/base'

export default function NotFound() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="flex min-h-[calc(100svh-5.5rem)] flex-col lg:min-h-dvh lg:py-12"
    >
      <PageNavigation />
      <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          404 / Page not found
        </p>
        <p
          aria-hidden="true"
          className="oldenburg-regular mb-8 text-8xl leading-none text-accent sm:text-[10rem]"
        >
          404<span className="text-line">.</span>
        </p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          A little off the path.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-muted">
          This page may have moved, or the link might be incorrect. There’s
          still plenty to explore.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 min-[400px]:flex-row min-[400px]:items-center">
          <Link
            href="/"
            className="button-primary"
          >
            Back to portfolio
            <GoArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/archive"
            className="button-secondary"
          >
            Browse project archive
          </Link>
        </div>
      </div>
      <p className="border-t border-line pt-5 font-mono text-xs text-muted">
        Ardeman / Portfolio
      </p>
    </main>
  )
}

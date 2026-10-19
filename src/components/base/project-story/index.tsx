import { TProjectDetails } from '@/types'

export const ProjectStory = ({
  details,
  className = '',
}: {
  details: TProjectDetails
  className?: string
}) => (
  <details className={`text-sm leading-6 text-muted ${className}`}>
    <summary className="w-fit cursor-pointer font-medium text-ink transition-colors hover:text-accent">
      Read more
      <span className="sr-only"> about {details.title}</span>
    </summary>
    <dl className="mt-4 space-y-3">
      <div>
        <dt className="font-medium text-ink">The idea</dt>
        <dd>{details.problem}</dd>
      </div>
      <div>
        <dt className="font-medium text-ink">What I built</dt>
        <dd>{details.contribution}</dd>
      </div>
      <div>
        <dt className="font-medium text-ink">How it works</dt>
        <dd>{details.result}</dd>
      </div>
    </dl>
  </details>
)

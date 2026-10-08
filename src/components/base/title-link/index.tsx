import { GoArrowUpRight } from 'react-icons/go'

import { TProps } from './type'

export const TitleLink = (props: TProps) => {
  const { href, title } = props

  return (
    <a
      className="group/link text-ink hover:text-accent inline-flex items-baseline text-base font-medium leading-snug transition-colors"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${title} (opens in a new tab)`}
    >
      <span>
        {title}{' '}
        <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
      </span>
    </a>
  )
}

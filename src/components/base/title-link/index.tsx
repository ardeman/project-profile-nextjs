import { GoArrowUpRight } from 'react-icons/go'

import { TProps } from './type'

export const TitleLink = (props: TProps) => {
  const { href, title } = props

  return (
    <a
      className="group/link inline-flex items-baseline text-base font-medium leading-tight text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-zinc-200 dark:hover:text-fuchsia-400 dark:focus-visible:text-fuchsia-400"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${title} (opens in a new tab)`}
    >
      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
      <span>
        {title}{' '}
        <GoArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
      </span>
    </a>
  )
}

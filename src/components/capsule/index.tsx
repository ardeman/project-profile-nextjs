import { PropsWithChildren } from 'react'

export const Capsule = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="mr-1.5 mt-2">
      <div className="flex items-center rounded-full bg-red-700/10 px-3 py-1 text-xs font-medium leading-5 text-gray-900 dark:bg-sky-400/10 dark:text-sky-400">
        {children}
      </div>
    </li>
  )
}

import { PropsWithChildren } from 'react'

import { TProps } from './type'

export const Skeleton = (props: PropsWithChildren<TProps>) => {
  const { children, lines = 1 } = props

  if (children) {
    return <>{children}</>
  }

  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <span
          key={index}
          className={`inline-block animate-pulse rounded-full bg-gray-300 dark:bg-slate-700 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          } ${index > 0 ? 'mt-2 block' : ''}`}
          style={{
            height: '1em', // Set height based on font size
          }}
        />
      ))}
    </>
  )
}

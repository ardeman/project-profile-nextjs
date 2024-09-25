import { PropsWithChildren } from 'react'

export const Title = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <h2 className="text-sm font-bold uppercase tracking-widest text-red-900 lg:sr-only dark:text-slate-200">
      {' '}
      {children}
    </h2>
  )
}

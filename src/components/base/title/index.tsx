import { PropsWithChildren } from 'react'

export const Title = ({ children }: PropsWithChildren) => (
  <h2 className="text-muted shrink-0 font-mono text-xs font-medium uppercase tracking-[0.18em]">
    {children}
  </h2>
)

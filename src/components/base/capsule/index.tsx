import { PropsWithChildren } from 'react'

export const Capsule = ({ children }: PropsWithChildren) => (
  <li className="mr-1.5 mt-1.5">
    <span className="border-line/70 bg-accent-soft/40 text-muted inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] font-normal leading-4">
      {children}
    </span>
  </li>
)

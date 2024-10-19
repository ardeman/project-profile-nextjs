'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MouseEvent, PropsWithChildren, useState } from 'react'

import { Pointer } from '@/components/base'
import { LinkedinProvider } from '@/contexts'

export const Providers = (props: PropsWithChildren) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }
  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
    >
      <Pointer position={position} />
      <div className="mx-auto min-h-dvh max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <QueryClientProvider client={queryClient}>
          <LinkedinProvider>{children}</LinkedinProvider>
        </QueryClientProvider>
      </div>
    </div>
  )
}

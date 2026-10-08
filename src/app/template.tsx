'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import { Pointer } from '@/components/base'
import { ThemeProvider } from '@/contexts'

const Template = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <div className="relative">
      <Pointer />
      <div className="mx-auto min-h-dvh max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </div>
    </div>
  )
}
export default Template

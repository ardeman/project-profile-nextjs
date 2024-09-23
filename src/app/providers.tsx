'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export const Providers = (props: PropsWithChildren) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

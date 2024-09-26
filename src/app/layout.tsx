'use client'

import '@/styles/globals.css'
import { useState, MouseEvent } from 'react'

import { Pointer } from '@/components/base'
import { LinkedinProvider } from '@/contexts'

import { Providers } from './providers'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <html lang="en">
      <body className="bg-slate-100 leading-relaxed text-stone-900 antialiased selection:bg-gray-900 selection:text-white dark:bg-slate-900 dark:text-slate-400 dark:selection:bg-sky-400 dark:selection:text-sky-900">
        <div
          className="relative"
          onMouseMove={handleMouseMove}
        >
          <Pointer position={position} />
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
            <Providers>
              <LinkedinProvider>{children}</LinkedinProvider>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout

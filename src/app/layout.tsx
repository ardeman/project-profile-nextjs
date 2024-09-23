'use client'

import localFont from 'next/font/local'
import './globals.css'
import { useState, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Pointer, Header } from '@/components'

import { ReactQueryProvider } from './query-client-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [activeSection, setActiveSection] = useState<string>('')

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <html lang="en">
      <body
        className={twMerge(
          geistSans.variable,
          geistMono.variable,
          'selection:bg-info bg-secondary text-muted selection:text-accent leading-relaxed antialiased'
        )}
      >
        <div
          className="relative"
          onMouseMove={handleMouseMove}
        >
          <Pointer position={position} />
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-[family-name:var(--font-geist-mono)] md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              <Header
                setActiveSection={setActiveSection}
                activeSection={activeSection}
              />
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout

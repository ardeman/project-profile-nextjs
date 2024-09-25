'use client'

import localFont from 'next/font/local'
import './globals.css'
import { useState, MouseEvent, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { Pointer } from '@/components/base'
import { Header } from '@/components/sections'
import { LinkedinProvider } from '@/contexts'

import { Providers } from './providers'

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
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <html lang="en">
      <body
        className={twMerge(
          geistSans.variable,
          geistMono.variable,
          'bg-slate-100 leading-relaxed text-stone-900 antialiased selection:bg-gray-900 selection:text-white dark:bg-slate-900 dark:text-slate-400 dark:selection:bg-sky-400 dark:selection:text-sky-900'
        )}
      >
        <div
          className="relative"
          onMouseMove={handleMouseMove}
        >
          <Providers>
            <LinkedinProvider>
              <Pointer position={position} />
              <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-[family-name:var(--font-geist-mono)] md:px-12 md:py-20 lg:px-24 lg:py-0">
                <div className="lg:flex lg:justify-between lg:gap-4">
                  {isMounted &&
                    typeof window !== 'undefined' &&
                    window.location.pathname === '/' && (
                      <Header
                        setActiveSection={setActiveSection}
                        activeSection={activeSection}
                      />
                    )}
                  {children}
                </div>
              </div>
            </LinkedinProvider>
          </Providers>
        </div>
      </body>
    </html>
  )
}

export default RootLayout

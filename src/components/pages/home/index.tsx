'use client'

import { useState } from 'react'

import {
  About,
  Experience,
  Footer,
  Header,
  MobileNavigation,
  Projects,
  Skills,
} from '@/components/sections'

export const HomePage = () => {
  const [activeSection, setActiveSection] = useState<string>('about')

  return (
    <div className="lg:flex lg:justify-between lg:gap-16 xl:gap-24">
      <Header
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <MobileNavigation activeSection={activeSection} />

      <main
        id="content"
        tabIndex={-1}
        className="min-w-0 space-y-14 pt-14 md:space-y-16 lg:flex-1 lg:space-y-20 lg:py-20"
      >
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Footer />
      </main>
    </div>
  )
}

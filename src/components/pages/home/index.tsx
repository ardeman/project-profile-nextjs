'use client'

import { useState } from 'react'

import {
  About,
  Experience,
  Footer,
  Header,
  Projects,
  Skills,
} from '@/components/sections'

export const HomePage = () => {
  const [activeSection, setActiveSection] = useState<string>('')

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <Header
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <main
        id="content"
        className="space-y-16 pt-24 md:space-y-24 lg:w-1/2 lg:space-y-36 lg:py-24"
      >
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </div>
  )
}

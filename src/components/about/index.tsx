'use client'

import { useLinkedinContext } from '@/contexts'

export const About = () => {
  const { profileData } = useLinkedinContext()

  return (
    <section
      id="about"
      aria-label="About me"
      className="scroll-mt-16 lg:scroll-mt-24"
    >
      <div className="bg-secondary/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-primary text-sm font-bold uppercase tracking-widest lg:sr-only">
          About
        </h2>
      </div>
      <div className="space-y-4">
        <p>{profileData?.['Summary']}</p>
      </div>
    </section>
  )
}

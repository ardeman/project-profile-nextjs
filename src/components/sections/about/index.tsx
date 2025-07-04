'use client'

import { Title } from '@/components/base'
import { useLinkedinContext } from '@/contexts'

export const About = () => {
  const { profileData } = useLinkedinContext()

  return (
    <section
      id="about"
      aria-label="About me"
      className="scroll-mt-16 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-100/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-slate-900/75">
        <Title>About</Title>
      </div>
      <div className="space-y-4">
        {profileData?.['Summary']
          ?.replace(/\\n/g, '\n') // convert escaped \n to real newlines
          .split('\n') // split into paragraphs
          .map((paragraph, idx) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))}
      </div>
    </section>
  )
}

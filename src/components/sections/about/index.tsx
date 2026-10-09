'use client'

import { Title } from '@/components/base'
import { useLinkedinContext } from '@/contexts'

export const About = () => {
  const { profileData } = useLinkedinContext()

  return (
    <section
      id="about"
      aria-label="About me"
      className="scroll-mt-24 lg:scroll-mt-20"
    >
      <div className="section-heading">
        <Title>About</Title>
      </div>
      <div className="space-y-4 text-base leading-7 text-muted">
        {profileData?.['Summary']
          ?.replaceAll(String.raw`\n`, '\n') // convert escaped \n to real newlines
          .split('\n') // split into paragraphs
          .map((paragraph, idx) => (
            <p key={idx}>{paragraph.trim()}</p>
          ))}
      </div>
    </section>
  )
}

import { Metadata } from 'next'

import { About, Experience, Projects, Blog, Footer } from '@/components'

export const metadata: Metadata = {
  title: 'Ardeman',
  description:
    'Ardeman is a software engineer who builds accessible, inclusive products and digital experiences for the web.',
}

const Home = () => {
  return (
    <main
      id="content"
      className="space-y-16 pt-24 md:space-y-24 lg:w-1/2 lg:space-y-36 lg:py-24"
    >
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Footer />
    </main>
  )
}

export default Home

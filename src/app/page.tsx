import { Metadata } from 'next'

import { Homepage } from '@/components'

export const metadata: Metadata = {
  title: 'Ardeman',
  description:
    'Ardeman is a software engineer who builds accessible, inclusive products and digital experiences for the web.',
}

const Home = () => {
  return <Homepage />
}

export default Home

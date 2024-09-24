import { Metadata } from 'next'

import { Homepage } from '@/components'

export const metadata: Metadata = {
  title: 'Ardeman',
  description:
    'Ardeman is a software engineer dedicated to creating accessible and inclusive digital products and web experiences.',
}

const Home = () => {
  return <Homepage />
}

export default Home

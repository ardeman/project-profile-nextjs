import { Metadata } from 'next'

import { ArchivePage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Project archive | Ardeman',
  description:
    'Explore Ardeman’s web applications, coding experiments, and open-source projects.',
  alternates: { canonical: '/archive' },
  openGraph: {
    title: 'Project archive | Ardeman',
    url: '/archive',
    description:
      'Web applications, coding experiments, and open-source projects by Ardeman.',
  },
  twitter: {
    title: 'Project archive | Ardeman',
    description:
      'Web applications, coding experiments, and open-source projects by Ardeman.',
  },
}
export default function Archive() {
  return <ArchivePage />
}

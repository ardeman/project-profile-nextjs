import { Metadata } from 'next'

const description =
  'Ardeman is a front-end engineer and team lead in Jakarta, with experience across web applications, full-stack development, and front-end delivery.'
export const metadata: Metadata = {
  metadataBase: new URL('https://ardeman.com'),
  title: 'Ardeman',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Ardeman — Front-End Engineer & Team Lead',
    description,
    siteName: 'Ardeman',
    locale: 'en_US',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Ardeman — Front-End Engineer & Team Lead. Building useful things for the web.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ardeman — Front-End Engineer & Team Lead',
    description,
    images: ['/images/social-preview.png'],
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/dark/favicon.ico?v=2',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/light/favicon.ico?v=2',
      },
    ],
  },
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ardeman',
  description:
    'Ardeman is a software engineer dedicated to creating accessible and inclusive digital products and web experiences.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/dark/favicon.ico',
        href: '/images/dark/favicon.ico',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/light/favicon.ico',
        href: '/images/light/favicon.ico',
      },
    ],
  },
}

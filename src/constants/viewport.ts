import { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#3b0764' },
    { media: '(prefers-color-scheme: light)', color: '#f1f5f9' },
  ],
}

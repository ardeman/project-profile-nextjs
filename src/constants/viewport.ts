import { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1225' },
    { media: '(prefers-color-scheme: light)', color: '#f7f5f2' },
  ],
}

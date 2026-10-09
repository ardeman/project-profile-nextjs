import '@/styles/globals.css'

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){var d=matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light'}})()`

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang="en"
    suppressHydrationWarning
  >
    <head>
      {/* Apply the saved theme before the page paints. This script contains no user input. */}
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    <body className="bg-canvas font-sans leading-relaxed text-ink antialiased selection:bg-accent-soft selection:text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-surface focus:p-3 focus:text-ink"
      >
        Skip to content
      </a>
      {children}
    </body>
  </html>
)
export default RootLayout
export { metadata, viewport } from '@/constants'

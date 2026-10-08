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
    <body className="bg-canvas text-ink selection:bg-accent-soft selection:text-ink font-sans leading-relaxed antialiased">
      <a
        href="#content"
        className="focus:bg-surface focus:text-ink sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:p-3"
      >
        Skip to content
      </a>
      {children}
    </body>
  </html>
)
export default RootLayout
export { metadata, viewport } from '@/constants'

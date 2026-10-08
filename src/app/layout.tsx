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
    <body className="bg-slate-100 leading-relaxed text-stone-900 antialiased selection:bg-gray-900 selection:text-white dark:bg-purple-950 dark:text-slate-400 dark:selection:bg-fuchsia-400 dark:selection:text-sky-900">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:p-3 focus:text-red-900"
      >
        Skip to content
      </a>
      {children}
    </body>
  </html>
)
export default RootLayout
export { metadata, viewport } from '@/constants'

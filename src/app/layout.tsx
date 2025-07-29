import '@/styles/globals.css'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="bg-slate-100 leading-relaxed text-stone-900 antialiased selection:bg-gray-900 selection:text-white dark:bg-purple-950 dark:text-slate-400 dark:selection:bg-fuchsia-400 dark:selection:text-sky-900">
        {children}
      </body>
    </html>
  )
}

export default RootLayout

export { metadata } from '@/constants'
export { viewport } from '@/constants'

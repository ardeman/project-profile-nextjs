export const Footer = () => {
  return (
    <footer className="max-w-md pb-16 text-sm text-red-600 sm:pb-0 dark:text-slate-500">
      <p>
        Inspired from{' '}
        <a
          href="https://brittanychiang.com/"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Brittany Chiang (opens in a new tab)"
        >
          Brittany Chiang
        </a>
        &rsquo;s personal website and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Visual Studio Code (opens in a new tab)"
        >
          Visual Studio Code
        </a>
        . Built with{' '}
        <a
          href="https://nextjs.org/"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Next.js (opens in a new tab)"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind CSS
        </a>
        , deployed with{' '}
        <a
          href="https://github.com/features/actions"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Vercel (opens in a new tab)"
        >
          GitHub Actions
        </a>{' '}
        on{' '}
        <a
          href="https://pages.github.com/"
          className="font-medium text-red-900 hover:text-gray-900 focus-visible:text-gray-900 dark:text-slate-400 dark:hover:text-sky-400 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Vercel (opens in a new tab)"
        >
          GitHub Pages
        </a>
        .
      </p>
    </footer>
  )
}

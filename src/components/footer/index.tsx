export const Footer = () => {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        Inspired from{' '}
        <a
          href="https://brittanychiang.com/"
          className="hover:text-info focus-visible:text-info text-muted font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Brittany Chiang (opens in a new tab)"
        >
          Brittany Chiang
        </a>{' '}
        résumé and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          className="hover:text-info focus-visible:text-info text-muted font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Visual Studio Code (opens in a new tab)"
        >
          Visual Studio Code
        </a>
        . Built with{' '}
        <a
          href="https://tailwindcss.com/"
          className="hover:text-info focus-visible:text-info text-muted font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind CSS
        </a>
        , hosted on{' '}
        <a
          href="https://pages.github.com/"
          className="hover:text-info focus-visible:text-info text-muted font-medium"
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

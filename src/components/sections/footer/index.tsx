export const Footer = () => {
  return (
    <footer className="border-line text-muted border-t pt-6 text-xs leading-6">
      <p>
        Built by Ardeman with{' '}
        <a
          href="https://nextjs.org/"
          className="text-ink hover:text-accent focus-visible:text-accent font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Next.js (opens in a new tab)"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          className="text-ink hover:text-accent focus-visible:text-accent font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind CSS
        </a>
        . Hosted on{' '}
        <a
          href="https://pages.github.com/"
          className="text-ink hover:text-accent focus-visible:text-accent font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub Pages (opens in a new tab)"
        >
          GitHub Pages
        </a>
        . Layout inspired by{' '}
        <a
          href="https://brittanychiang.com/"
          className="text-ink hover:text-accent focus-visible:text-accent font-medium"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Brittany Chiang (opens in a new tab)"
        >
          Brittany Chiang
        </a>
        .
      </p>
    </footer>
  )
}

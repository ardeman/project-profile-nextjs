import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'

import { ThemeToggle } from '@/components/base'

export const PageNavigation = () => (
  <nav
    aria-label="Page navigation"
    className="flex items-center justify-between gap-4 border-b border-line pb-5"
  >
    <Link
      href="/"
      className="text-link"
    >
      <GoArrowLeft aria-hidden="true" />
      Back to portfolio
    </Link>
    <ThemeToggle placement="below" />
  </nav>
)

'use client'

import { useState, useRef, useEffect } from 'react'
import { GoMoon, GoSun, GoDeviceDesktop } from 'react-icons/go'

import { useTheme } from '@/contexts/theme-context'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': {
        return <GoSun className="h-6 w-6" />
      }
      case 'dark': {
        return <GoMoon className="h-6 w-6" />
      }
      case 'system': {
        return <GoDeviceDesktop className="h-6 w-6" />
      }
      default: {
        return <GoDeviceDesktop className="h-6 w-6" />
      }
    }
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div
      className="relative shrink-0 text-xs"
      ref={popoverRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block hover:text-red-900 dark:hover:text-zinc-200"
        aria-label="Theme toggle"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Current theme: ${theme}`}
      >
        <span className="sr-only">Theme toggle</span>
        {getThemeIcon()}
      </button>

      {isOpen && (
        <div className="absolute bottom-0 left-full z-50 ml-2 min-w-[120px] rounded-lg border border-red-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
              theme === 'light'
                ? 'bg-red-100 text-red-900 dark:bg-slate-700 dark:text-zinc-200'
                : 'text-red-600 hover:bg-red-50 hover:text-red-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-zinc-200'
            }`}
          >
            <GoSun className="h-4 w-4" />
            <span>Light</span>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-red-100 text-red-900 dark:bg-slate-700 dark:text-zinc-200'
                : 'text-red-600 hover:bg-red-50 hover:text-red-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-zinc-200'
            }`}
          >
            <GoMoon className="h-4 w-4" />
            <span>Dark</span>
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
              theme === 'system'
                ? 'bg-red-100 text-red-900 dark:bg-slate-700 dark:text-zinc-200'
                : 'text-red-600 hover:bg-red-50 hover:text-red-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-zinc-200'
            }`}
          >
            <GoDeviceDesktop className="h-4 w-4" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  )
}

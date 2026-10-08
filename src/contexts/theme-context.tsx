'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (isTheme(saved)) setTheme(saved)
    } catch {
      /* Keep system theme if storage is unavailable. */
    }
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const resolved =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme
      document.documentElement.classList.toggle('dark', resolved === 'dark')
      document.documentElement.classList.toggle('light', resolved === 'light')
      document.documentElement.style.colorScheme = resolved
      setResolvedTheme(resolved)
    }
    apply()
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* Theme still works without persistence. */
    }
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme, mounted])
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

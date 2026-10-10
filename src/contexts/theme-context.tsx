'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

type Theme = 'light' | 'dark' | 'system'
type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const isTheme = (value: string | null): value is Theme =>
  ['light', 'dark', 'system'].includes(value ?? '')
const getServerTheme = (): Theme => 'system'

// The store reads browser preferences only when React subscribes after hydration.
const createThemeStore = () => {
  let theme: Theme = 'system'
  const listeners = new Set<() => void>()
  const apply = () => {
    const resolved =
      theme === 'system'
        ? matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    document.documentElement.classList.toggle('light', resolved === 'light')
    document.documentElement.style.colorScheme = resolved
    // Override the system-only metadata while retaining its no-JavaScript fallback.
    for (const icon of document.querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"][href="/images/light/favicon.ico"], link[rel="icon"][href="/images/dark/favicon.ico"]',
    )) {
      icon.media =
        icon.getAttribute('href') === `/images/${resolved}/favicon.ico`
          ? 'all'
          : 'not all'
    }
  }
  const notify = () => {
    apply()
    for (const listener of listeners) listener()
  }
  const systemChanged = () => {
    if (theme === 'system') apply()
  }
  return {
    getSnapshot: () => theme,
    setTheme: (value: Theme) => {
      theme = value
      try {
        localStorage.setItem('theme', value)
      } catch {
        // Theme still works without persistence.
      }
      notify()
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      try {
        const saved = localStorage.getItem('theme')
        if (isTheme(saved)) theme = saved
      } catch {
        // Keep system theme if storage is unavailable.
      }
      notify()
      const media = matchMedia('(prefers-color-scheme: dark)')
      const storageChanged = (event: StorageEvent) => {
        if (event.key !== 'theme' && event.key !== null) return
        theme = isTheme(event.newValue) ? event.newValue : 'system'
        notify()
      }
      media.addEventListener('change', systemChanged)
      addEventListener('storage', storageChanged)
      return () => {
        listeners.delete(listener)
        media.removeEventListener('change', systemChanged)
        removeEventListener('storage', storageChanged)
      }
    },
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(createThemeStore)
  const theme = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerTheme,
  )
  const value = useMemo(
    () => ({ theme, setTheme: store.setTheme }),
    [theme, store],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

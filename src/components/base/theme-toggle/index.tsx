'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { GoDeviceDesktop, GoMoon, GoSun } from 'react-icons/go'

import { useTheme } from '@/contexts'

const options = [
  { value: 'light', label: 'Light', Icon: GoSun },
  { value: 'dark', label: 'Dark', Icon: GoMoon },
  { value: 'system', label: 'System', Icon: GoDeviceDesktop },
] as const

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const id = useId()
  const Icon =
    options.find((option) => option.value === theme)?.Icon || GoDeviceDesktop
  useEffect(() => {
    if (!isOpen) return
    panel.current
      ?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      ?.focus()
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [isOpen])
  return (
    <div
      ref={container}
      className="relative shrink-0 text-xs"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setIsOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault()
          setIsOpen(false)
          trigger.current?.focus()
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block rounded p-2 hover:text-red-900 dark:hover:text-zinc-200"
        aria-label="Choose color theme"
        aria-expanded={isOpen}
        aria-controls={id}
        title={`Current theme: ${theme}`}
      >
        <Icon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div
          ref={panel}
          id={id}
          role="group"
          aria-label="Color theme"
          className="absolute bottom-full right-0 z-50 mb-2 min-w-[140px] rounded-lg border border-red-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          {options.map(({ value, label, Icon: OptionIcon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={theme === value}
              onClick={() => {
                setTheme(value)
                setIsOpen(false)
                trigger.current?.focus()
              }}
              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-sm ${
                theme === value
                  ? 'bg-red-100 text-red-900 dark:bg-slate-700 dark:text-zinc-200'
                  : 'text-slate-700 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <OptionIcon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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
        className="icon-button"
        aria-label="Choose color theme"
        aria-expanded={isOpen}
        aria-controls={id}
        title={`Current theme: ${theme}`}
      >
        <Icon className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          ref={panel}
          id={id}
          role="group"
          aria-label="Color theme"
          className="border-line bg-surface absolute bottom-full right-0 z-50 mb-2 flex min-w-[140px] flex-col gap-1 rounded-xl border p-2 shadow-lg"
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
              className={`focus-visible:outline-accent flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-sm focus-visible:outline-offset-[-2px] ${
                theme === value
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:bg-accent-soft hover:text-ink'
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

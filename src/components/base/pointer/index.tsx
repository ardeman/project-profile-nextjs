'use client'

import { useEffect, useRef } from 'react'

export const Pointer = () => {
  const pointer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )
    let frame = 0
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!pointer.current) return
        pointer.current.style.background = `radial-gradient(600px at ${event.clientX}px ${event.clientY}px, var(--pointer), transparent 80%)`
        pointer.current.style.opacity = '1'
      })
    }
    const hide = () => {
      cancelAnimationFrame(frame)
      if (pointer.current) pointer.current.style.opacity = '0'
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    media.addEventListener('change', hide)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      media.removeEventListener('change', hide)
    }
  }, [])
  return (
    <div
      ref={pointer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden opacity-0 motion-reduce:!hidden lg:block"
    />
  )
}

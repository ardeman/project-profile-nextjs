'use client'

import { useEffect, useRef } from 'react'

export const Pointer = () => {
  const pointer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = matchMedia(
      '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let frame = 0
    let x = 0
    let y = 0
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!pointer.current) return
        pointer.current.style.background = `radial-gradient(420px at ${x}px ${y}px, var(--pointer), transparent 80%)`
        pointer.current.style.opacity = '1'
      })
    }
    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (pointer.current) pointer.current.style.opacity = '0'
    }
    addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    media.addEventListener('change', hide)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      media.removeEventListener('change', hide)
    }
  }, [])
  return (
    <div
      ref={pointer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden opacity-0 motion-reduce:hidden! lg:block"
    />
  )
}

import { TProps } from './type'

export const Pointer = (props: TProps) => {
  const { position } = props
  const isVisible = position.x > 0 || position.y > 0

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 hidden transition duration-300 lg:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, var(--pointer), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  )
}

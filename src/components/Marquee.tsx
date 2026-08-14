import type { ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  reverse?: boolean
}

export function Marquee({ children, reverse = false }: MarqueeProps) {
  return (
    <div className="marquee" aria-hidden="true">
      <div
        className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  )
}

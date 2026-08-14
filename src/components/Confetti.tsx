import { useEffect, useRef } from 'react'

type ConfettiProps = {
  /** Flip to true to fire the burst once. */
  fire: boolean
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  size: number
  color: string
  shape: 0 | 1
}

// Palette pulled from the site's design tokens (copper, teal, paper, warm).
const COLORS = ['#d9572c', '#167f7a', '#fffaf0', '#f4ead7']

/**
 * A lightweight, dependency-free confetti burst on a fixed full-screen canvas.
 * Fires exactly once and is fully skipped for users who prefer reduced motion.
 */
export function Confetti({ fire }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    if (!fire || firedRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    firedRef.current = true

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()

    const originX = (window.innerWidth / 2) * dpr
    const originY = window.innerHeight * 0.4 * dpr
    const count = 150
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const speed = (6 + Math.random() * 9) * dpr
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7 * dpr,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        size: (6 + Math.random() * 7) * dpr,
        color: COLORS[i % COLORS.length],
        shape: (i % 2) as 0 | 1,
      })
    }

    const gravity = 0.28 * dpr
    const drag = 0.99
    const maxLife = 280
    let life = 0
    let raf = 0

    const tick = () => {
      life++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const alpha = Math.max(0, 1 - life / maxLife)
      let onScreen = false

      for (const p of particles) {
        p.vy += gravity
        p.vx *= drag
        p.vy *= drag
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr

        if (p.y < canvas.height + p.size) onScreen = true

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.shape === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (alpha > 0 && onScreen) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [fire])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}

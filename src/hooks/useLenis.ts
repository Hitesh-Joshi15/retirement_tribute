import { useEffect } from 'react'
import Lenis from 'lenis'

let activeLenis: Lenis | null = null

/** Smoothly scroll to a section by id, using Lenis when it's active. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  if (activeLenis) {
    activeLenis.scrollTo(target, { duration: 1.2 })
  } else {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
  }
}

export function useLenis() {
  useEffect(() => {
    // Honor reduced-motion: fall back to the browser's native scrolling.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    activeLenis = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      activeLenis = null
    }
  }, [])
}

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.6 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.6 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }
    const detectHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      setHovering(!!target?.closest('[data-cursor="hover"], a, button'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', detectHover)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', detectHover)
    }
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.2 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  )
}

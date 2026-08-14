import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Marquee } from './Marquee'

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.9])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const blobX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 1 })
  const blobY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 1 })

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      mouseX.set(event.clientX - window.innerWidth / 2)
      mouseY.set(event.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY])

  const firstName = 'Zoukhra'.split('')
  const lastName = 'Bash'.split('')

  return (
    <section ref={ref} id="hero" className="hero">
      <motion.div
        className="hero__overlay"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="hero__blob"
        style={{ x: blobX, y: blobY }}
        aria-hidden="true"
      />

      <motion.div
        className="hero__content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Nearly three decades with us · Retiring 2026
        </motion.p>

        <h1 className="hero__title" aria-label="Zoukhra Bash">
          <span className="hero__title-row" aria-hidden="true">
            {firstName.map((character, index) => (
              <motion.span
                key={`f-${index}`}
                className="hero__letter"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {character}
              </motion.span>
            ))}
          </span>
          <span
            className="hero__title-row hero__title-row--alt"
            aria-hidden="true"
          >
            {lastName.map((character, index) => (
              <motion.span
                key={`l-${index}`}
                className="hero__letter"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + (firstName.length + index) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {character}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="hero__lede"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Almost thirty years with us, a lifetime of work before it, and a
          quiet, remarkable influence woven through both. This is her story,
          told the way she lived it — carefully, generously, and one chapter
          at a time.
        </motion.p>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>

      <div className="hero__marquee">
        <Marquee>
          <span>Legacy</span>
          <span>·</span>
          <span>Mentor</span>
          <span>·</span>
          <span>Gratitude</span>
          <span>·</span>
          <span>Farewell</span>
          <span>·</span>
        </Marquee>
      </div>
    </section>
  )
}

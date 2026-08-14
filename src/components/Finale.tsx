import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Confetti } from './Confetti'

export function Finale() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const orbAY = useTransform(scrollYProgress, [0, 1], ['-15%', '20%'])
  const orbBY = useTransform(scrollYProgress, [0, 1], ['20%', '-25%'])
  const bodyY = useTransform(scrollYProgress, [0, 1], ['15%', '-10%'])

  const [celebrate, setCelebrate] = useState(false)

  return (
    <section ref={ref} id="finale" className="finale">
      <Confetti fire={celebrate} />
      <motion.div
        className="finale__orb finale__orb--a"
        style={{ y: orbAY }}
        aria-hidden="true"
      />
      <motion.div
        className="finale__orb finale__orb--b"
        style={{ y: orbBY }}
        aria-hidden="true"
      />

      <motion.div
        className="finale__body"
        style={{ y: bodyY }}
        onViewportEnter={() => setCelebrate(true)}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.p
          className="section-kicker"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The next chapter
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Thank you, <em>Zoukhra.</em>
        </motion.h2>
        <motion.p
          className="finale__lede"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          For almost thirty years of steady hands and warm counsel. For the
          patience, the standards, the quiet mentoring, and the example that
          shaped so many of us. May this next chapter be spacious, joyful, and
          entirely, richly yours.
        </motion.p>
        <motion.div
          className="finale__signatures"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          — The Team
        </motion.div>
      </motion.div>
    </section>
  )
}

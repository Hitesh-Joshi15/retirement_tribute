import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Intro() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['15%', '-45%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  return (
    <section ref={ref} className="intro">
      <motion.div
        className="intro__big"
        style={{ x, rotate }}
        aria-hidden="true"
      >
A LIFETIME · A CAREER · A LEGACY · A LIFETIME · A CAREER · A LEGACY
      </motion.div>

      <motion.div
        className="intro__body"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">The idea</p>
        <h2>
          Not a card.
          <br />
          Not a slideshow.
          <br />
          <em>A tribute you can walk through.</em>
        </h2>
        <p>
          For nearly thirty years Zoukhra has been part of the fabric of this
          team — steady, precise, generous, and quietly formidable. This
          scroll is our way of saying thank you: chapter by chapter, photo by
          photo, and in the words of the people who had the privilege of
          working beside her.
        </p>
      </motion.div>
    </section>
  )
}

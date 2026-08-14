import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { chapters } from '../content'
import type { Chapter } from '../content'

export function Timeline() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} id="timeline" className="timeline">
      <div className="timeline__sticky">
        <div className="timeline__header">
          <span className="section-kicker">Life &amp; career journey</span>
          <span className="timeline__count">{chapters.length} chapters</span>
        </div>

        <div className="timeline__bar" aria-hidden="true">
          <motion.div
            className="timeline__bar-fill"
            style={{ scaleY: barScale }}
          />
        </div>

        <div className="timeline__stage">
          {chapters.map((chapter, index) => (
            <ChapterSlide
              key={chapter.year}
              chapter={chapter}
              index={index}
              total={chapters.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ChapterSlideProps = {
  chapter: Chapter
  index: number
  total: number
  progress: MotionValue<number>
}

function ChapterSlide({ chapter, index, total, progress }: ChapterSlideProps) {
  const step = 1 / total
  const start = index * step
  const end = start + step
  const fade = step * 0.25

  const isFirst = index === 0
  const isLast = index === total - 1

  // Cover the full [0, 1] range so useTransform always clamps to the
  // explicit hold values instead of interpolating out of bounds.
  const inputs: number[] = [0]
  const outputs: number[] = [isFirst ? 1 : 0]
  if (!isFirst) {
    inputs.push(start - fade, start)
    outputs.push(0, 1)
  }
  if (!isLast) {
    inputs.push(end - fade, end)
    outputs.push(1, 0)
  }
  inputs.push(1)
  outputs.push(isLast ? 1 : 0)

  const opacity = useTransform(progress, inputs, outputs, { clamp: true })
  const copyY = useTransform(progress, [start, end], [40, -40])
  const imgScale = useTransform(progress, [start, end], [1.2, 1.0])
  const imgY = useTransform(progress, [start, end], [24, -24])

  return (
    <motion.div className="chapter" style={{ opacity }}>
      <motion.div
        className="chapter__image"
        style={{ scale: imgScale, y: imgY }}
      >
        <img src={chapter.image} alt={chapter.alt} loading="lazy" decoding="async" />
      </motion.div>
      <motion.div className="chapter__copy" style={{ y: copyY }}>
        <div className="chapter__year">{chapter.year}</div>
        <h3>{chapter.title}</h3>
        <p>{chapter.text}</p>
      </motion.div>
    </motion.div>
  )
}

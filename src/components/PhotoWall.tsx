import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Marquee } from './Marquee'
import { Lightbox } from './Lightbox'
import { photoColumns, photoMarquee } from '../content'
import type { Photo } from '../content'

function PhotoButton({
  photo,
  onOpen,
}: {
  photo: Photo
  onOpen: (photo: Photo) => void
}) {
  return (
    <button
      type="button"
      className="photowall__item"
      data-cursor="hover"
      onClick={() => onOpen(photo)}
      aria-label={`View photo: ${photo.alt}`}
    >
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
    </button>
  )
}

export function PhotoWall() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yA = useTransform(scrollYProgress, [0, 1], ['5%', '-30%'])
  const yB = useTransform(scrollYProgress, [0, 1], ['-5%', '-10%'])
  const yC = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  const [active, setActive] = useState<Photo | null>(null)

  return (
    <section ref={ref} id="photos" className="photowall">
      <motion.div
        className="photowall__head"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">Thirty years, in frames</p>
        <h2>Moments we get to keep.</h2>
        <p>
          Team offsites, quiet desk-side conversations, launch nights, farewell
          lunches. These frames are placeholders — as real photos from across
          the years arrive, they slot right in and the story only gets richer.
        </p>
      </motion.div>

      <div className="photowall__grid">
        <motion.div className="photowall__column" style={{ y: yA }}>
          {photoColumns[0].map((photo) => (
            <PhotoButton key={photo.src} photo={photo} onOpen={setActive} />
          ))}
        </motion.div>
        <motion.div
          className="photowall__column photowall__column--mid"
          style={{ y: yB }}
        >
          {photoColumns[1].map((photo) => (
            <PhotoButton key={photo.src} photo={photo} onOpen={setActive} />
          ))}
        </motion.div>
        <motion.div className="photowall__column" style={{ y: yC }}>
          {photoColumns[2].map((photo) => (
            <PhotoButton key={photo.src} photo={photo} onOpen={setActive} />
          ))}
        </motion.div>
      </div>

      <div className="photowall__marquee">
        <Marquee reverse>
          {photoMarquee.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="photowall__marquee-img"
              loading="lazy"
              decoding="async"
            />
          ))}
        </Marquee>
      </div>

      <Lightbox photo={active} onClose={() => setActive(null)} />
    </section>
  )
}

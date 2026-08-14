import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAME = 'Zoukhra Bash'
const MIN_VISIBLE_MS = 1400
const HARD_STOP_MS = 5000

/**
 * Full-screen intro splash: the name draws up, a progress line fills, then the
 * curtain lifts to reveal the hero. Dismisses once the page has loaded (with a
 * minimum on-screen time so it never just flashes) and always releases via a
 * hard-stop fallback. Motion is calmed automatically for reduced-motion users.
 */
export function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let revealTimer = 0

    const reveal = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start))
      revealTimer = window.setTimeout(() => setDone(true), wait)
    }

    if (document.readyState === 'complete') {
      reveal()
    } else {
      window.addEventListener('load', reveal, { once: true })
    }

    // Never trap the user if `load` is delayed or never fires.
    const hardStop = window.setTimeout(() => setDone(true), HARD_STOP_MS)

    return () => {
      window.removeEventListener('load', reveal)
      window.clearTimeout(revealTimer)
      window.clearTimeout(hardStop)
    }
  }, [])

  // Lock page scrolling while the splash is on screen.
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          aria-hidden="true"
        >
          <div className="preloader__inner">
            <div className="preloader__name">
              {NAME.split('').map((character, index) => (
                <motion.span
                  key={index}
                  className="preloader__letter"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {character === ' ' ? '\u00A0' : character}
                </motion.span>
              ))}
            </div>
            <div className="preloader__bar">
              <motion.div
                className="preloader__bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'

const ROAD_IMG =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2600&q=85'

/**
 * Global fixed backdrop: the road we're traveling along.
 *
 * Sits at z-index: -1 behind every section. As the page scrolls, it drifts,
 * scales, and slowly changes brightness — giving the whole site the feel
 * of a continuous drive from morning haze to golden-hour finale.
 */
export function RoadCanvas() {
  const { scrollYProgress } = useScroll()

  // Drift the road slightly upward as we scroll = ground moving past us
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  // Slowly scale up = "driving deeper into the horizon"
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.06, 1.16, 1.28],
    { clamp: true }
  )
  // Cinematic brightness curve — morning → shadowed midday → golden light
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85, 1],
    [1, 0.72, 0.78, 0.95, 1.08],
    { clamp: true }
  )
  const saturate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1.15, 1.22],
    { clamp: true }
  )
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 8], {
    clamp: true,
  })
  const filter = useMotionTemplate`brightness(${brightness}) saturate(${saturate}) hue-rotate(${hueRotate}deg)`

  // Vignette deepens in the middle stretch, opens up at hero and finale
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.85, 1],
    [0.55, 0.7, 0.82, 0.7, 0.5],
    { clamp: true }
  )

  return (
    <div className="road-canvas" aria-hidden="true">
      <motion.div
        className="road-canvas__image"
        style={{
          y,
          scale,
          filter,
          backgroundImage: `url(${ROAD_IMG})`,
        }}
      />
      <motion.div
        className="road-canvas__vignette"
        style={{ opacity: vignetteOpacity }}
      />
      <div className="road-canvas__grain" />
    </div>
  )
}

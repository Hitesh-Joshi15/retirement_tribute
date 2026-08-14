import { useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'

// Same road as the hero, higher-res crop — creates continuity: the road you saw at the top is
// the one you're now travelling down. Swap for any Unsplash / real POV shot with a strong horizon.
const ROAD_IMG =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85'

type Milestone = {
  at: number
  year: string
  hint: string
  label: string
}

const milestones: Milestone[] = [
  {
    at: 0.1,
    year: '1996',
    hint: 'The start',
    label: "Day one on a road we didn't yet know.",
  },
  {
    at: 0.28,
    year: '2004',
    hint: 'The craft',
    label: 'Learning what quality really costs — and why it matters.',
  },
  {
    at: 0.46,
    year: '2012',
    hint: 'The team',
    label: 'A steady hand behind every launch, every hard call.',
  },
  {
    at: 0.64,
    year: '2020',
    hint: 'The wisdom',
    label: 'A voice we all leaned on through the hardest years.',
  },
  {
    at: 0.82,
    year: '2026',
    hint: 'The next road',
    label: 'A slower, brighter horizon opens up ahead.',
  },
]

// Days of care across her time with us.
// Based on ~15 Sep 1996 (joining) → 14 Aug 2026 (retirement); update if confirmed.
const TOTAL_DAYS = 10926

export function Journey() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Road appears to move forward: scale up + drift down (feels like approaching horizon).
  const roadScale = useTransform(scrollYProgress, [0, 1], [1.05, 2.4], {
    clamp: true,
  })
  const roadY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'], {
    clamp: true,
  })
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.75, 1, 0.72],
    { clamp: true },
  )
  const roadFilter = useMotionTemplate`brightness(${brightness}) saturate(1.1)`

  // Vignette pulses subtly for cinematic feel.
  const vignette = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.45, 0.7, 0.6],
    { clamp: true },
  )

  // HUD readouts: year 1996 → 2026, days of care 0 → TOTAL_DAYS.
  const [days, setDays] = useState(0)
  const [yearReading, setYearReading] = useState('1996')
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDays(Math.round(v * TOTAL_DAYS))
    setYearReading(String(Math.round(1996 + v * 30)))
  })

  return (
    <section ref={ref} id="journey" className="journey">
      <div className="journey__sticky">
        <motion.div
          className="journey__road"
          style={{
            scale: roadScale,
            y: roadY,
            filter: roadFilter,
            backgroundImage: `url(${ROAD_IMG})`,
          }}
        />

        <motion.div
          className="journey__vignette"
          style={{ opacity: vignette }}
        />

        <div className="journey__scrim" aria-hidden="true" />

        <div className="journey__streaks" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <Streak key={i} index={i} progress={scrollYProgress} />
          ))}
        </div>

        <div className="journey__caption">
          <span>The journey · scroll to travel</span>
        </div>

        <div className="journey__milestones">
          {milestones.map((m, i) => (
            <MilestoneCard
              key={m.year}
              milestone={m}
              progress={scrollYProgress}
              index={i}
            />
          ))}
        </div>

        <div className="journey__hud">
          <div className="journey__hud-block">
            <span className="journey__hud-label">Year</span>
            <span className="journey__hud-value journey__hud-value--year">
              {yearReading}
            </span>
          </div>
          <div className="journey__hud-block journey__hud-block--right">
            <span className="journey__hud-label">Days of care</span>
            <span className="journey__hud-value">
              {days.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function MilestoneCard({
  milestone,
  progress,
  index,
}: {
  milestone: Milestone
  progress: MotionValue<number>
  index: number
}) {
  const { at, year, hint, label } = milestone
  const half = 0.07
  const start = Math.max(0, at - half)
  const end = Math.min(1, at + half)

  // Fly toward camera: small & blurred in the distance → sharp at peak → grows past camera and fades.
  const scale = useTransform(progress, [start, at, end], [0.35, 1, 2.1], {
    clamp: true,
  })
  const opacity = useTransform(
    progress,
    [start, start + 0.015, end - 0.015, end],
    [0, 1, 1, 0],
    { clamp: true },
  )
  const yShift = useTransform(progress, [start, end], [40, -40], {
    clamp: true,
  })
  const blur = useTransform(
    progress,
    [start, at - 0.025, at + 0.025, end],
    [3, 0, 0, 3],
    { clamp: true },
  )
  const blurFilter = useMotionTemplate`blur(${blur}px)`

  // Slight horizontal rhythm — even milestones nudge left, odd nudge right.
  const xNudge = index % 2 === 0 ? -32 : 32

  return (
    <motion.div
      className="milestone"
      style={{
        scale,
        opacity,
        y: yShift,
        x: xNudge,
        filter: blurFilter,
      }}
    >
      <div className="milestone__mark">{hint}</div>
      <div className="milestone__year">{year}</div>
      <div className="milestone__label">{label}</div>
    </motion.div>
  )
}

function Streak({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  // Deterministic pseudo-random so streak positions are stable between renders.
  const seed = ((index * 613 + 41) % 100) / 100
  const yPos = 14 + seed * 72
  const side = index % 2 === 0 ? 'left' : 'right'
  const length = 12 + seed * 22

  const startPct = side === 'left' ? -20 : 20
  const endPct = side === 'left' ? -160 : 160
  const x = useTransform(
    progress,
    [0, 1],
    [`${startPct}%`, `${endPct}%`],
    { clamp: false },
  )
  const opacity = useTransform(
    progress,
    [0, 0.08, 0.92, 1],
    [0, 0.55, 0.55, 0],
    { clamp: true },
  )

  return (
    <motion.span
      className={`streak streak--${side}`}
      style={{
        top: `${yPos}%`,
        width: `${length}vw`,
        x,
        opacity,
      }}
    />
  )
}

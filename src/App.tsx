import { MotionConfig } from 'framer-motion'
import { ChapterNav } from './components/ChapterNav'
import { CustomCursor } from './components/CustomCursor'
import { Finale } from './components/Finale'
import { Guestbook } from './components/Guestbook'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Journey } from './components/Journey'
import { Marquee } from './components/Marquee'
import { Messages } from './components/Messages'
import { PhotoWall } from './components/PhotoWall'
import { Preloader } from './components/Preloader'
import { RoadCanvas } from './components/RoadCanvas'
import { ScrollProgress } from './components/ScrollProgress'
import { ThemeToggle } from './components/ThemeToggle'
import { Timeline } from './components/Timeline'
import { useLenis } from './hooks/useLenis'
import './App.css'

function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <RoadCanvas />
      <CustomCursor />
      <ScrollProgress />
      <ThemeToggle />
      <ChapterNav />
      <main>
        <Hero />
        <Intro />
        <div className="ribbon" aria-hidden="true">
          <Marquee>
            <span>Zoukhra Bash</span>
            <span>·</span>
            <span>A Life Well Built</span>
            <span>·</span>
            <span>Zoukhra Bash</span>
            <span>·</span>
            <span>A Life Well Built</span>
            <span>·</span>
          </Marquee>
        </div>
        <Journey />
        <div className="open-road" aria-hidden="true">
          <span className="open-road__sign">Mile marker · 1996 · The arrival</span>
        </div>
        <Timeline />
        <div className="open-road open-road--tall" aria-hidden="true">
          <span className="open-road__sign">Mile marker · 2006 · The team she built</span>
        </div>
        <PhotoWall />
        <div className="open-road" aria-hidden="true">
          <span className="open-road__sign">Mile marker · 2016 · The wisdom years</span>
        </div>
        <Messages />
        <Guestbook />
        <div className="open-road open-road--tall" aria-hidden="true">
          <span className="open-road__sign">Mile marker · 2026 · A well-earned horizon</span>
        </div>
        <Finale />
      </main>
    </MotionConfig>
  )
}

export default App

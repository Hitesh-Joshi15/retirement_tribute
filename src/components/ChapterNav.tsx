import { useEffect, useState } from 'react'
import { scrollToSection } from '../hooks/useLenis'

type Section = {
  id: string
  label: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Top' },
  { id: 'journey', label: 'The journey' },
  { id: 'timeline', label: 'Chapters' },
  { id: 'photos', label: 'Moments' },
  { id: 'messages', label: 'Tributes' },
  { id: 'guestbook', label: 'Guestbook' },
  { id: 'finale', label: 'Farewell' },
]

/**
 * Fixed dot-rail that lets visitors jump between the major eras of the page
 * and shows where they currently are. The active section is tracked with an
 * IntersectionObserver watching a thin band across the middle of the viewport.
 */
export function ChapterNav() {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="chapter-nav" aria-label="Section navigation">
      <ul>
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                className={`chapter-nav__dot ${isActive ? 'is-active' : ''}`}
                data-cursor="hover"
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="chapter-nav__label">{section.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

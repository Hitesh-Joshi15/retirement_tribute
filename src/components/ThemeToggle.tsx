import { useEffect, useState } from 'react'

type Theme = 'day' | 'night'

const STORAGE_KEY = 'theme'

function readInitialTheme(): Theme {
  const current = document.documentElement.dataset.theme
  if (current === 'day' || current === 'night') return current

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'day' || saved === 'night') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'night'
    : 'day'
}

/**
 * Day / night theme switch. The road already arcs from morning haze to golden
 * hour; this lets a visitor settle the whole page into a warm night palette.
 * The choice is persisted, and an inline script in index.html applies it before
 * first paint to avoid a flash.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('day')

  // Sync from the value the inline script already applied.
  useEffect(() => {
    setTheme(readInitialTheme())
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'night' ? '#14100e' : '#d9572c')
    }
  }, [theme])

  const toggle = () => setTheme((current) => (current === 'day' ? 'night' : 'day'))

  return (
    <button
      type="button"
      className="theme-toggle"
      data-cursor="hover"
      onClick={toggle}
      aria-pressed={theme === 'night'}
      aria-label={
        theme === 'day' ? 'Switch to night theme' : 'Switch to day theme'
      }
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'day' ? '☀' : '☾'}
      </span>
    </button>
  )
}

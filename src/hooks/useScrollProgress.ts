import { useEffect } from 'react'
import { useUIStore } from '../stores/uiStore'

type ActiveSection =
  | 'hero'
  | 'education'
  | 'skills'
  | 'projects'
  | 'research'
  | 'achievements'
  | 'chat'
  | null

export function useScrollProgress() {
  const setScrollProgress = useUIStore(state => state.setScrollProgress)
  const setActiveSection = useUIStore(state => state.setActiveSection)
  const scrollProgress = useUIStore(state => state.scrollProgress)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0

      setScrollProgress(progress)

      const sections: ActiveSection[] = [
        'hero',
        'education',
        'skills',
        'projects',
        'research',
        'achievements',
        'chat'
      ]

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress, setActiveSection])

  return scrollProgress
}
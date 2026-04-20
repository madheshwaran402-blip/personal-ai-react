import { useEffect, useRef, useCallback } from 'react'

export function useFocusManagement() {
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const saveFocus = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement
  }, [])

  const restoreFocus = useCallback(() => {
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus()
    }
  }, [])

  const focusFirst = useCallback((containerSelector: string) => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const focusable = container.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.focus()
  }, [])

  const trapFocus = useCallback((containerSelector: string) => {
    const container = document.querySelector<HTMLElement>(containerSelector)
    if (!container) return () => {}

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstEl = focusableElements[0]
    const lastEl = focusableElements[focusableElements.length - 1]

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    firstEl?.focus()

    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { saveFocus, restoreFocus, focusFirst, trapFocus }
}
import React, { useEffect, ReactNode } from 'react'
import { useFocusManagement } from '../hooks/useFocusManagement'

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  id: string
}

function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  id
}: AccessibleModalProps) {
  const { saveFocus, restoreFocus, trapFocus } = useFocusManagement()

  useEffect(() => {
    if (isOpen) {
      saveFocus()
      const cleanup = trapFocus(`#${id}`)
      return () => {
        cleanup()
        restoreFocus()
      }
    }
  }, [isOpen, id, saveFocus, restoreFocus, trapFocus])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        id={id}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id={`${id}-title`}>{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={`Close ${title}`}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccessibleModal
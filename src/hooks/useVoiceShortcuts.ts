import { useEffect } from 'react'
import { useVoiceSettings } from './useVoiceSettings'

interface UseVoiceShortcutsProps {
  onStartListening: () => void
  onStopListening: () => void
  onCancelSpeaking: () => void
  isListening: boolean
  isSpeaking: boolean
}

export function useVoiceShortcuts({
  onStartListening,
  onStopListening,
  onCancelSpeaking,
  isListening,
  isSpeaking
}: UseVoiceShortcutsProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Cmd+M — toggle microphone
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault()
        if (isListening) {
          onStopListening()
        } else {
          onStartListening()
        }
      }

      // Escape — stop speaking or listening
      if (e.key === 'Escape') {
        if (isSpeaking) onCancelSpeaking()
        if (isListening) onStopListening()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isListening,
    isSpeaking,
    onStartListening,
    onStopListening,
    onCancelSpeaking
  ])
}
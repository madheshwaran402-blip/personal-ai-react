import { useState, useEffect, useCallback, useRef } from 'react'

interface SpeechSynthesisState {
  isSpeaking: boolean
  isPaused: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
}

interface UseSpeechSynthesisReturn extends SpeechSynthesisState {
  speak: (text: string) => void
  pause: () => void
  resume: () => void
  cancel: () => void
  setVoice: (voice: SpeechSynthesisVoice) => void
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [state, setState] = useState<SpeechSynthesisState>({
    isSpeaking: false,
    isPaused: false,
    isSupported: false,
    voices: [],
    selectedVoice: null
  })

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (!window.speechSynthesis) {
      return
    }

    setState(prev => ({ ...prev, isSupported: true }))

    function loadVoices() {
      const available = window.speechSynthesis.getVoices()
      if (available.length === 0) return

      const preferred = available.find(v =>
        v.lang.startsWith('en') && v.name.includes('Google')
      ) || available.find(v =>
        v.lang.startsWith('en')
      ) || available[0]

      setState(prev => ({
        ...prev,
        voices: available,
        selectedVoice: preferred || null
      }))
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const cleanText = text
      .replace(/[#*`]/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500)

    const utterance = new SpeechSynthesisUtterance(cleanText)

    if (state.selectedVoice) {
      utterance.voice = state.selectedVoice
    }

    utterance.rate = 0.95
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true, isPaused: false }))
    }

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }))
    }

    utterance.onerror = (event) => {
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event.error)
      }
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }))
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [state.selectedVoice])

  const pause = useCallback(() => {
    window.speechSynthesis?.pause()
    setState(prev => ({ ...prev, isPaused: true }))
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis?.resume()
    setState(prev => ({ ...prev, isPaused: false }))
  }, [])

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel()
    setState(prev => ({
      ...prev,
      isSpeaking: false,
      isPaused: false
    }))
  }, [])

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState(prev => ({ ...prev, selectedVoice: voice }))
  }, [])

  return {
    ...state,
    speak,
    pause,
    resume,
    cancel,
    setVoice
  }
}
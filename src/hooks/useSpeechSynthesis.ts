import { useState, useEffect, useCallback } from 'react'
import { useVoiceSettings } from './useVoiceSettings'

interface SpeechSynthesisState {
  isSpeaking: boolean
  isPaused: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

interface UseSpeechSynthesisReturn extends SpeechSynthesisState {
  speak: (text: string) => void
  pause: () => void
  resume: () => void
  cancel: () => void
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [state, setState] = useState<SpeechSynthesisState>({
    isSpeaking: false,
    isPaused: false,
    isSupported: false,
    voices: []
  })

  const { rate, pitch, volume, selectedVoiceName } = useVoiceSettings()

  useEffect(() => {
    if (!window.speechSynthesis) return

    setState(prev => ({ ...prev, isSupported: true }))

    function loadVoices() {
      const available = window.speechSynthesis.getVoices()
      if (available.length === 0) return
      setState(prev => ({ ...prev, voices: available }))
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

    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = voices.find(v => v.name === selectedVoiceName)
      || voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0]

    if (selectedVoice) utterance.voice = selectedVoice

    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true, isPaused: false }))
    }

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }))
    }

    utterance.onerror = (event) => {
      if (event.error !== 'interrupted') {
        console.error('Speech error:', event.error)
      }
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }))
    }

    window.speechSynthesis.speak(utterance)
  }, [rate, pitch, volume, selectedVoiceName])

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
    setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }))
  }, [])

  return { ...state, speak, pause, resume, cancel }
}
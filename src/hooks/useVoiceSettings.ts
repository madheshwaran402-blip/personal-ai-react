import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VoiceSettings {
  autoSpeak: boolean
  rate: number
  pitch: number
  volume: number
  selectedVoiceName: string
  setAutoSpeak: (value: boolean) => void
  setRate: (value: number) => void
  setPitch: (value: number) => void
  setVolume: (value: number) => void
  setSelectedVoiceName: (name: string) => void
  reset: () => void
}

const defaultSettings = {
  autoSpeak: false,
  rate: 0.95,
  pitch: 1.0,
  volume: 1.0,
  selectedVoiceName: ''
}

export const useVoiceSettings = create<VoiceSettings>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setAutoSpeak: (value: boolean) =>
        set({ autoSpeak: value }),

      setRate: (value: number) =>
        set({ rate: value }),

      setPitch: (value: number) =>
        set({ pitch: value }),

      setVolume: (value: number) =>
        set({ volume: value }),

      setSelectedVoiceName: (name: string) =>
        set({ selectedVoiceName: name }),

      reset: () => set(defaultSettings)
    }),
    {
      name: 'madheshwaran-voice-settings'
    }
  )
)
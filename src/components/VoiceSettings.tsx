import React, { useState, useEffect } from 'react'
import { useVoiceSettings } from '../hooks/useVoiceSettings'

function VoiceSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSupported, setIsSupported] = useState(false)

  const {
    autoSpeak,
    rate,
    pitch,
    volume,
    selectedVoiceName,
    setAutoSpeak,
    setRate,
    setPitch,
    setVolume,
    setSelectedVoiceName,
    reset
  } = useVoiceSettings()

  useEffect(() => {
    if (!window.speechSynthesis) return
    setIsSupported(true)

    function loadVoices() {
      const available = window.speechSynthesis.getVoices()
      const englishVoices = available.filter(v => v.lang.startsWith('en'))
      setVoices(englishVoices)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  if (!isSupported) return null

  return (
    <div className="voice-settings-wrapper">
      <button
        className={`voice-settings-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Voice settings"
        aria-expanded={isOpen}
        title="Voice settings"
        type="button"
      >
        ⚙️
      </button>

      {isOpen && (
        <div
          className="voice-settings-panel"
          role="dialog"
          aria-label="Voice settings panel"
        >
          <div className="voice-settings-header">
            <h3>Voice Settings</h3>
            <button
              className="voice-settings-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close voice settings"
              type="button"
            >
              ×
            </button>
          </div>

          <div className="voice-settings-body">

            <div className="voice-setting-row">
              <label className="voice-setting-label">
                Auto-speak responses
              </label>
              <button
                className={`toggle-btn ${autoSpeak ? 'on' : 'off'}`}
                onClick={() => setAutoSpeak(!autoSpeak)}
                aria-pressed={autoSpeak}
                aria-label={`Auto-speak is ${autoSpeak ? 'on' : 'off'}`}
                type="button"
              >
                {autoSpeak ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="voice-setting-row">
              <label className="voice-setting-label">
                Voice
              </label>
              <select
                className="voice-select"
                value={selectedVoiceName}
                onChange={e => setSelectedVoiceName(e.target.value)}
                aria-label="Select voice"
              >
                <option value="">Default</option>
                {voices.map((voice, i) => (
                  <option key={i} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="voice-setting-row">
              <label className="voice-setting-label">
                Speed: {rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={rate}
                onChange={e => setRate(parseFloat(e.target.value))}
                className="voice-slider"
                aria-label="Speaking rate"
              />
            </div>

            <div className="voice-setting-row">
              <label className="voice-setting-label">
                Pitch: {pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={pitch}
                onChange={e => setPitch(parseFloat(e.target.value))}
                className="voice-slider"
                aria-label="Voice pitch"
              />
            </div>

            <div className="voice-setting-row">
              <label className="voice-setting-label">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="voice-slider"
                aria-label="Voice volume"
              />
            </div>

            <button
              className="voice-reset-btn"
              onClick={reset}
              type="button"
              aria-label="Reset voice settings to default"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceSettings
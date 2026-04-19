import React, { useEffect } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface VoiceButtonProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

function VoiceButton({ onTranscript, disabled = false }: VoiceButtonProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition()

  useEffect(() => {
    if (transcript && !isListening) {
      onTranscript(transcript)
      resetTranscript()
    }
  }, [transcript, isListening, onTranscript, resetTranscript])

  if (!isSupported) return null

  return (
    <div className="voice-button-wrapper">
      <button
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        title={isListening ? 'Click to stop' : 'Click to speak'}
        type="button"
      >
        {isListening ? (
          <span className="voice-icon listening" aria-hidden="true">
            ⏹
          </span>
        ) : (
          <span className="voice-icon" aria-hidden="true">
            🎤
          </span>
        )}
      </button>

      {isListening && interimTranscript && (
        <div
          className="interim-transcript"
          role="status"
          aria-live="polite"
          aria-label="Speech being recognized"
        >
          {interimTranscript}
        </div>
      )}

      {error && (
        <div
          className="voice-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default VoiceButton
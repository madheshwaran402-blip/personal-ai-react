import React from 'react'

interface VoiceIndicatorProps {
  isListening: boolean
  isSpeaking: boolean
}

function VoiceIndicator({ isListening, isSpeaking }: VoiceIndicatorProps) {
  if (!isListening && !isSpeaking) return null

  return (
    <div
      className={`voice-indicator ${isListening ? 'listening' : 'speaking'}`}
      role="status"
      aria-live="polite"
      aria-label={isListening ? 'Listening to microphone' : 'Speaking response'}
    >
      <div className="voice-indicator-waves">
        <span className="wave" aria-hidden="true" />
        <span className="wave" aria-hidden="true" />
        <span className="wave" aria-hidden="true" />
      </div>
      <span className="voice-indicator-text">
        {isListening ? 'Listening...' : 'Speaking...'}
      </span>
    </div>
  )
}

export default VoiceIndicator
import React from 'react'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'

interface SpeakerButtonProps {
  text: string
  messageId: number
}

function SpeakerButton({ text, messageId }: SpeakerButtonProps) {
  const { isSpeaking, isSupported, speak, cancel } = useSpeechSynthesis()

  if (!isSupported) return null

  const handleClick = () => {
    if (isSpeaking) {
      cancel()
    } else {
      speak(text)
    }
  }

  return (
    <button
      className={`speaker-btn ${isSpeaking ? 'speaking' : ''}`}
      onClick={handleClick}
      aria-label={isSpeaking ? 'Stop speaking' : 'Read message aloud'}
      title={isSpeaking ? 'Stop' : 'Listen'}
      type="button"
    >
      <span aria-hidden="true">
        {isSpeaking ? '⏹' : '🔊'}
      </span>
    </button>
  )
}

export default SpeakerButton
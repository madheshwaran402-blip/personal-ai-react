import React, { memo, useState } from 'react'
import SpeakerButton from './SpeakerButton'

interface MessageProps {
  text: string
  sender: "user" | "bot"
  time: string
  streaming?: boolean
  failed?: boolean
  onCopy?: (text: string) => void
}

const Message = memo(function Message({
  text,
  sender,
  time,
  streaming,
  failed,
  onCopy
}: MessageProps) {
  const [showActions, setShowActions] = useState(false)
  const isBot = sender === "bot"
  const messageId = Math.random()

  return (
    <div
      className={`message ${sender} ${failed ? 'failed' : ''}`}
      role="article"
      aria-label={`${isBot ? "AI assistant" : "You"} at ${time}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <span className="message-text">
        {text}
        {streaming && (
          <span
            className="stream-cursor"
            aria-hidden="true"
          >
            ▊
          </span>
        )}
      </span>

      <div className="message-footer">
        {!streaming && (
          <span
            className="message-time"
            aria-label={`Sent at ${time}`}
          >
            {time}
          </span>
        )}

        {showActions && !streaming && (
          <div className="message-actions">
            {isBot && (
              <SpeakerButton text={text} messageId={messageId} />
            )}
            {onCopy && (
              <button
                className="copy-btn"
                onClick={() => onCopy(text)}
                aria-label="Copy message"
                type="button"
              >
                ⧉
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default Message
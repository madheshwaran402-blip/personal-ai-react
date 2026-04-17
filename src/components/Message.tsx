import React, { memo, useState } from 'react'

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
  const [showCopy, setShowCopy] = useState(false)
  const isBot = sender === "bot"

  return (
    <div
      className={`message ${sender} ${failed ? 'failed' : ''}`}
      role="article"
      aria-label={`${isBot ? "AI assistant" : "You"} at ${time}`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <span className="message-text">
        {text}
        {streaming && (
          <span className="stream-cursor" aria-hidden="true">▊</span>
        )}
      </span>
      <div className="message-footer">
        {!streaming && (
          <span className="message-time" aria-label={`Sent at ${time}`}>
            {time}
          </span>
        )}
        {showCopy && !streaming && onCopy && (
          <button
            className="copy-btn"
            onClick={() => onCopy(text)}
            aria-label="Copy message to clipboard"
            title="Copy message"
          >
            ⧉
          </button>
        )}
      </div>
    </div>
  )
})

export default Message
import React, { memo } from 'react'

interface MessageProps {
  text: string
  sender: "user" | "bot"
  time: string
  streaming?: boolean
  failed?: boolean
}

const Message = memo(function Message({
  text,
  sender,
  time,
  streaming,
  failed
}: MessageProps) {
  const isBot = sender === "bot"

  return (
    <div
      className={`message ${sender} ${failed ? 'failed' : ''}`}
      role="article"
      aria-label={`${isBot ? "AI assistant" : "You"} at ${time}`}
    >
      <span className="message-text">
        {text}
        {streaming && (
          <span
            className="stream-cursor"
            aria-hidden="true"
            aria-label="AI is typing"
          >
            ▊
          </span>
        )}
      </span>
      {!streaming && (
        <span
          className="message-time"
          aria-label={`Sent at ${time}`}
        >
          {time}
        </span>
      )}
    </div>
  )
})

export default Message
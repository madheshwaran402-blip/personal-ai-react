import React, { memo } from 'react'

interface MessageProps {
  text: string
  sender: "user" | "bot"
  time: string
  streaming?: boolean
  failed?: boolean
}

// memo() — only re-renders if props actually changed
const Message = memo(function Message({
  text,
  sender,
  time,
  streaming,
  failed
}: MessageProps) {
  return (
    <div className={`message ${sender} ${failed ? 'failed' : ''}`}>
      <span className="message-text">
        {text}
        {streaming && <span className="stream-cursor">▊</span>}
      </span>
      {!streaming && <span className="message-time">{time}</span>}
    </div>
  )
})

export default Message
import React from 'react'

function Message({ text, sender, time, streaming }) {
  return (
    <div className={`message ${sender}`}>
      <span className="message-text">
        {text}
        {/* Blinking cursor while streaming */}
        {streaming && <span className="stream-cursor">▊</span>}
      </span>
      {!streaming && <span className="message-time">{time}</span>}
    </div>
  )
}

export default Message
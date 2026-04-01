import React from 'react'

function Message({ text, sender, time }) {
  return (
    <div className={`message ${sender}`}>
      <span className="message-text">{text}</span>
      <span className="message-time">{time}</span>
    </div>
  )
}

export default Message
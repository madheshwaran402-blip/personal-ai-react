import React, { memo } from 'react'

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div
      className="typing-indicator"
      role="status"
      aria-label="AI is typing a response"
      aria-live="polite"
    >
      <span className="typing-dot" aria-hidden="true" />
      <span className="typing-dot" aria-hidden="true" />
      <span className="typing-dot" aria-hidden="true" />
      <span className="sr-only">AI is thinking...</span>
    </div>
  )
})

export default TypingIndicator
import { useState } from 'react'

const MAX_CHARS = 500

function ChatInput({ onSend, disabled }) {
  const [inputText, setInputText] = useState("")

  function handleSend() {
    if (inputText.trim() === "" || disabled) return
    onSend(inputText.trim())
    setInputText("")
  }

  const remaining = MAX_CHARS - inputText.length
  const isNearLimit = remaining < 50
  const isOverLimit = remaining < 0

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-row">
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setInputText(e.target.value)
            }
          }}
          onKeyPress={(e) => e.key === "Enter" && !isOverLimit && handleSend()}
          placeholder="Ask me anything about Madheshwaran..."
          disabled={disabled}
          maxLength={MAX_CHARS}
        />
        <button
          onClick={handleSend}
          disabled={disabled || isOverLimit || inputText.trim() === ""}
        >
          {disabled ? "..." : "Send ↑"}
        </button>
      </div>
      {/* Character counter — only shows near limit */}
      {isNearLimit && (
        <div className={`char-counter ${isOverLimit ? 'over' : ''}`}>
          {remaining} characters remaining
        </div>
      )}
    </div>
  )
}

export default ChatInput
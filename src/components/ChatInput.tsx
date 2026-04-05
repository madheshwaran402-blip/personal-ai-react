import { useState } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

const MAX_CHARS = 500

function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [inputText, setInputText] = useState<string>("")

  function handleSend(): void {
    if (inputText.trim() === "" || disabled) return
    onSend(inputText.trim())
    setInputText("")
  }

  const remaining: number = MAX_CHARS - inputText.length
  const isNearLimit: boolean = remaining < 50
  const isOverLimit: boolean = remaining < 0

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-row">
        <input
          type="text"
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length <= MAX_CHARS) {
              setInputText(e.target.value)
            }
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !isOverLimit) handleSend()
          }}
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
      {isNearLimit && (
        <div className={`char-counter ${isOverLimit ? 'over' : ''}`}>
          {remaining} characters remaining
        </div>
      )}
    </div>
  )
}

export default ChatInput
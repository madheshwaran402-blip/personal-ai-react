import { useState, useRef } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

const MAX_CHARS = 500

function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [inputText, setInputText] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSend(): void {
    if (inputText.trim() === "" || disabled) return
    onSend(inputText.trim())
    setInputText("")
    inputRef.current?.focus()
  }

  const remaining: number = MAX_CHARS - inputText.length
  const isNearLimit: boolean = remaining < 50
  const isOverLimit: boolean = remaining < 0

  return (
    <div
      className="chat-input-wrapper"
      role="form"
      aria-label="Send a message"
    >
      <div className="chat-input-row">
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <input
          id="chat-input"
          ref={inputRef}
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
          aria-label="Message input"
          aria-disabled={disabled}
          aria-describedby={isNearLimit ? "char-count" : undefined}
          autoComplete="off"
        />
        <button
          onClick={handleSend}
          disabled={disabled || isOverLimit || inputText.trim() === ""}
          aria-label={disabled ? "Sending message, please wait" : "Send message"}
          aria-busy={disabled}
        >
          {disabled ? "..." : "Send ↑"}
        </button>
      </div>
      {isNearLimit && (
        <div
          id="char-count"
          className={`char-counter ${isOverLimit ? 'over' : ''}`}
          aria-live="polite"
          role="status"
        >
          {remaining} characters remaining
        </div>
      )}
    </div>
  )
}

export default ChatInput
import { useState } from 'react'

function ChatInput({ onSend, disabled }) {
  const [inputText, setInputText] = useState("")

  function handleSend() {
    if (inputText.trim() === "") return
    onSend(inputText)
    setInputText("")
  }

  return (
    <div className="chat-input-row">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask me anything about Madheshwaran..."
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        Send ↑
      </button>
    </div>
  )
}

export default ChatInput
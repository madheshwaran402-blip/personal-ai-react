// ============================================
// CUSTOM HOOK — Chat History with localStorage
// ============================================
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'madheshwaran_chat_history'
const MAX_SAVED = 20

export function useChatHistory(initialMessage) {
  const [messages, setMessages] = useState(() => {
    // Load from localStorage on first render
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) return parsed
      }
    } catch {
      // If corrupted, start fresh
    }
    return [initialMessage]
  })

  // Save to localStorage whenever messages change
  useEffect(() => {
    try {
      const toSave = messages.slice(-MAX_SAVED)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // Storage full — skip saving
    }
  }, [messages])

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([initialMessage])
  }

  return { messages, setMessages, clearHistory }
}
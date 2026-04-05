import { useState, useEffect } from 'react'
import { Message } from '../data/types'

const STORAGE_KEY = 'madheshwaran_chat_history'
const MAX_SAVED = 20

export function useChatHistory(initialMessage: Message) {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: Message[] = JSON.parse(saved)
        if (parsed.length > 0) return parsed
      }
    } catch {
      // corrupted storage
    }
    return [initialMessage]
  })

  useEffect(() => {
    try {
      const toSave = messages.slice(-MAX_SAVED)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // storage full
    }
  }, [messages])

  function clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([initialMessage])
  }

  return { messages, setMessages, clearHistory }
}
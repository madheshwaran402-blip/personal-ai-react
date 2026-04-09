import { useState, useEffect } from 'react'
import { Message } from '../data/types'
import { getLocalStorage, setLocalStorage } from '../utils/helpers'

const STORAGE_KEY = 'madheshwaran_chat_history'
const MAX_SAVED = 20

export function useChatHistory(initialMessage: Message) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = getLocalStorage<Message[]>(STORAGE_KEY, [])
    return saved.length > 0 ? saved : [initialMessage]
  })

  useEffect(() => {
    const toSave = messages.slice(-MAX_SAVED)
    setLocalStorage(STORAGE_KEY, toSave)
  }, [messages])

  function clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([initialMessage])
  }

  return { messages, setMessages, clearHistory }
}
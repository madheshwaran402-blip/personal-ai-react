import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Message } from '../data/types'
import { exportChatAsText } from '../utils/exportChat'
import { useToast } from './useToast'

interface UseChatActionsProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  clearHistory: () => void
  setHistory: React.Dispatch<React.SetStateAction<any[]>>
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
}

export function useChatActions({
  messages,
  setMessages,
  clearHistory,
  setHistory,
  setUnreadCount
}: UseChatActionsProps) {
  const queryClient = useQueryClient()
  const { success, error, info } = useToast()
  const [previousMessages, setPreviousMessages] = useState<Message[]>([])

  // ===== OPTIMISTIC CLEAR =====
  const handleClear = useCallback(() => {
    // Save current messages for potential rollback
    setPreviousMessages([...messages])

    // Update UI immediately (optimistic)
    clearHistory()
    setHistory([])
    setUnreadCount(0)

    // Show feedback
    success('Chat cleared')
  }, [messages, clearHistory, setHistory, setUnreadCount, success])

  // ===== ROLLBACK CLEAR =====
  const handleUndoClear = useCallback(() => {
    if (previousMessages.length > 0) {
      setMessages(previousMessages)
      setPreviousMessages([])
      info('Chat restored')
    }
  }, [previousMessages, setMessages, info])

  // ===== EXPORT WITH FEEDBACK =====
  const handleExport = useCallback(() => {
    try {
      if (messages.length <= 1) {
        info('No messages to export yet')
        return
      }
      exportChatAsText(messages)
      success('Chat exported successfully')
    } catch (err) {
      error('Failed to export chat')
    }
  }, [messages, success, error, info])

  // ===== COPY MESSAGE =====
  const handleCopyMessage = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      success('Message copied to clipboard')
    } catch {
      error('Could not copy message')
    }
  }, [success, error])

  // ===== INVALIDATE ALL QUERIES =====
  const refreshAll = useCallback(() => {
    queryClient.invalidateQueries()
    info('Refreshing data...')
  }, [queryClient, info])

  return {
    handleClear,
    handleUndoClear,
    handleExport,
    handleCopyMessage,
    refreshAll,
    hasPreviousMessages: previousMessages.length > 0
  }
}
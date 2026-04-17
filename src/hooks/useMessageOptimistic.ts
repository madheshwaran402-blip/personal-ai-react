import { useCallback, useRef } from 'react'
import { Message, HistoryItem } from '../data/types'
import { useChatMutation } from './useChatQuery'
import { getErrorMessage } from '../utils/errorHandler'

interface UseMessageOptimisticProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  history: HistoryItem[]
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>
  recruiterMode: boolean
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
}

const getTime = (): string =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export function useMessageOptimistic({
  setMessages,
  history,
  setHistory,
  recruiterMode,
  setIsTyping,
  setIsStreaming,
  setUnreadCount
}: UseMessageOptimisticProps) {
  const { mutate: sendMessage, isPending } = useChatMutation()
  const fullAnswerRef = useRef<string>("")

  const handleSend = useCallback(async (userText: string) => {
    // ===== OPTIMISTIC USER MESSAGE =====
    const userMessage: Message = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: getTime(),
      streaming: false
    }

    // Add user message immediately — optimistic
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    const botId = Date.now() + 1
    const updatedHistory: HistoryItem[] = [
      ...history,
      { role: "user", content: userText }
    ]

    fullAnswerRef.current = ""

    // Small delay for typing indicator
    await new Promise(resolve => setTimeout(resolve, 300))

    // ===== OPTIMISTIC BOT MESSAGE =====
    const emptyBotMessage: Message = {
      id: botId,
      text: "",
      sender: "bot",
      time: getTime(),
      streaming: true
    }

    setIsTyping(false)
    setIsStreaming(true)

    // Add empty bot message immediately — optimistic
    setMessages(prev => [...prev, emptyBotMessage])

    sendMessage({
      message: userText,
      history,
      recruiterMode,

      // Word by word streaming update
      onWord: (word: string) => {
        fullAnswerRef.current += word
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botId
              ? { ...msg, text: fullAnswerRef.current, streaming: true }
              : msg
          )
        )
      },

      // Success — finalize message
      onDone: () => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botId
              ? { ...msg, streaming: false }
              : msg
          )
        )
        setIsStreaming(false)
        setUnreadCount(prev => prev + 1)

        // Save to history
        setHistory([
          ...updatedHistory,
          { role: "assistant", content: fullAnswerRef.current }
        ])
      },

      // Error — rollback bot message
      onError: (errorMsg?: string) => {
        const friendlyMessage = getErrorMessage(
          new Error(errorMsg || 'Unknown error')
        )

        // Rollback — replace empty bot message with error
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botId
              ? {
                  ...msg,
                  text: `⚠️ ${friendlyMessage}`,
                  streaming: false,
                  failed: true
                }
              : msg
          )
        )
        setIsStreaming(false)
        setIsTyping(false)
      }
    })
  }, [
    history,
    recruiterMode,
    sendMessage,
    setHistory,
    setIsStreaming,
    setIsTyping,
    setMessages,
    setUnreadCount
  ])

  return { handleSend, isPending }
}
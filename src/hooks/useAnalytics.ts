import { useEffect, useCallback } from 'react'
import { useAnalyticsStore } from '../stores/analyticsStore'
import { useChatStore } from '../stores/chatStore'

export function useAnalytics() {
  const { trackEvent, trackMessage, incrementSession } = useAnalyticsStore()
  const totalMessages = useAnalyticsStore(state => state.totalMessages)
  const mostAskedTopics = useAnalyticsStore(state => state.mostAskedTopics)

  // Track session on mount
  useEffect(() => {
    incrementSession()
    trackEvent('session_start', {
      timestamp: Date.now(),
      userAgent: navigator.userAgent.slice(0, 50)
    })
  }, [])

  // Subscribe to chat store messages
  // Track when new user messages are added
  useEffect(() => {
    const unsub = useChatStore.subscribe(
      state => state.messages,
      (messages, prevMessages) => {
        if (messages.length > prevMessages.length) {
          const newMsg = messages[messages.length - 1]
          if (newMsg.sender === 'user') {
            trackMessage(newMsg.text)
          }
        }
      }
    )
    return unsub
  }, [trackMessage])

  const trackPageView = useCallback((page: string) => {
    trackEvent('page_view', { page })
  }, [trackEvent])

  const trackButtonClick = useCallback((button: string) => {
    trackEvent('button_click', { button })
  }, [trackEvent])

  return {
    totalMessages,
    mostAskedTopics,
    trackPageView,
    trackButtonClick
  }
}
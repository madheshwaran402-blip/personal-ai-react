import { useMutation } from '@tanstack/react-query'
import { sendMessageStreaming } from '../services/api'
import { HistoryItem } from '../data/types'

interface SendMessageParams {
  message: string
  history: HistoryItem[]
  recruiterMode: boolean
  onWord: (word: string) => void
  onDone: () => void
  onError: (error: string) => void
}

export function useChatMutation() {
  return useMutation({
    mutationFn: async (params: SendMessageParams) => {
      await sendMessageStreaming(
        params.message,
        params.history,
        params.recruiterMode,
        params.onWord,
        params.onDone,
        params.onError
      )
    },
    retry: 1,
    retryDelay: 1000
  })
}
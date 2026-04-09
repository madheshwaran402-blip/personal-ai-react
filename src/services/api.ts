import { HistoryItem, HealthResponse } from '../data/types'

const BACKEND_URL: string =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"

const MAX_RETRIES: number = 2
const RETRY_DELAY: number = 1500

async function withRetry<T>(fn: () => Promise<T>, retries: number = MAX_RETRIES): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries) throw error
      await new Promise(r => setTimeout(r, RETRY_DELAY))
    }
  }
  throw new Error("Max retries exceeded")
}

export async function sendMessageStreaming(
  message: string,
  history: HistoryItem[] = [],
  recruiterMode: boolean = false,
  onWord: (word: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    const response = await fetch(`${BACKEND_URL}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, recruiterMode })
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("No reader available")

    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.error) { onError(data.error); return }
            if (data.word) onWord(data.word)
            if (data.done) { onDone(); return }
          } catch {
            // Skip malformed chunks
          }
        }
      }
    }
    onDone()

  } catch (error) {
    onError(error instanceof Error ? error.message : "Unknown error")
  }
}

export async function sendMessageToAI(
  message: string,
  history: HistoryItem[] = [],
  recruiterMode: boolean = false
): Promise<string> {
  return withRetry(async () => {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, recruiterMode })
    })
    if (!response.ok) throw new Error(`Backend error: ${response.status}`)
    const data = await response.json()
    return data.answer as string
  })
}

export async function checkHealth(): Promise<HealthResponse> {
  return withRetry(async () => {
    const response = await fetch(`${BACKEND_URL}/health`, {
      signal: AbortSignal.timeout(5000)
    })
    return await response.json() as HealthResponse
  }, 1)
}
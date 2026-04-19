import { HistoryItem, HealthResponse } from '../data/types'

const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000"

function getSessionId(): string {
  let sessionId = localStorage.getItem('chat_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
    localStorage.setItem('chat_session_id', sessionId)
  }
  return sessionId
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
      body: JSON.stringify({
        message,
        history,
        recruiterMode,
        sessionId: getSessionId()
      })
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

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${BACKEND_URL}/health`, {
    signal: AbortSignal.timeout(5000)
  })
  return await response.json() as HealthResponse
}
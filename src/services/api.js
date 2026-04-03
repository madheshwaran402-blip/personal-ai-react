const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"
const MAX_RETRIES = 2
const RETRY_DELAY = 1500

// ============================================
// RETRY HELPER
// ============================================
async function withRetry(fn, retries = MAX_RETRIES) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries) throw error
      console.log(`Retry ${i + 1}/${retries}...`)
      await new Promise(r => setTimeout(r, RETRY_DELAY))
    }
  }
}

// ============================================
// STREAMING
// ============================================
export async function sendMessageStreaming(
  message,
  history = [],
  recruiterMode = false,
  onWord,
  onDone,
  onError
) {
  try {
    const response = await fetch(`${BACKEND_URL}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, recruiterMode })
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const reader = response.body.getReader()
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

            if (data.error) {
              onError(data.error)
              return
            }
            if (data.word) onWord(data.word)
            if (data.done) {
              onDone()
              return
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }
    }
    onDone()

  } catch (error) {
    onError(error.message)
  }
}

// ============================================
// REGULAR WITH RETRY
// ============================================
export async function sendMessageToAI(
  message,
  history = [],
  recruiterMode = false
) {
  return withRetry(async () => {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, recruiterMode })
    })
    if (!response.ok) throw new Error(`Backend error: ${response.status}`)
    const data = await response.json()
    return data.answer
  })
}

// ============================================
// HEALTH CHECK WITH RETRY
// ============================================
export async function checkHealth() {
  return withRetry(async () => {
    const response = await fetch(`${BACKEND_URL}/health`, {
      signal: AbortSignal.timeout(5000)
    })
    return await response.json()
  }, 1)
}
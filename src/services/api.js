const BACKEND_URL = "http://127.0.0.1:5000"

// ============================================
// STREAMING — word by word
// ============================================
export async function sendMessageStreaming(
  message,
  history = [],
  recruiterMode = false,
  onWord,      // callback: called with each new word
  onDone       // callback: called when finished
) {
  const response = await fetch(`${BACKEND_URL}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, recruiterMode })
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`)
  }

  // Read the stream
  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    // Decode incoming chunk
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6))

          if (data.word) {
            onWord(data.word)   // send word to UI
          }

          if (data.done) {
            onDone()            // tell UI we're finished
            return
          }
        } catch {
          // Skip malformed chunks
        }
      }
    }
  }

  onDone()
}

// ============================================
// REGULAR (fallback if streaming fails)
// ============================================
export async function sendMessageToAI(
  message,
  history = [],
  recruiterMode = false
) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, recruiterMode })
  })

  if (!response.ok) throw new Error(`Backend error: ${response.status}`)
  const data = await response.json()
  return data.answer
}

// ============================================
// HEALTH CHECK
// ============================================
export async function checkHealth() {
  const response = await fetch(`${BACKEND_URL}/health`)
  return await response.json()
}
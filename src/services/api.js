const BACKEND_URL = "http://127.0.0.1:5000"

// Send message with full conversation history
export async function sendMessageToAI(message, history = [], recruiterMode = false) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history,      // conversation memory
      recruiterMode // professional mode
    })
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`)
  }

  const data = await response.json()
  return data.answer
}

export async function checkHealth() {
  const response = await fetch(`${BACKEND_URL}/health`)
  return await response.json()
}
// ============================================
// API SERVICE — talks to your Flask backend
// ============================================

const BACKEND_URL = "http://127.0.0.1:5000"

// Send message to Flask → Ollama → get AI answer
export async function sendMessageToAI(message) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`)
  }

  const data = await response.json()
  return data.answer
}

// Check if backend is running
export async function checkHealth() {
  const response = await fetch(`${BACKEND_URL}/health`)
  const data = await response.json()
  return data
}
// ============================================
// EXPORT CHAT — download as text file
// ============================================

export function exportChatAsText(messages) {
  const lines = [
    "=== Madheshwaran's Personal AI — Chat Export ===",
    `Exported: ${new Date().toLocaleString()}`,
    "================================================",
    ""
  ]

  messages.forEach(msg => {
    const sender = msg.sender === "user" ? "You" : "Madheshwaran's AI"
    const time = msg.time || ""
    lines.push(`[${time}] ${sender}:`)
    lines.push(msg.text)
    lines.push("")
  })

  lines.push("================================================")
  lines.push("Visit: github.com/madheshwaran402-blip")

  const content = lines.join("\n")
  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `madheshwaran-ai-chat-${Date.now()}.txt`
  link.click()

  URL.revokeObjectURL(url)
}
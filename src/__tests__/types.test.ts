import { Message, HistoryItem, Project, BackendStatus, SuggestionChip } from '../data/types'

describe('Type structures', () => {

  test('Message type has required fields', () => {
    const message: Message = {
      id: 1,
      text: "Hello",
      sender: "bot",
      time: "12:00"
    }
    expect(message.id).toBe(1)
    expect(message.text).toBe("Hello")
    expect(message.sender).toBe("bot")
    expect(message.time).toBe("12:00")
  })

  test('Message sender is user or bot', () => {
    const userMsg: Message = { id: 1, text: "Hi", sender: "user", time: "12:00" }
    const botMsg: Message = { id: 2, text: "Hello", sender: "bot", time: "12:00" }
    expect(["user", "bot"]).toContain(userMsg.sender)
    expect(["user", "bot"]).toContain(botMsg.sender)
  })

  test('Message optional fields work', () => {
    const msg: Message = {
      id: 1,
      text: "Test",
      sender: "bot",
      time: "12:00",
      streaming: true,
      failed: false
    }
    expect(msg.streaming).toBe(true)
    expect(msg.failed).toBe(false)
  })

  test('HistoryItem has correct roles', () => {
    const userItem: HistoryItem = { role: "user", content: "What is Determinex?" }
    const assistantItem: HistoryItem = { role: "assistant", content: "Determinex is..." }
    expect(["user", "assistant"]).toContain(userItem.role)
    expect(["user", "assistant"]).toContain(assistantItem.role)
  })

  test('Project has required fields', () => {
    const project: Project = {
      name: "Determinex",
      type: "Hardware",
      status: "TRL 1-3",
      description: "FPGA system",
      tech: ["FPGA", "Verilog"]
    }
    expect(project.name).toBe("Determinex")
    expect(project.tech).toHaveLength(2)
    expect(project.achievement).toBeUndefined()
  })

  test('SuggestionChip has label and question', () => {
    const chip: SuggestionChip = {
      label: "🔷 What is Determinex?",
      q: "What is Determinex?"
    }
    expect(chip.label).toContain("Determinex")
    expect(chip.q).toBe("What is Determinex?")
  })

  test('BackendStatus values are valid', () => {
    const validStatuses: BackendStatus[] = ["online", "offline", "checking"]
    validStatuses.forEach(status => {
      expect(["online", "offline", "checking"]).toContain(status)
    })
  })

  test('Project optional achievement field', () => {
    const withAchievement: Project = {
      name: "Determinex",
      type: "Hardware",
      status: "TRL 1-3",
      description: "FPGA system",
      tech: ["FPGA"],
      achievement: "Tamil Nadu Innovation Challenge"
    }
    expect(withAchievement.achievement).toBe("Tamil Nadu Innovation Challenge")
  })
})
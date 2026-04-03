import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import ChatInput from './ChatInput'
import { sendMessageToAI, checkHealth } from '../services/api'

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Madheshwaran's AI assistant powered by Llama 3.2. Ask me about his projects, skills, research, or goals!",
      sender: "bot",
      time: getTime()
    }
  ])

  // Conversation history for AI memory
  const [history, setHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [backendStatus, setBackendStatus] = useState("checking")
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Page title
  useEffect(() => {
    document.title = unreadCount > 0
      ? `(${unreadCount}) Madheshwaran | Personal AI`
      : "Madheshwaran | VLSI & Hardware"
  }, [unreadCount])

  // Check backend on load
  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await checkHealth()
        setBackendStatus(
          health.backend === "running" && health.ollama === "running"
            ? "online" : "offline"
        )
      } catch {
        setBackendStatus("offline")
      }
    }
    checkBackend()
  }, [])

  // Reset unread on focus
  useEffect(() => {
    const handleFocus = () => setUnreadCount(0)
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  async function handleSend(userText) {
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: getTime()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Update history with user message
    const updatedHistory = [
      ...history,
      { role: "user", content: userText }
    ]

    try {
      const answer = await sendMessageToAI(userText, history, recruiterMode)

      const botMessage = {
        id: Date.now() + 1,
        text: answer,
        sender: "bot",
        time: getTime()
      }
      setMessages(prev => [...prev, botMessage])
      setUnreadCount(prev => prev + 1)

      // Save full exchange to history
      setHistory([
        ...updatedHistory,
        { role: "assistant", content: answer }
      ])

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "⚠️ Could not reach the AI. Make sure Flask and Ollama are running.",
        sender: "bot",
        time: getTime()
      }])
      setBackendStatus("offline")
    }

    setIsTyping(false)
  }

  function handleClear() {
    setMessages([{
      id: 1,
      text: "👋 Chat cleared! Ask me anything about Madheshwaran.",
      sender: "bot",
      time: getTime()
    }])
    setHistory([])
    setUnreadCount(0)
  }

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-status">
          <span className={`status-dot ${backendStatus}`}></span>
          <span>
            {backendStatus === 'online' && `Llama 3.2 · ${recruiterMode ? '👔 Recruiter Mode' : 'Online'}`}
            {backendStatus === 'offline' && "AI Offline"}
            {backendStatus === 'checking' && "Connecting..."}
          </span>
        </div>
        <div className="chat-header-actions">
          {/* Recruiter Mode Toggle */}
          <button
            className={`recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={() => setRecruiterMode(!recruiterMode)}
            title="Toggle recruiter mode"
          >
            👔 {recruiterMode ? 'Recruiter ON' : 'Recruiter'}
          </button>
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
      </div>

      {/* Offline banner */}
      {backendStatus === 'offline' && (
        <div className="offline-banner">
          ⚠️ Backend offline. Run: <code>ollama serve</code> and <code>python app.py</code>
        </div>
      )}

      {/* Recruiter mode banner */}
      {recruiterMode && backendStatus === 'online' && (
        <div className="recruiter-banner">
          👔 Recruiter Mode ON — answers are more formal and highlight achievements
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <Suggestions onSelect={handleSend} />
      <ChatInput onSend={handleSend} disabled={isTyping || backendStatus === 'offline'} />
    </div>
  )
}

export default ChatWindow
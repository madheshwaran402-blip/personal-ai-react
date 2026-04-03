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
  const [isTyping, setIsTyping] = useState(false)
  const [backendStatus, setBackendStatus] = useState("checking")
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

  // Check backend health on load
  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await checkHealth()
        if (health.backend === "running" && health.ollama === "running") {
          setBackendStatus("online")
        } else {
          setBackendStatus("offline")
        }
      } catch (error) {
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
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: getTime()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Call real AI backend
      const answer = await sendMessageToAI(userText)

      const botMessage = {
        id: Date.now() + 1,
        text: answer,
        sender: "bot",
        time: getTime()
      }
      setMessages(prev => [...prev, botMessage])
      setUnreadCount(prev => prev + 1)

    } catch (error) {
      // Show error message if backend is down
      const errorMessage = {
        id: Date.now() + 1,
        text: "⚠️ Could not reach the AI backend. Make sure Flask and Ollama are running.",
        sender: "bot",
        time: getTime()
      }
      setMessages(prev => [...prev, errorMessage])
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
    setUnreadCount(0)
  }

  return (
    <div className="chat-container">

      {/* Header with live backend status */}
      <div className="chat-header">
        <div className="chat-status">
          <span className={`status-dot ${backendStatus === 'online' ? 'online' : backendStatus === 'offline' ? 'offline' : 'checking'}`}></span>
          <span>
            {backendStatus === 'online' && "Llama 3.2 · Online"}
            {backendStatus === 'offline' && "AI Offline — start Flask & Ollama"}
            {backendStatus === 'checking' && "Connecting to AI..."}
          </span>
        </div>
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>

      {/* Offline warning banner */}
      {backendStatus === 'offline' && (
        <div className="offline-banner">
          ⚠️ Backend offline. Run: <code>ollama serve</code> and <code>python app.py</code>
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
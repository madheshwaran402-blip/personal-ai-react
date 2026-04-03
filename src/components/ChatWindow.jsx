import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import ChatInput from './ChatInput'
import { sendMessageStreaming, checkHealth } from '../services/api'

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Madheshwaran's AI assistant powered by Llama 3.2. Ask me anything!",
      sender: "bot",
      time: getTime(),
      streaming: false
    }
  ])

  const [history, setHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
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

  // Check backend
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
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: getTime(),
      streaming: false
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Create empty bot message that will fill up
    const botId = Date.now() + 1
    const emptyBotMessage = {
      id: botId,
      text: "",
      sender: "bot",
      time: getTime(),
      streaming: true
    }

    const updatedHistory = [...history, { role: "user", content: userText }]
    let fullAnswer = ""

    try {
      // Show typing dots first
      await new Promise(resolve => setTimeout(resolve, 300))
      setIsTyping(false)
      setIsStreaming(true)

      // Add empty bot message
      setMessages(prev => [...prev, emptyBotMessage])

      // Stream words into it
      await sendMessageStreaming(
        userText,
        history,
        recruiterMode,

        // onWord — add each word to the message
        (word) => {
          fullAnswer += word
          setMessages(prev =>
            prev.map(msg =>
              msg.id === botId
                ? { ...msg, text: fullAnswer, streaming: true }
                : msg
            )
          )
        },

        // onDone — mark as complete
        () => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === botId
                ? { ...msg, streaming: false }
                : msg
            )
          )
          setIsStreaming(false)
          setUnreadCount(prev => prev + 1)
        }
      )

      // Save to history
      setHistory([
        ...updatedHistory,
        { role: "assistant", content: fullAnswer }
      ])

    } catch (error) {
      setIsTyping(false)
      setIsStreaming(false)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botId
            ? {
                ...msg,
                text: "⚠️ Could not reach the AI. Make sure Flask and Ollama are running.",
                streaming: false
              }
            : msg
        )
      )
      setBackendStatus("offline")
    }
  }

  function handleClear() {
    setMessages([{
      id: 1,
      text: "👋 Chat cleared! Ask me anything about Madheshwaran.",
      sender: "bot",
      time: getTime(),
      streaming: false
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
          <button
            className={`recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={() => setRecruiterMode(!recruiterMode)}
          >
            👔 {recruiterMode ? 'Recruiter ON' : 'Recruiter'}
          </button>
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
      </div>

      {/* Banners */}
      {backendStatus === 'offline' && (
        <div className="offline-banner">
          ⚠️ Backend offline. Run: <code>ollama serve</code> and <code>python app.py</code>
        </div>
      )}
      {recruiterMode && backendStatus === 'online' && (
        <div className="recruiter-banner">
          👔 Recruiter Mode ON — formal tone, highlights achievements
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <Message
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            time={msg.time}
            streaming={msg.streaming}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <Suggestions onSelect={handleSend} />
      <ChatInput
        onSend={handleSend}
        disabled={isTyping || isStreaming || backendStatus === 'offline'}
      />
    </div>
  )
}

export default ChatWindow
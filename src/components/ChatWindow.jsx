import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import ChatInput from './ChatInput'
import { sendMessageStreaming } from '../services/api'
import { useChatHistory } from '../hooks/useChatHistory'
import { useBackendStatus } from '../hooks/useBackendStatus'
import { exportChatAsText } from '../utils/exportChat'

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const INITIAL_MESSAGE = {
  id: 1,
  text: "👋 Hi! I'm Madheshwaran's AI assistant powered by Llama 3.2. Ask me about his projects, skills, research, or goals!",
  sender: "bot",
  time: getTime(),
  streaming: false
}

function ChatWindow() {
  const { messages, setMessages, clearHistory } = useChatHistory(INITIAL_MESSAGE)
  const { status: backendStatus, recheckNow } = useBackendStatus()

  const [history, setHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const messagesEndRef = useRef(null)
  const chatMessagesRef = useRef(null)

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

  // Reset unread on focus
  useEffect(() => {
    const handleFocus = () => setUnreadCount(0)
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handleClear()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault()
        exportChatAsText(messages)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault()
        setRecruiterMode(prev => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // ✅ FIXED — useCallback properly closed
  const handleSend = useCallback(async (userText) => {
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: getTime(),
      streaming: false
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

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

    await new Promise(resolve => setTimeout(resolve, 300))
    setIsTyping(false)
    setIsStreaming(true)
    setMessages(prev => [...prev, emptyBotMessage])

    await sendMessageStreaming(
      userText,
      history,
      recruiterMode,

      // onWord
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

      // onDone
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
        setHistory([
          ...updatedHistory,
          { role: "assistant", content: fullAnswer }
        ])
      },

      // onError
      (errorMsg) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botId
              ? {
                  ...msg,
                  text: `⚠️ ${errorMsg || "Could not reach AI. Make sure Flask and Ollama are running."}`,
                  streaming: false,
                  failed: true
                }
              : msg
          )
        )
        setIsStreaming(false)
        setIsTyping(false)
      }
    )
  }, [history, recruiterMode]) // ✅ dependency array in right place

  function handleClear() {
    clearHistory()
    setHistory([])
    setUnreadCount(0)
  }

  // Memoized stats
  const chatStats = useMemo(() => {
    const botMessages = messages.filter(msg => msg.sender === "bot")
    const userMessages = messages.filter(msg => msg.sender === "user")
    return {
      total: messages.length,
      botCount: botMessages.length,
      userCount: userMessages.length,
      isEmpty: messages.length <= 1
    }
  }, [messages])

  // Memoized suggestion handler
  const handleSuggestionSelect = useCallback((question) => {
    handleSend(question)
  }, [handleSend])

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-status">
          <span className={`status-dot ${backendStatus}`}></span>
          <span>
            {backendStatus === 'online' && `Llama 3.2 · ${recruiterMode ? '👔 Recruiter' : 'Online'}`}
            {backendStatus === 'offline' && (
              <span className="retry-link" onClick={recheckNow}>
                AI Offline — click to retry
              </span>
            )}
            {backendStatus === 'checking' && "Connecting..."}
          </span>
          {/* Chat stats powered by useMemo */}
          {!chatStats.isEmpty && (
            <span className="chat-count">
              {chatStats.userCount} asked · {chatStats.botCount} answered
            </span>
          )}
        </div>
        <div className="chat-header-actions">
          <button
            className={`recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={() => setRecruiterMode(!recruiterMode)}
            title="Toggle recruiter mode (Cmd+R)"
          >
            👔 {recruiterMode ? 'ON' : 'Recruiter'}
          </button>
          <button
            className="export-btn"
            onClick={() => exportChatAsText(messages)}
            title="Export chat (Cmd+E)"
          >
            ↓ Export
          </button>
          <button
            className="clear-btn"
            onClick={handleClear}
            title="Clear chat (Cmd+K)"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Banners */}
      {backendStatus === 'offline' && (
        <div className="offline-banner">
          ⚠️ Run: <code>ollama serve</code> then <code>python app.py</code>
        </div>
      )}
      {recruiterMode && backendStatus === 'online' && (
        <div className="recruiter-banner">
          👔 Recruiter Mode — formal tone, highlights achievements
        </div>
      )}

      {/* Messages */}
      <div
        className="chat-messages"
        ref={chatMessagesRef}
        onScroll={(e) => {
          const el = e.target
          const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
          setShowScrollBtn(!atBottom)
        }}
      >
        {messages.map(msg => (
          <Message
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            time={msg.time}
            streaming={msg.streaming}
            failed={msg.failed}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom */}
      {showScrollBtn && (
        <button
          className="scroll-bottom-btn"
          onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          ↓ New messages
        </button>
      )}

      <Suggestions onSelect={handleSuggestionSelect} />
      <ChatInput
        onSend={handleSend}
        disabled={isTyping || isStreaming || backendStatus === 'offline'}
      />

      {/* Keyboard shortcuts hint */}
      <div className="shortcuts-hint">
        <span>⌘K clear</span>
        <span>⌘E export</span>
        <span>⌘R recruiter</span>
      </div>
    </div>
  )
}

export default ChatWindow
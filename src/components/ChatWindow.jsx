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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    document.title = unreadCount > 0
      ? `(${unreadCount}) Madheshwaran | Personal AI`
      : "Madheshwaran | VLSI & Hardware"
  }, [unreadCount])

  useEffect(() => {
    const handleFocus = () => setUnreadCount(0)
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

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
  }, [history, recruiterMode])

  function handleClear() {
    clearHistory()
    setHistory([])
    setUnreadCount(0)
  }

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

  const handleSuggestionSelect = useCallback((question) => {
    handleSend(question)
  }, [handleSend])

  return (
    <div
      className="chat-container"
      role="region"
      aria-label="AI Chat assistant"
    >
      <div className="chat-header" role="toolbar" aria-label="Chat controls">
        <div className="chat-status" aria-live="polite" aria-atomic="true">
          <span
            className={`status-dot ${backendStatus}`}
            aria-hidden="true"
          ></span>
          <span>
            {backendStatus === 'online' && `Llama 3.2 · ${recruiterMode ? '👔 Recruiter' : 'Online'}`}
            {backendStatus === 'offline' && (
              <button
                className="retry-link"
                onClick={recheckNow}
                aria-label="AI is offline. Click to retry connection"
              >
                AI Offline — click to retry
              </button>
            )}
            {backendStatus === 'checking' && "Connecting..."}
          </span>
          {!chatStats.isEmpty && (
            <span
              className="chat-count"
              aria-label={`${chatStats.userCount} questions asked, ${chatStats.botCount} answered`}
            >
              {chatStats.userCount} asked · {chatStats.botCount} answered
            </span>
          )}
        </div>

        <div className="chat-header-actions">
          <button
            className={`recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={() => setRecruiterMode(!recruiterMode)}
            aria-pressed={recruiterMode}
            aria-label={recruiterMode ? 'Recruiter mode is on. Click to turn off' : 'Turn on recruiter mode'}
            title="Toggle recruiter mode (Cmd+R)"
          >
            👔 {recruiterMode ? 'ON' : 'Recruiter'}
          </button>
          <button
            className="export-btn"
            onClick={() => exportChatAsText(messages)}
            aria-label="Export chat as text file"
            title="Export chat (Cmd+E)"
          >
            ↓ Export
          </button>
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear all chat messages"
            title="Clear chat (Cmd+K)"
          >
            Clear
          </button>
        </div>
      </div>

      {backendStatus === 'offline' && (
        <div
          className="offline-banner"
          role="alert"
          aria-live="assertive"
        >
          ⚠️ Run: <code>ollama serve</code> then <code>python app.py</code>
        </div>
      )}

      {recruiterMode && backendStatus === 'online' && (
        <div
          className="recruiter-banner"
          role="status"
          aria-live="polite"
        >
          👔 Recruiter Mode — formal tone, highlights achievements
        </div>
      )}

      <div
        className="chat-messages"
        ref={chatMessagesRef}
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-relevant="additions"
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
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {showScrollBtn && (
        <button
          className="scroll-bottom-btn"
          onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to latest messages"
        >
          ↓ New messages
        </button>
      )}

      <Suggestions onSelect={handleSuggestionSelect} />
      <ChatInput
        onSend={handleSend}
        disabled={isTyping || isStreaming || backendStatus === 'offline'}
      />

      <div
        className="shortcuts-hint"
        aria-label="Keyboard shortcuts"
        role="note"
      >
        <span>⌘K clear</span>
        <span>⌘E export</span>
        <span>⌘R recruiter</span>
      </div>
    </div>
  )
}

export default ChatWindow
import { useEffect, useRef, useMemo, useCallback } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import ChatInput from './ChatInput'
import VoiceSettings from './VoiceSettings'
import { useChatStore } from '../stores/chatStore'
import { useBackendStatus } from '../hooks/useBackendStatus'
import { useChatActions } from '../hooks/useChatActions'
import { useMessageOptimistic } from '../hooks/useMessageOptimistic'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'
import { useVoiceSettings } from '../hooks/useVoiceSettings'

function ChatWindow() {
  const {
    messages,
    setMessages,
    history,
    setHistory,
    isTyping,
    setIsTyping,
    isStreaming,
    setIsStreaming,
    unreadCount,
    incrementUnread,
    resetUnread,
    showScrollBtn,
    setShowScrollBtn,
    recruiterMode,
    toggleRecruiterMode,
    clearChat
  } = useChatStore()

  const { status: backendStatus, recheckNow } = useBackendStatus()
  const { speak, cancel, isSpeaking } = useSpeechSynthesis()
  const { autoSpeak } = useVoiceSettings()

  const messagesEndRef = useRef(null)
  const chatMessagesRef = useRef(null)
  const prevMessageCountRef = useRef(messages.length)

  const {
    handleClear,
    handleUndoClear,
    handleExport,
    handleCopyMessage,
    hasPreviousMessages
  } = useChatActions({
    messages,
    setMessages,
    clearHistory: clearChat,
    setHistory,
    setUnreadCount: resetUnread
  })

  const { handleSend, isPending } = useMessageOptimistic({
    messages,
    setMessages,
    history,
    setHistory,
    recruiterMode,
    setIsTyping,
    setIsStreaming,
    setUnreadCount: incrementUnread
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    document.title = unreadCount > 0
      ? `(${unreadCount}) Madheshwaran | Personal AI`
      : "Madheshwaran | VLSI & Hardware"
  }, [unreadCount])

  useEffect(() => {
    window.addEventListener("focus", resetUnread)
    return () => window.removeEventListener("focus", resetUnread)
  }, [resetUnread])

  // Auto-speak new bot messages
  useEffect(() => {
    if (!autoSpeak) return
    if (messages.length <= prevMessageCountRef.current) {
      prevMessageCountRef.current = messages.length
      return
    }

    prevMessageCountRef.current = messages.length

    const lastMessage = messages[messages.length - 1]
    if (
      lastMessage &&
      lastMessage.sender === 'bot' &&
      !lastMessage.streaming &&
      lastMessage.text &&
      !lastMessage.failed
    ) {
      speak(lastMessage.text)
    }
  }, [messages, autoSpeak, speak])

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handleClear()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault()
        handleExport()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault()
        toggleRecruiterMode()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        handleUndoClear()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (isSpeaking) cancel()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClear, handleExport, handleUndoClear, toggleRecruiterMode, isSpeaking, cancel])

  const chatStats = useMemo(() => {
    const botMessages = messages.filter(msg => msg.sender === "bot")
    const userMessages = messages.filter(msg => msg.sender === "user")
    return {
      botCount: botMessages.length,
      userCount: userMessages.length,
      isEmpty: messages.length <= 1
    }
  }, [messages])

  const handleSuggestionSelect = useCallback((question) => {
    handleSend(question)
  }, [handleSend])

  const isDisabled = isTyping || isStreaming || isPending || backendStatus === 'offline'

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
                aria-label="AI offline. Click to retry"
              >
                AI Offline — click to retry
              </button>
            )}
            {backendStatus === 'checking' && "Connecting..."}
          </span>
          {!chatStats.isEmpty && (
            <span className="chat-count">
              {chatStats.userCount} asked · {chatStats.botCount} answered
            </span>
          )}
        </div>

        <div className="chat-header-actions">
          <VoiceSettings />
          <button
            className={`recruiter-btn ${recruiterMode ? 'active' : ''}`}
            onClick={toggleRecruiterMode}
            aria-pressed={recruiterMode}
            title="Toggle recruiter mode (Cmd+R)"
          >
            👔 {recruiterMode ? 'ON' : 'Recruiter'}
          </button>
          <button
            className="export-btn"
            onClick={handleExport}
            aria-label="Export chat"
            title="Export chat (Cmd+E)"
          >
            ↓ Export
          </button>
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear chat"
            title="Clear chat (Cmd+K)"
          >
            Clear
          </button>
          {hasPreviousMessages && (
            <button
              className="undo-btn"
              onClick={handleUndoClear}
              aria-label="Undo clear"
              title="Undo (Cmd+Z)"
            >
              ↩ Undo
            </button>
          )}
        </div>
      </div>

      {backendStatus === 'offline' && (
        <div className="offline-banner" role="alert" aria-live="assertive">
          ⚠️ Run: <code>ollama serve</code> then <code>python app.py</code>
        </div>
      )}

      {recruiterMode && backendStatus === 'online' && (
        <div className="recruiter-banner" role="status" aria-live="polite">
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
            onCopy={handleCopyMessage}
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
      <ChatInput onSend={handleSend} disabled={isDisabled} />

      <div className="shortcuts-hint" role="note">
        <span>⌘K clear</span>
        <span>⌘Z undo</span>
        <span>⌘E export</span>
        <span>⌘R recruiter</span>
        <span>⌘S stop voice</span>
      </div>
    </div>
  )
}

export default ChatWindow
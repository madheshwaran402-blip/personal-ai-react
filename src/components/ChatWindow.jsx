import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import ChatInput from './ChatInput'
import getAnswer from '../data/getAnswer'

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Madheshwaran's AI assistant. Ask me about his projects, skills, research, or goals!",
      sender: "bot",
      time: getTime()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
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

  // Reset unread on focus
  useEffect(() => {
    const handleFocus = () => setUnreadCount(0)
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  function handleSend(userText) {
    const userMessage = { id: Date.now(), text: userText, sender: "user", time: getTime() }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const answer = getAnswer(userText)
      const botMessage = { id: Date.now() + 1, text: answer, sender: "bot", time: getTime() }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setUnreadCount(prev => prev + 1)
    }, 1000)
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
      <div className="chat-header">
        <div className="chat-status">
          <span className="status-dot"></span>
          <span>Madheshwaran's AI · Online</span>
        </div>
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <Suggestions onSelect={handleSend} />
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}

export default ChatWindow
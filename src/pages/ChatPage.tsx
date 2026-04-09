import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'

function ChatPage() {
  useEffect(() => {
    document.title = "Chat | Madheshwaran's AI"
  }, [])

  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <Link to="/" className="back-link">
          ← Back to Portfolio
        </Link>
        <div className="chat-page-title">
          <span className="logo">M<span className="dot">.</span></span>
          <span className="chat-page-subtitle">Personal AI Assistant</span>
        </div>
        <div className="chat-page-info">
          Powered by Llama 3.2
        </div>
      </div>
      <div className="chat-page-body">
        <ChatWindow />
      </div>
    </div>
  )
}

export default ChatPage
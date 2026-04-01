import React from 'react'
import './App.css'

// COMPONENT 1 — A single chat message
function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <span className="message-text">{text}</span>
    </div>
  )
}

// COMPONENT 2 — The chat window
function ChatWindow() {
  return (
    <div className="chat-window">
      <Message text="👋 Hi! I'm Madheshwaran's AI assistant." sender="bot" />
      <Message text="Tell me about your projects" sender="user" />
      <Message text="I have 4 key projects: Determinex, Smart Shoe, Water Tank, and this Personal AI!" sender="bot" />
    </div>
  )
}

// COMPONENT 3 — Main App
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">Madheshwaran<span className="dot">.</span></span>
        <nav>
          <a href="#chat">Chat</a>
          <a href="#projects">Projects</a>
        </nav>
      </header>

      <main className="app-main">
        <section className="hero">
          <p className="greeting">Hello, I'm</p>
          <h1>Madheshwaran</h1>
          <p className="tagline">VLSI Design Student · Hardware Innovator</p>
        </section>

        <section className="chat-section" id="chat">
          <h2>Chat With Me</h2>
          <ChatWindow />
        </section>
      </main>
    </div>
  )
}

export default App
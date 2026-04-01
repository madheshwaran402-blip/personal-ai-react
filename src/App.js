import { useEffect } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import './App.css'

function App() {
  useEffect(() => {
    document.title = "Madheshwaran | VLSI & Hardware"
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="hero">
          <p className="greeting">Hello, I'm</p>
          <h1>Madheshwaran</h1>
          <p className="tagline">VLSI Design Student · Hardware Innovator · Neuromorphic Enthusiast</p>
        </section>

        <section className="chat-section" id="chat">
          <h2>Chat With Me</h2>
          <p className="chat-subtitle">Ask anything — skills, projects, research, goals.</p>
          <ChatWindow />
        </section>
      </main>
    </div>
  )
}

export default App
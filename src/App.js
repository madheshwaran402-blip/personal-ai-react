import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Research from './components/Research'
import Achievements from './components/Achievements'
import ChatWindow from './components/ChatWindow'

function App() {
  useEffect(() => {
    document.title = "Madheshwaran | VLSI & Hardware"
  }, [])

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Research />
        <Achievements />

        <section className="section" id="chat">
          <h2>Chat With Me</h2>
          <p className="chat-subtitle">
            Ask anything about Madheshwaran — skills, projects, research, goals.
          </p>
          <ChatWindow />
        </section>
      </main>

      <footer className="footer">
        <p>
          Built by Madheshwaran Maruthamuthu · Tamil Nadu, India ·{' '}
          <a href="mailto:madheshwaran402@gmail.com">madheshwaran402@gmail.com</a>
        </p>
        <p className="footer-sub">
          Powered by React · Claude API coming soon
        </p>
      </footer>
    </div>
  )
}

export default App
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Research from './components/Research'
import Achievements from './components/Achievements'
import ChatWindow from './components/ChatWindow'
import { lazy, Suspense } from 'react'

function SectionSkeleton() {
  return (
    <div className="skeleton-section">
      <div className="skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  )
}

function AppContent() {
  useEffect(() => {
    document.title = "Madheshwaran | VLSI & Hardware"
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Suspense fallback={<SectionSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Research />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Achievements />
        </Suspense>

        <section className="section" id="chat">
          <h2>Chat With Me</h2>
          <p className="chat-subtitle">
            Ask anything about Madheshwaran — skills, projects, research, goals.
          </p>
          <Suspense fallback={<SectionSkeleton />}>
            <ChatWindow />
          </Suspense>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built by Madheshwaran Maruthamuthu · Tamil Nadu, India ·{' '}
          <a href="mailto:madheshwaran402@gmail.com">
            madheshwaran402@gmail.com
          </a>
        </p>
        <p className="footer-sub">Powered by React · Llama 3.2</p>
      </footer>
    </div>
  )
}

// Wrap everything in AppProvider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
import { useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'

// Lazy load heavy components — only load when needed
const Hero = lazy(() => import('./components/Hero'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Research = lazy(() => import('./components/Research'))
const Achievements = lazy(() => import('./components/Achievements'))
const ChatWindow = lazy(() => import('./components/ChatWindow'))

// Loading skeleton shown while components load
function SectionSkeleton() {
  return (
    <div className="skeleton-section">
      <div className="skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  )
}

function App() {
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

export default App
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ProjectsPage from './pages/ProjectsPage'
import NotFoundPage from './pages/NotFoundPage'
import StatusPage from './pages/StatusPage'
import ChatWindow from './components/ChatWindow'
import ErrorBoundary from './components/ErrorBoundary'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'
import { useAnalytics } from './hooks/useAnalytics'

function AppLayout() {
  const { toasts, removeToast, error: showError } = useToast()
  const { trackPageView } = useAnalytics()
  const location = useLocation()

  useEffect(() => {
    document.title = "Madheshwaran | VLSI & Hardware"
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname, trackPageView])

  useEffect(() => {
    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      showError('Something went wrong. Please try again.')
      event.preventDefault()
    }
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    return () => window.removeEventListener(
      'unhandledrejection',
      handleUnhandledRejection
    )
  }, [showError])

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />
      <Toast toasts={toasts} onRemove={removeToast} />

      <Routes>
        <Route path="/" element={
          <>
            <main id="main-content">
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
              <div className="app-main" style={{ paddingTop: 0 }}>
                <section
                  className="section"
                  id="chat"
                  aria-label="Chat with AI assistant"
                >
                  <h2>Chat With Me</h2>
                  <p className="chat-subtitle">
                    Ask anything about Madheshwaran — skills, projects, research, goals.
                  </p>
                  <ErrorBoundary>
                    <ChatWindow />
                  </ErrorBoundary>
                </section>
              </div>
            </main>
            <footer className="footer" role="contentinfo">
              <p>
                Built by Madheshwaran Maruthamuthu · Tamil Nadu, India ·{' '}
                <a
                  href="mailto:madheshwaran402@gmail.com"
                  aria-label="Send email to madheshwaran402@gmail.com"
                >
                  madheshwaran402@gmail.com
                </a>
              </p>
              <p className="footer-sub">
                Powered by React · Llama 3.2 ·{' '}
                <Link to="/status" className="footer-link">
                  System Status
                </Link>
              </p>
            </footer>
          </>
        } />

        <Route path="/chat" element={
          <ErrorBoundary>
            <ChatPage />
          </ErrorBoundary>
        } />

        <Route path="/projects" element={
          <div className="app">
            <main id="main-content">
              <ErrorBoundary>
                <ProjectsPage />
              </ErrorBoundary>
            </main>
            <footer className="footer" role="contentinfo">
              <p>Built by Madheshwaran Maruthamuthu</p>
            </footer>
          </div>
        } />

        <Route path="/status" element={
          <ErrorBoundary>
            <StatusPage />
          </ErrorBoundary>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
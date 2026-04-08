import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ProjectsPage from './pages/ProjectsPage'
import NotFoundPage from './pages/NotFoundPage'
import ChatWindow from './components/ChatWindow'
import { pageTransition } from './utils/animations'

function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    document.title = "Madheshwaran | VLSI & Hardware"
  }, [])

  return (
    <div className="app">
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Home — full portfolio */}
          <Route path="/" element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HomePage />
              <div className="app-main" style={{ paddingTop: 0 }}>
                <section className="section" id="chat">
                  <h2>Chat With Me</h2>
                  <p className="chat-subtitle">
                    Ask anything about Madheshwaran — skills, projects, research, goals.
                  </p>
                  <ChatWindow />
                </section>
              </div>
              <footer className="footer">
                <p>
                  Built by Madheshwaran Maruthamuthu · Tamil Nadu, India ·{' '}
                  <a href="mailto:madheshwaran402@gmail.com">
                    madheshwaran402@gmail.com
                  </a>
                </p>
                <p className="footer-sub">Powered by React · Llama 3.2</p>
              </footer>
            </motion.div>
          } />

          {/* Dedicated chat page */}
          <Route path="/chat" element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ChatPage />
            </motion.div>
          } />

          {/* Projects page */}
          <Route path="/projects" element={
            <motion.div
              className="app"
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ProjectsPage />
              <footer className="footer">
                <p>Built by Madheshwaran Maruthamuthu</p>
              </footer>
            </motion.div>
          } />

          {/* 404 */}
          <Route path="*" element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <NotFoundPage />
            </motion.div>
          } />

        </Routes>
      </AnimatePresence>
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
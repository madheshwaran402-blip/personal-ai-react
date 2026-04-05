import { createContext, useContext, useState, useEffect } from 'react'

// ============================================
// CREATE CONTEXT
// ============================================
const AppContext = createContext(null)

// ============================================
// PROVIDER — wraps your whole app
// ============================================
export function AppProvider({ children }) {

  // Global recruiter mode
  const [recruiterMode, setRecruiterMode] = useState(false)

  // Global theme
  const [theme, setTheme] = useState('dark')

  // Visitor name from localStorage
  const [visitorName, setVisitorName] = useState('')

  // Sidebar/menu open state
  const [menuOpen, setMenuOpen] = useState(false)

  // Load visitor name on start
  useEffect(() => {
    try {
      const saved = localStorage.getItem('visitor')
      if (saved) {
        const visitor = JSON.parse(saved)
        setVisitorName(visitor.name || '')
      }
    } catch {
      // ignore
    }
  }, [])

  // Save recruiter mode preference
  useEffect(() => {
    localStorage.setItem('recruiterMode', JSON.stringify(recruiterMode))
  }, [recruiterMode])

  // Load recruiter mode preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recruiterMode')
      if (saved) setRecruiterMode(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  function toggleRecruiterMode() {
    setRecruiterMode(prev => !prev)
  }

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Everything available to all components
  const value = {
    recruiterMode,
    setRecruiterMode,
    toggleRecruiterMode,
    theme,
    toggleTheme,
    visitorName,
    setVisitorName,
    menuOpen,
    setMenuOpen
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// ============================================
// CUSTOM HOOK — easy access to context
// ============================================
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
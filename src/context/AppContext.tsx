import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Theme } from '../data/types'

interface AppContextType {
  recruiterMode: boolean
  setRecruiterMode: (value: boolean) => void
  toggleRecruiterMode: () => void
  theme: Theme
  toggleTheme: () => void
  visitorName: string
  setVisitorName: (name: string) => void
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}

interface AppProviderProps {
  children: ReactNode
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: AppProviderProps) {
  const [recruiterMode, setRecruiterMode] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const [visitorName, setVisitorName] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

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

  useEffect(() => {
    localStorage.setItem('recruiterMode', JSON.stringify(recruiterMode))
  }, [recruiterMode])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('recruiterMode')
      if (saved) setRecruiterMode(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  function toggleRecruiterMode(): void {
    setRecruiterMode(prev => !prev)
  }

  function toggleTheme(): void {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const value: AppContextType = {
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

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAppStore } from '../stores/appStore'
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

const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const store = useAppStore()

  // Load persisted values on mount
  useEffect(() => {
    try {
      const savedRecruiter = localStorage.getItem('recruiterMode')
      if (savedRecruiter) {
        store.setRecruiterMode(JSON.parse(savedRecruiter))
      }
      const savedVisitor = localStorage.getItem('visitor')
      if (savedVisitor) {
        const visitor = JSON.parse(savedVisitor)
        store.setVisitorName(visitor.name || '')
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist recruiter mode changes
  useEffect(() => {
    localStorage.setItem(
      'recruiterMode',
      JSON.stringify(store.recruiterMode)
    )
  }, [store.recruiterMode])

  const value: AppContextType = {
    recruiterMode: store.recruiterMode,
    setRecruiterMode: store.setRecruiterMode,
    toggleRecruiterMode: store.toggleRecruiterMode,
    theme: store.theme,
    toggleTheme: store.toggleTheme,
    visitorName: store.visitorName,
    setVisitorName: store.setVisitorName,
    menuOpen: store.menuOpen,
    setMenuOpen: store.setMenuOpen
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
import { createContext, useContext, ReactNode } from 'react'
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
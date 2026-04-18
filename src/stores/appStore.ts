import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { Theme } from '../data/types'

interface AppState {
  recruiterMode: boolean
  theme: Theme
  menuOpen: boolean
  visitorName: string
  toggleRecruiterMode: () => void
  setRecruiterMode: (value: boolean) => void
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setMenuOpen: (value: boolean) => void
  setVisitorName: (name: string) => void
  reset: () => void
}

const initialState = {
  recruiterMode: false,
  theme: 'dark' as Theme,
  menuOpen: false,
  visitorName: ''
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        ...initialState,

        toggleRecruiterMode: () =>
          set(
            state => ({ recruiterMode: !state.recruiterMode }),
            false,
            'toggleRecruiterMode'
          ),

        setRecruiterMode: (value: boolean) =>
          set({ recruiterMode: value }, false, 'setRecruiterMode'),

        toggleTheme: () =>
          set(
            state => ({
              theme: state.theme === 'dark' ? 'light' : 'dark'
            }),
            false,
            'toggleTheme'
          ),

        setTheme: (theme: Theme) =>
          set({ theme }, false, 'setTheme'),

        setMenuOpen: (value: boolean) =>
          set({ menuOpen: value }, false, 'setMenuOpen'),

        setVisitorName: (name: string) =>
          set({ visitorName: name }, false, 'setVisitorName'),

        reset: () =>
          set(initialState, false, 'reset')
      })),
      {
        name: 'madheshwaran-app-store',

        // Only persist these fields — not menuOpen
        partialize: (state) => ({
          recruiterMode: state.recruiterMode,
          theme: state.theme,
          visitorName: state.visitorName
        }),

        // Version for migration
        version: 1,

        // Migration function — handles old data format
        migrate: (persistedState: unknown, version: number) => {
          if (version === 0) {
            // Migrate from version 0 to 1
            return {
              ...(persistedState as AppState),
              theme: 'dark' as Theme
            }
          }
          return persistedState as AppState
        }
      }
    ),
    { name: 'AppStore' }
  )
)

export const selectRecruiterMode = (state: AppState) => state.recruiterMode
export const selectTheme = (state: AppState) => state.theme
export const selectVisitorName = (state: AppState) => state.visitorName
export const selectMenuOpen = (state: AppState) => state.menuOpen
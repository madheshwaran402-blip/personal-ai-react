import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

type ActiveSection =
  | 'hero'
  | 'education'
  | 'skills'
  | 'projects'
  | 'research'
  | 'achievements'
  | 'chat'
  | null

interface UIState {
  activeSection: ActiveSection
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  scrollProgress: number
  pageTitle: string

  setActiveSection: (section: ActiveSection) => void
  setMobileMenuOpen: (value: boolean) => void
  setSearchOpen: (value: boolean) => void
  setScrollProgress: (progress: number) => void
  setPageTitle: (title: string) => void
  reset: () => void
}

const initialState = {
  activeSection: null as ActiveSection,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  scrollProgress: 0,
  pageTitle: 'Madheshwaran | VLSI & Hardware'
}

export const useUIStore = create<UIState>()(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialState,

      setActiveSection: (section: ActiveSection) =>
        set({ activeSection: section }, false, 'setActiveSection'),

      setMobileMenuOpen: (value: boolean) =>
        set({ isMobileMenuOpen: value }, false, 'setMobileMenuOpen'),

      setSearchOpen: (value: boolean) =>
        set({ isSearchOpen: value }, false, 'setSearchOpen'),

      setScrollProgress: (progress: number) =>
        set({ scrollProgress: progress }, false, 'setScrollProgress'),

      setPageTitle: (title: string) =>
        set({ pageTitle: title }, false, 'setPageTitle'),

      reset: () => set(initialState, false, 'reset')
    })),
    { name: 'UIStore' }
  )
)

export const selectActiveSection = (state: UIState) =>
  state.activeSection

export const selectScrollProgress = (state: UIState) =>
  state.scrollProgress

export const selectPageTitle = (state: UIState) =>
  state.pageTitle
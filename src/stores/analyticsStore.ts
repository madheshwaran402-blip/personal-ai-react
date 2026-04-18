import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AnalyticsEvent {
  type: string
  data?: Record<string, unknown>
  timestamp: number
}

interface AnalyticsState {
  events: AnalyticsEvent[]
  sessionStart: number
  totalMessages: number
  totalSessions: number
  mostAskedTopics: Record<string, number>

  trackEvent: (type: string, data?: Record<string, unknown>) => void
  trackMessage: (text: string) => void
  incrementSession: () => void
  reset: () => void
}

const initialState = {
  events: [] as AnalyticsEvent[],
  sessionStart: Date.now(),
  totalMessages: 0,
  totalSessions: 0,
  mostAskedTopics: {} as Record<string, number>
}

const TOPICS = [
  'skills', 'projects', 'determinex',
  'research', 'goals', 'education',
  'contact', 'achievements', 'shoe',
  'water', 'neuromorphic', 'fpga'
]

function detectTopics(text: string): string[] {
  const lower = text.toLowerCase()
  return TOPICS.filter(topic => lower.includes(topic))
}

export const useAnalyticsStore = create<AnalyticsState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        trackEvent: (type: string, data?: Record<string, unknown>) =>
          set(
            state => ({
              events: [
                ...state.events.slice(-99),
                { type, data, timestamp: Date.now() }
              ]
            }),
            false,
            'trackEvent'
          ),

        trackMessage: (text: string) =>
          set(
            state => {
              const topics = detectTopics(text)
              const updatedTopics = { ...state.mostAskedTopics }
              topics.forEach(topic => {
                updatedTopics[topic] = (updatedTopics[topic] || 0) + 1
              })
              return {
                totalMessages: state.totalMessages + 1,
                mostAskedTopics: updatedTopics,
                events: [
                  ...state.events.slice(-99),
                  {
                    type: 'message_sent',
                    data: { topics },
                    timestamp: Date.now()
                  }
                ]
              }
            },
            false,
            'trackMessage'
          ),

        incrementSession: () =>
          set(
            state => ({
              totalSessions: state.totalSessions + 1,
              sessionStart: Date.now()
            }),
            false,
            'incrementSession'
          ),

        reset: () => set(initialState, false, 'reset')
      }),
      {
        name: 'madheshwaran-analytics',
        partialize: (state) => ({
          totalMessages: state.totalMessages,
          totalSessions: state.totalSessions,
          mostAskedTopics: state.mostAskedTopics
        })
      }
    ),
    { name: 'AnalyticsStore' }
  )
)

export const selectTotalMessages = (state: AnalyticsState) =>
  state.totalMessages

export const selectMostAskedTopics = (state: AnalyticsState) =>
  state.mostAskedTopics

export const selectTopInsights = (state: AnalyticsState) => {
  const sorted = Object.entries(state.mostAskedTopics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
  return sorted
}
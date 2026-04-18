import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { Message, HistoryItem } from '../data/types'

const getTime = (): string =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "👋 Hi! I'm Madheshwaran's AI assistant powered by Llama 3.2. Ask me about his projects, skills, research, or goals!",
  sender: "bot",
  time: getTime(),
  streaming: false
}

const MAX_PERSISTED_MESSAGES = 20

interface ChatState {
  messages: Message[]
  history: HistoryItem[]
  isTyping: boolean
  isStreaming: boolean
  unreadCount: number
  showScrollBtn: boolean
  recruiterMode: boolean
  addMessage: (message: Message) => void
  updateMessage: (id: number, updates: Partial<Message>) => void
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  addHistory: (item: HistoryItem) => void
  setHistory: (history: HistoryItem[]) => void
  setIsTyping: (value: boolean) => void
  setIsStreaming: (value: boolean) => void
  incrementUnread: () => void
  resetUnread: () => void
  setShowScrollBtn: (value: boolean) => void
  toggleRecruiterMode: () => void
  clearChat: () => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        messages: [INITIAL_MESSAGE],
        history: [],
        isTyping: false,
        isStreaming: false,
        unreadCount: 0,
        showScrollBtn: false,
        recruiterMode: false,

        addMessage: (message: Message) =>
          set(
            state => ({ messages: [...state.messages, message] }),
            false,
            'addMessage'
          ),

        updateMessage: (id: number, updates: Partial<Message>) =>
          set(
            state => ({
              messages: state.messages.map(msg =>
                msg.id === id ? { ...msg, ...updates } : msg
              )
            }),
            false,
            'updateMessage'
          ),

        setMessages: (messages) =>
          set(
            state => ({
              messages: typeof messages === 'function'
                ? messages(state.messages)
                : messages
            }),
            false,
            'setMessages'
          ),

        addHistory: (item: HistoryItem) =>
          set(
            state => ({ history: [...state.history, item] }),
            false,
            'addHistory'
          ),

        setHistory: (history: HistoryItem[]) =>
          set({ history }, false, 'setHistory'),

        setIsTyping: (value: boolean) =>
          set({ isTyping: value }, false, 'setIsTyping'),

        setIsStreaming: (value: boolean) =>
          set({ isStreaming: value }, false, 'setIsStreaming'),

        incrementUnread: () =>
          set(
            state => ({ unreadCount: state.unreadCount + 1 }),
            false,
            'incrementUnread'
          ),

        resetUnread: () =>
          set({ unreadCount: 0 }, false, 'resetUnread'),

        setShowScrollBtn: (value: boolean) =>
          set({ showScrollBtn: value }, false, 'setShowScrollBtn'),

        toggleRecruiterMode: () =>
          set(
            state => ({ recruiterMode: !state.recruiterMode }),
            false,
            'toggleRecruiterMode'
          ),

        clearChat: () =>
          set(
            {
              messages: [INITIAL_MESSAGE],
              history: [],
              unreadCount: 0
            },
            false,
            'clearChat'
          )
      })),
      {
        name: 'madheshwaran-chat-store',

        // Only persist messages and history
        // Never persist loading states
        partialize: (state) => ({
          messages: state.messages
            .slice(-MAX_PERSISTED_MESSAGES)
            .map(msg => ({
              ...msg,
              streaming: false
            })),
          recruiterMode: state.recruiterMode
        }),

        version: 1,

        migrate: (persistedState: unknown, version: number) => {
          if (version === 0) {
            return {
              ...(persistedState as ChatState),
              recruiterMode: false
            }
          }
          return persistedState as ChatState
        }
      }
    ),
    { name: 'ChatStore' }
  )
)

export const selectMessages = (state: ChatState) => state.messages
export const selectHistory = (state: ChatState) => state.history
export const selectIsTyping = (state: ChatState) => state.isTyping
export const selectIsStreaming = (state: ChatState) => state.isStreaming
export const selectUnreadCount = (state: ChatState) => state.unreadCount
export const selectRecruiterMode = (state: ChatState) => state.recruiterMode
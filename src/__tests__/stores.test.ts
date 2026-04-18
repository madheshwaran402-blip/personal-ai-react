import { useAppStore } from '../stores/appStore'
import { useChatStore } from '../stores/chatStore'

describe('AppStore', () => {
  beforeEach(() => {
    useAppStore.getState().reset()
  })

  test('initial state is correct', () => {
    const state = useAppStore.getState()
    expect(state.recruiterMode).toBe(false)
    expect(state.theme).toBe('dark')
    expect(state.visitorName).toBe('')
    expect(state.menuOpen).toBe(false)
  })

  test('toggleRecruiterMode works', () => {
    const { toggleRecruiterMode } = useAppStore.getState()
    toggleRecruiterMode()
    expect(useAppStore.getState().recruiterMode).toBe(true)
    toggleRecruiterMode()
    expect(useAppStore.getState().recruiterMode).toBe(false)
  })

  test('setRecruiterMode works', () => {
    const { setRecruiterMode } = useAppStore.getState()
    setRecruiterMode(true)
    expect(useAppStore.getState().recruiterMode).toBe(true)
  })

  test('toggleTheme works', () => {
    const { toggleTheme } = useAppStore.getState()
    toggleTheme()
    expect(useAppStore.getState().theme).toBe('light')
    toggleTheme()
    expect(useAppStore.getState().theme).toBe('dark')
  })

  test('setVisitorName works', () => {
    const { setVisitorName } = useAppStore.getState()
    setVisitorName('Recruiter')
    expect(useAppStore.getState().visitorName).toBe('Recruiter')
  })

  test('reset restores initial state', () => {
    const { setRecruiterMode, setVisitorName, reset } = useAppStore.getState()
    setRecruiterMode(true)
    setVisitorName('Test')
    reset()
    expect(useAppStore.getState().recruiterMode).toBe(false)
    expect(useAppStore.getState().visitorName).toBe('')
  })
})

describe('ChatStore', () => {
  beforeEach(() => {
    useChatStore.getState().clearChat()
  })

  test('initial message exists', () => {
    const { messages } = useChatStore.getState()
    expect(messages).toHaveLength(1)
    expect(messages[0].sender).toBe('bot')
  })

  test('addMessage works', () => {
    const { addMessage } = useChatStore.getState()
    addMessage({
      id: 999,
      text: 'Test message',
      sender: 'user',
      time: '12:00'
    })
    expect(useChatStore.getState().messages).toHaveLength(2)
    expect(useChatStore.getState().messages[1].text).toBe('Test message')
  })

  test('updateMessage works', () => {
    const { addMessage, updateMessage } = useChatStore.getState()
    addMessage({
      id: 888,
      text: 'Original',
      sender: 'bot',
      time: '12:00',
      streaming: true
    })
    updateMessage(888, { text: 'Updated', streaming: false })
    const updated = useChatStore.getState().messages.find(m => m.id === 888)
    expect(updated?.text).toBe('Updated')
    expect(updated?.streaming).toBe(false)
  })

  test('toggleRecruiterMode works', () => {
    const { toggleRecruiterMode } = useChatStore.getState()
    toggleRecruiterMode()
    expect(useChatStore.getState().recruiterMode).toBe(true)
  })

  test('clearChat resets messages', () => {
    const { addMessage, clearChat } = useChatStore.getState()
    addMessage({ id: 2, text: 'hi', sender: 'user', time: '12:00' })
    addMessage({ id: 3, text: 'hello', sender: 'bot', time: '12:00' })
    clearChat()
    expect(useChatStore.getState().messages).toHaveLength(1)
    expect(useChatStore.getState().history).toHaveLength(0)
  })

  test('incrementUnread works', () => {
    const { incrementUnread } = useChatStore.getState()
    incrementUnread()
    incrementUnread()
    expect(useChatStore.getState().unreadCount).toBe(2)
  })

  test('resetUnread works', () => {
    const { incrementUnread, resetUnread } = useChatStore.getState()
    incrementUnread()
    incrementUnread()
    resetUnread()
    expect(useChatStore.getState().unreadCount).toBe(0)
  })
})
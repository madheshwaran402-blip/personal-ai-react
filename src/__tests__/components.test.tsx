import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '../components/Hero'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Achievements from '../components/Achievements'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import Suggestions from '../components/Suggestions'

describe('Hero component', () => {
  test('renders name', () => {
    render(<Hero />)
    expect(screen.getByText('Madheshwaran')).toBeInTheDocument()
  })

  test('renders greeting', () => {
    render(<Hero />)
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument()
  })

  test('renders tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/VLSI Design Student/)).toBeInTheDocument()
  })

test('renders profile photo', () => {
  render(<Hero />)
  const img = screen.getByAltText(/Madheshwaran Maruthamuthu/)
  expect(img).toBeInTheDocument()
})

  test('renders chat button', () => {
    render(<Hero />)
    expect(screen.getByText('Chat with my AI ↗️')).toBeInTheDocument()
  })
})

describe('Education component', () => {
  test('renders degree', () => {
    render(<Education />)
    expect(screen.getByText(/VLSI Design & Technology/)).toBeInTheDocument()
  })

  test('renders year', () => {
    render(<Education />)
    expect(screen.getByText('2nd Year')).toBeInTheDocument()
  })

  test('renders currently learning section', () => {
    render(<Education />)
    expect(screen.getByText(/Currently Learning/i)).toBeInTheDocument()
  })

  test('renders Verilog', () => {
    render(<Education />)
    expect(screen.getByText(/Verilog/)).toBeInTheDocument()
  })
})

describe('Skills component', () => {
  test('renders skills heading', () => {
    render(<Skills />)
    expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument()
  })

  test('renders Verilog skill', () => {
    render(<Skills />)
    expect(screen.getByText('Verilog')).toBeInTheDocument()
  })

  test('renders Python skill', () => {
    render(<Skills />)
    expect(screen.getByText(/Python/)).toBeInTheDocument()
  })

  test('renders Git skill', () => {
    render(<Skills />)
    expect(screen.getByText('Git')).toBeInTheDocument()
  })
})

describe('Projects component', () => {
  test('renders Determinex', () => {
    render(<Projects />)
    expect(screen.getByText('Determinex')).toBeInTheDocument()
  })

  test('renders Smart Shoe', () => {
    render(<Projects />)
    expect(screen.getByText('Smart Shoe Prototype')).toBeInTheDocument()
  })

  test('renders Water Tank', () => {
    render(<Projects />)
    expect(screen.getByText('Smart Water Tank Automation')).toBeInTheDocument()
  })

  test('renders Personal AI', () => {
    render(<Projects />)
    expect(screen.getByText('Personal AI Assistant')).toBeInTheDocument()
  })

  test('renders Patented badge', () => {
    render(<Projects />)
    expect(screen.getByText('Patented')).toBeInTheDocument()
  })
})

describe('Research component', () => {
  test('renders Neuromorphic Computing', () => {
    render(<Research />)
    expect(screen.getByText('Neuromorphic Computing')).toBeInTheDocument()
  })

  test('renders Scopus goal', () => {
    render(<Research />)
    expect(screen.getByText(/Scopus/)).toBeInTheDocument()
  })
})

describe('Achievements component', () => {
  test('renders Ideathon win', () => {
    render(<Achievements />)
    expect(screen.getByText(/IDEATHON 1.0 Winner/)).toBeInTheDocument()
  })

  test('renders Safety Watch startup', () => {
    render(<Achievements />)
    expect(screen.getByText('Safety Watch Platform')).toBeInTheDocument()
  })
})

describe('Message component', () => {
  test('renders bot message', () => {
    render(<Message text="Hello from bot" sender="bot" time="12:00" />)
    expect(screen.getByText('Hello from bot')).toBeInTheDocument()
  })

  test('renders user message', () => {
    render(<Message text="Hello from user" sender="user" time="12:00" />)
    expect(screen.getByText('Hello from user')).toBeInTheDocument()
  })

  test('renders timestamp', () => {
    render(<Message text="Test" sender="bot" time="03:45 PM" />)
    expect(screen.getByText('03:45 PM')).toBeInTheDocument()
  })

  test('renders streaming cursor', () => {
    render(<Message text="Typing..." sender="bot" time="12:00" streaming={true} />)
    expect(screen.getByText('▊')).toBeInTheDocument()
  })

  test('applies bot class', () => {
    const { container } = render(<Message text="Bot" sender="bot" time="12:00" />)
    expect(container.firstChild).toHaveClass('bot')
  })

  test('applies user class', () => {
    const { container } = render(<Message text="User" sender="user" time="12:00" />)
    expect(container.firstChild).toHaveClass('user')
  })
})

describe('ChatInput component', () => {
  test('renders input field', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    expect(screen.getByPlaceholderText(/Ask me anything/)).toBeInTheDocument()
  })

  test('renders send button', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    expect(screen.getByText('Send ↑')).toBeInTheDocument()
  })

  test('calls onSend when button clicked', () => {
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} disabled={false} />)
    const input = screen.getByPlaceholderText(/Ask me anything/)
    fireEvent.change(input, { target: { value: 'What are your skills?' } })
    fireEvent.click(screen.getByText('Send ↑'))
    expect(mockSend).toHaveBeenCalledWith('What are your skills?')
  })

  test('clears input after send', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    const input = screen.getByPlaceholderText(/Ask me anything/) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test' } })
    fireEvent.click(screen.getByText('Send ↑'))
    expect(input.value).toBe('')
  })

  test('does not send empty message', () => {
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} disabled={false} />)
    fireEvent.click(screen.getByText('Send ↑'))
    expect(mockSend).not.toHaveBeenCalled()
  })

  test('disables input when disabled', () => {
    render(<ChatInput onSend={() => {}} disabled={true} />)
    expect(screen.getByPlaceholderText(/Ask me anything/)).toBeDisabled()
  })

  test('shows loading state', () => {
    render(<ChatInput onSend={() => {}} disabled={true} />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})

describe('Suggestions component', () => {
  test('renders Determinex chip', () => {
    render(<Suggestions onSelect={() => {}} />)
    expect(screen.getByText(/What is Determinex/)).toBeInTheDocument()
  })

  test('renders multiple chips', () => {
    render(<Suggestions onSelect={() => {}} />)
    const chips = screen.getAllByRole('button')
    expect(chips.length).toBeGreaterThan(3)
  })

  test('calls onSelect when chip clicked', () => {
    const mockSelect = jest.fn()
    render(<Suggestions onSelect={mockSelect} />)
    fireEvent.click(screen.getByText(/What is Determinex/))
    expect(mockSelect).toHaveBeenCalledWith('What is Determinex?')
  })
})
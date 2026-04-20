import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'
import Education from '../components/Education'
import Skills from '../components/Skills'
import ChatInput from '../components/ChatInput'

describe('Accessibility tests', () => {

  test('Hero has proper heading hierarchy', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Madheshwaran')
  })

  test('Hero section has aria-label', () => {
    render(<Hero />)
    const section = screen.getByRole('region', {
      name: /profile introduction/i
    })
    expect(section).toBeInTheDocument()
  })

  test('Hero links are accessible', () => {
    render(<Hero />)
    const githubLink = screen.getByRole('link', {
      name: /view github profile/i
    })
    expect(githubLink).toBeInTheDocument()
  })

  test('Hero email link is accessible', () => {
    render(<Hero />)
    const emailLink = screen.getByRole('link', {
      name: /send email/i
    })
    expect(emailLink).toBeInTheDocument()
  })

  test('Hero profile photo has descriptive alt text', () => {
    render(<Hero />)
    const img = screen.getByAltText(/Madheshwaran Maruthamuthu/)
    expect(img).toBeInTheDocument()
  })

  test('Education section has proper heading', () => {
    render(<Education />)
    const heading = screen.getByRole('heading', { name: /education/i })
    expect(heading).toBeInTheDocument()
  })

  test('Education currently learning is a list', () => {
    render(<Education />)
    const list = screen.getByRole('list', {
      name: /currently learning/i
    })
    expect(list).toBeInTheDocument()
  })

  test('Education has Verilog in learning list', () => {
    render(<Education />)
    expect(screen.getByText(/Verilog/)).toBeInTheDocument()
  })

  test('Skills section has proper heading', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', {
      name: /technical skills/i
    })
    expect(heading).toBeInTheDocument()
  })

  test('Skills has hardware section', () => {
    render(<Skills />)
    expect(screen.getByText(/Hardware & VLSI/i)).toBeInTheDocument()
  })

  test('ChatInput has label for input', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    const input = screen.getByLabelText(/type your message/i)
    expect(input).toBeInTheDocument()
  })

  test('ChatInput send button is accessible', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    const button = screen.getByRole('button', { name: /send message/i })
    expect(button).toBeInTheDocument()
  })

  test('ChatInput disabled state is accessible', () => {
    render(<ChatInput onSend={() => {}} disabled={true} />)
    const button = screen.getByRole('button', { name: /sending message/i })
    expect(button).toBeInTheDocument()
  })

  test('ChatInput placeholder text is helpful', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    const input = screen.getByPlaceholderText(/Ask me anything/i)
    expect(input).toBeInTheDocument()
  })

  test('ChatInput form has accessible role', () => {
    render(<ChatInput onSend={() => {}} disabled={false} />)
    const form = screen.getByRole('form', { name: /send a message/i })
    expect(form).toBeInTheDocument()
  })
})
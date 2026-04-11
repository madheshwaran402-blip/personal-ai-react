import getAnswer from '../data/getAnswer'

describe('getAnswer', () => {

  test('answers skills question', () => {
    const answer = getAnswer("What are your skills?")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers hardware question', () => {
    const answer = getAnswer("What hardware skills do you have?")
    expect(answer.toLowerCase()).toContain('verilog')
  })

  test('answers programming question', () => {
    const answer = getAnswer("What programming languages do you know?")
    expect(answer.toLowerCase()).toContain('python')
  })

  test('answers Determinex question', () => {
    const answer = getAnswer("What is Determinex?")
    expect(answer.toLowerCase()).toContain('determinex')
  })

  test('answers shoe question', () => {
    const answer = getAnswer("Tell me about the shoe")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers patent question', () => {
    const answer = getAnswer("Tell me about your patent")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers water tank question', () => {
    const answer = getAnswer("Tell me about water")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers tank question', () => {
    const answer = getAnswer("Tell me about the tank")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers all projects question', () => {
    const answer = getAnswer("What projects have you built?")
    expect(answer.toLowerCase()).toContain('determinex')
  })

  test('answers research question', () => {
    const answer = getAnswer("What are your research interests?")
    expect(answer.toLowerCase()).toContain('neuromorphic')
  })

  test('answers neuromorphic question', () => {
    const answer = getAnswer("Tell me about neuromorphic computing")
    expect(answer.toLowerCase()).toContain('neuromorphic')
  })

  test('answers goals question', () => {
    const answer = getAnswer("What are your career goals?")
    expect(answer.toLowerCase()).toContain('vlsi')
  })

  test('answers achievement question', () => {
    const answer = getAnswer("What are your achievements?")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

test('answers ideathon question', () => {
  const answer = getAnswer("ideathon win achievement")
  expect(answer.toLowerCase()).toContain('ideathon')
})

  test('answers contact question', () => {
    const answer = getAnswer("How can I contact you?")
    expect(answer.toLowerCase()).toContain('madheshwaran402@gmail.com')
  })

  test('answers education question', () => {
    const answer = getAnswer("Where did you study?")
    expect(answer.toLowerCase()).toContain('vlsi')
  })

  test('returns fallback for unknown questions', () => {
    const answer = getAnswer("What is the weather today?")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(5)
  })

  test('handles uppercase input', () => {
    const answer = getAnswer("WHAT ARE YOUR SKILLS")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers startup question', () => {
    const answer = getAnswer("Tell me about your startup")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })

  test('answers learning question', () => {
    const answer = getAnswer("What are you currently learning?")
    expect(typeof answer).toBe('string')
    expect(answer.length).toBeGreaterThan(10)
  })
})
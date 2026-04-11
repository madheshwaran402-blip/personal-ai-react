import {
  truncate,
  capitalize,
  formatDate,
  filterBy,
  findBy,
  sortBy,
  getLocalStorage,
  setLocalStorage,
  buildSkillsWithLevels,
  getSkillLevelColor
} from '../utils/helpers'

// ============================================
// TRUNCATE TESTS
// ============================================
describe('truncate', () => {
  test('shortens text longer than maxLength', () => {
    expect(truncate("Hello World", 5)).toBe("Hello...")
  })

  test('returns original text if shorter than maxLength', () => {
    expect(truncate("Hi", 10)).toBe("Hi")
  })

  test('returns original text if exactly maxLength', () => {
    expect(truncate("Hello", 5)).toBe("Hello")
  })

  test('handles empty string', () => {
    expect(truncate("", 5)).toBe("")
  })
})

// ============================================
// CAPITALIZE TESTS
// ============================================
describe('capitalize', () => {
  test('capitalizes first letter', () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  test('does not change already capitalized text', () => {
    expect(capitalize("Hello")).toBe("Hello")
  })

  test('handles single character', () => {
    expect(capitalize("a")).toBe("A")
  })

  test('handles empty string', () => {
    expect(capitalize("")).toBe("")
  })
})

// ============================================
// FILTER BY TESTS
// ============================================
describe('filterBy', () => {
  const numbers = [1, 2, 3, 4, 5, 6]

  test('filters items by predicate', () => {
    const evens = filterBy(numbers, n => n % 2 === 0)
    expect(evens).toEqual([2, 4, 6])
  })

  test('returns empty array if no match', () => {
    const result = filterBy(numbers, n => n > 10)
    expect(result).toEqual([])
  })

  test('returns all items if all match', () => {
    const result = filterBy(numbers, n => n > 0)
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('works with strings', () => {
    const skills = ["Verilog", "Python", "React", "FPGA"]
    const result = filterBy(skills, s => s.length > 5)
    expect(result).toEqual(["Verilog", "Python"])
  })
})

// ============================================
// FIND BY TESTS
// ============================================
describe('findBy', () => {
  const items = [
    { id: 1, name: "Determinex" },
    { id: 2, name: "Smart Shoe" },
    { id: 3, name: "Water Tank" }
  ]

  test('finds item by predicate', () => {
    const result = findBy(items, item => item.id === 2)
    expect(result).toEqual({ id: 2, name: "Smart Shoe" })
  })

  test('returns undefined if not found', () => {
    const result = findBy(items, item => item.id === 99)
    expect(result).toBeUndefined()
  })
})

// ============================================
// SORT BY TESTS
// ============================================
describe('sortBy', () => {
  const items = [
    { name: "Verilog", level: 3 },
    { name: "Python", level: 1 },
    { name: "React", level: 2 }
  ]

  test('sorts ascending by default', () => {
    const sorted = sortBy(items, 'level')
    expect(sorted[0].level).toBe(1)
    expect(sorted[2].level).toBe(3)
  })

  test('sorts descending when specified', () => {
    const sorted = sortBy(items, 'level', 'desc')
    expect(sorted[0].level).toBe(3)
    expect(sorted[2].level).toBe(1)
  })

  test('does not mutate original array', () => {
    const original = [...items]
    sortBy(items, 'level')
    expect(items).toEqual(original)
  })
})

// ============================================
// BUILD SKILLS WITH LEVELS TESTS
// ============================================
describe('buildSkillsWithLevels', () => {
  test('assigns default level to all skills', () => {
    const result = buildSkillsWithLevels(["Verilog", "Python"])
    expect(result[0].level).toBe("proficient")
    expect(result[1].level).toBe("proficient")
  })

  test('assigns custom default level', () => {
    const result = buildSkillsWithLevels(["React"], "learning")
    expect(result[0].level).toBe("learning")
  })

  test('preserves skill names', () => {
    const result = buildSkillsWithLevels(["Verilog", "FPGA"])
    expect(result[0].name).toBe("Verilog")
    expect(result[1].name).toBe("FPGA")
  })

  test('returns correct length', () => {
    const skills = ["A", "B", "C", "D"]
    const result = buildSkillsWithLevels(skills)
    expect(result).toHaveLength(4)
  })
})

// ============================================
// GET SKILL LEVEL COLOR TESTS
// ============================================
describe('getSkillLevelColor', () => {
  test('returns green for expert', () => {
    expect(getSkillLevelColor("expert")).toBe("#00ff88")
  })

  test('returns lighter green for proficient', () => {
    expect(getSkillLevelColor("proficient")).toBe("#00cc6a")
  })

  test('returns gray for learning', () => {
    expect(getSkillLevelColor("learning")).toBe("#666")
  })
})

// ============================================
// LOCAL STORAGE TESTS
// ============================================
describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('saves and retrieves value', () => {
    setLocalStorage('testKey', { name: "Madheshwaran" })
    const result = getLocalStorage('testKey', null)
    expect(result).toEqual({ name: "Madheshwaran" })
  })

  test('returns fallback if key not found', () => {
    const result = getLocalStorage('nonexistent', "default")
    expect(result).toBe("default")
  })

  test('handles array values', () => {
    const arr = ["Verilog", "Python", "React"]
    setLocalStorage('skills', arr)
    const result = getLocalStorage<string[]>('skills', [])
    expect(result).toEqual(arr)
  })
})
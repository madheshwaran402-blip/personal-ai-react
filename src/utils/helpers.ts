import { Project, SkillWithLevel, SkillLevel, AsyncState } from '../data/types'

// ===== GENERIC HELPER FUNCTIONS =====

export function filterBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate)
}

export function findBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return items.find(predicate)
}

export function sortBy<T>(
  items: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1
    return 0
  })
}

export function createAsyncState<T>(initialData: T | null = null): AsyncState<T> {
  return {
    data: initialData,
    loading: false,
    error: null
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getSkillLevelColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    learning: "#666",
    familiar: "#888",
    proficient: "#00cc6a",
    expert: "#00ff88"
  }
  return colors[level]
}

export function filterProjectsByStatus(
  projects: Project[],
  status: string
): Project[] {
  return filterBy(projects, p => p.status === status)
}

export function getProjectsByType(
  projects: Project[],
  type: string
): Project[] {
  return filterBy(projects, p => p.type === type)
}

export function buildSkillsWithLevels(
  skills: string[],
  defaultLevel: SkillLevel = "proficient"
): SkillWithLevel[] {
  return skills.map(name => ({ name, level: defaultLevel }))
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development"
}

export function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved) as T
    return fallback
  } catch {
    return fallback
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable
  }
}

export function measurePerformance(name: string, fn: () => void): void {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${(end - start).toFixed(2)}ms`)
  } else {
    fn()
  }
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      fn(...args)
    }
  }
}
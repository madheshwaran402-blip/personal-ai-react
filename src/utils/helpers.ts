import { Project, SkillWithLevel, SkillLevel, AsyncState } from '../data/types'

// ===== GENERIC HELPER FUNCTIONS =====

// Generic filter function
export function filterBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate)
}

// Generic find function
export function findBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return items.find(predicate)
}

// Generic sort function
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

// Create initial async state
export function createAsyncState<T>(initialData: T | null = null): AsyncState<T> {
  return {
    data: initialData,
    loading: false,
    error: null
  }
}

// Format date
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Get skill level color
export function getSkillLevelColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    learning: "#666",
    familiar: "#888",
    proficient: "#00cc6a",
    expert: "#00ff88"
  }
  return colors[level]
}

// Filter projects by status
export function filterProjectsByStatus(
  projects: Project[],
  status: string
): Project[] {
  return filterBy(projects, p => p.status === status)
}

// Get projects by type
export function getProjectsByType(
  projects: Project[],
  type: string
): Project[] {
  return filterBy(projects, p => p.type === type)
}

// Build skills with levels
export function buildSkillsWithLevels(
  skills: string[],
  defaultLevel: SkillLevel = "proficient"
): SkillWithLevel[] {
  return skills.map(name => ({ name, level: defaultLevel }))
}

// Capitalize first letter
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Check if running in development
export function isDev(): boolean {
  return import.meta.env.DEV  
}

// Safe localStorage get
export function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved) as T
    return fallback
  } catch {
    return fallback
  }
}

// Safe localStorage set
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable
  }
}
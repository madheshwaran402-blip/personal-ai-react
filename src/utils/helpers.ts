import { Project, SkillWithLevel, SkillLevel } from '../data/types'

/**
 * Filters an array by a predicate function
 * @param items - Array to filter
 * @param predicate - Function that returns true for items to keep
 * @returns Filtered array
 */
export function filterBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate)
}

/**
 * Finds first item matching predicate
 * @param items - Array to search
 * @param predicate - Function that returns true for match
 * @returns First matching item or undefined
 */
export function findBy<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return items.find(predicate)
}

/**
 * Sorts array by a key, ascending or descending
 * @param items - Array to sort
 * @param key - Key to sort by
 * @param direction - 'asc' or 'desc'
 * @returns New sorted array (does not mutate original)
 */
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


/**
 * Truncates text to maxLength with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Returns color hex string for skill level
 */
export function getSkillLevelColor(level: SkillLevel): string {
  const colors: Record<SkillLevel, string> = {
    learning: "#666",
    familiar: "#888",
    proficient: "#00cc6a",
    expert: "#00ff88"
  }
  return colors[level]
}

/**
 * Filters projects by status string
 */
export function filterProjectsByStatus(
  projects: Project[],
  status: string
): Project[] {
  return filterBy(projects, p => p.status === status)
}

/**
 * Gets projects filtered by type
 */
export function getProjectsByType(
  projects: Project[],
  type: string
): Project[] {
  return filterBy(projects, p => p.type === type)
}

/**
 * Converts string array to SkillWithLevel array
 */
export function buildSkillsWithLevels(
  skills: string[],
  defaultLevel: SkillLevel = "proficient"
): SkillWithLevel[] {
  return skills.map(name => ({ name, level: defaultLevel }))
}

/**
 * Capitalizes first letter of string
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Returns true if running in development mode
 */
export function isDev(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Safely gets value from localStorage with fallback
 */
export function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved) as T
    return fallback
  } catch {
    return fallback
  }
}

/**
 * Safely sets value in localStorage
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — fail silently
  }
}


/**
 * Debounces a function — delays execution until
 * after delay ms have passed since last call
 */
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

/**
 * Throttles a function — limits calls to once per limit ms
 */
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
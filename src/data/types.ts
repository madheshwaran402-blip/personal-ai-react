export interface PersonalInfo {
  name: string
  email: string
  location: string
  status: string
  github: string
  bio: string
}

export interface Education {
  degree: string
  specialization: string
  year: string
  location: string
  focus: string
}

export interface Skills {
  programming: string[]
  hardware: string[]
  tools: string[]
}

export interface Project {
  name: string
  type: string
  status: string
  description: string
  tech: string[]
  achievement?: string
}

export interface Research {
  interests: string[]
  goal: string
}

export interface Goals {
  primary: string
  secondary: string
  longTerm: string[]
}

export interface Achievement {
  title: string
  organizer: string
  team?: string
  domain: string
  prize: string
}

export interface Startup {
  name: string
  focus: string
  products?: string[]
}

export interface Profile {
  personal: PersonalInfo
  education: Education
  skills: Skills
  projects: Project[]
  research: Research
  goals: Goals
  achievements: Achievement[]
  startups: Startup[]
  currentlyLearning: string[]
  personality: string[]
}

export interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  time: string
  streaming?: boolean
  failed?: boolean
}

export interface HistoryItem {
  role: "user" | "assistant"
  content: string
}

export interface HealthResponse {
  backend: string
  ollama: string
  model: string
  streaming?: boolean
}

export interface ChatResponse {
  answer: string
  model: string
  recruiterMode?: boolean
}

export interface SuggestionChip {
  label: string
  q: string
}

export type BackendStatus = "online" | "offline" | "checking"

// ===== UTILITY TYPES FOR YOUR APP =====

// Project summary — only name and status
export type ProjectSummary = Pick<Project, "name" | "status" | "description">

// Partial project — for forms/editing
export type PartialProject = Partial<Project>

// Read only profile — can't be accidentally modified
export type ReadonlyProfile = Readonly<Profile>

// Skill levels
export type SkillLevel = "learning" | "familiar" | "proficient" | "expert"
export type SkillWithLevel = {
  name: string
  level: SkillLevel
}

// Chat message status
export type MessageStatus = "sending" | "sent" | "failed"

// API state — generic loading state
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Navigation item
export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

// Theme type
export type Theme = "dark" | "light"

// Page name for routing
export type PageName = "home" | "chat" | "projects" | "404"
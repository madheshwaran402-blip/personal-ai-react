// ============================================
// ALL YOUR TYPES IN ONE PLACE
// ============================================

// Personal info
export interface PersonalInfo {
  name: string
  email: string
  location: string
  status: string
  github: string
  bio: string
}

// Education
export interface Education {
  degree: string
  specialization: string
  year: string
  location: string
  focus: string
}

// Skills grouped by category
export interface Skills {
  programming: string[]
  hardware: string[]
  tools: string[]
}

// A single project
export interface Project {
  name: string
  type: string
  status: string
  description: string
  tech: string[]
  achievement?: string  // optional — not all projects have this
}

// Research section
export interface Research {
  interests: string[]
  goal: string
}

// Career goals
export interface Goals {
  primary: string
  secondary: string
  longTerm: string[]
}

// Achievement / award
export interface Achievement {
  title: string
  organizer: string
  team?: string
  domain: string
  prize: string
}

// Startup idea
export interface Startup {
  name: string
  focus: string
  products?: string[]  // optional
}

// The complete profile
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

// Chat message
export interface Message {
  id: number
  text: string
  sender: "user" | "bot"  // can ONLY be these two values
  time: string
  streaming?: boolean
  failed?: boolean
}

// Conversation history item for AI
export interface HistoryItem {
  role: "user" | "assistant"
  content: string
}

// Backend health response
export interface HealthResponse {
  backend: string
  ollama: string
  model: string
  streaming?: boolean
}

// Backend chat response
export interface ChatResponse {
  answer: string
  model: string
  recruiterMode?: boolean
}

// Suggestion chip
export interface SuggestionChip {
  label: string
  q: string
}

// Backend status type
export type BackendStatus = "online" | "offline" | "checking"
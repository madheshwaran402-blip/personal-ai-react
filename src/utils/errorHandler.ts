export interface AppError {
  message: string
  code?: string
  status?: number
  timestamp: Date
}

export function createError(
  message: string,
  code?: string,
  status?: number
): AppError {
  return {
    message,
    code,
    status,
    timestamp: new Date()
  }
}

export function parseError(error: unknown): AppError {
  if (error instanceof Error) {
    return createError(error.message)
  }
  if (typeof error === 'string') {
    return createError(error)
  }
  return createError('An unexpected error occurred')
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError')
    )
  }
  return false
}

export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('timeout') ||
      error.message.includes('AbortError')
    )
  }
  return false
}

export function getErrorMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return 'Cannot connect to server. Make sure Flask and Ollama are running.'
  }
  if (isTimeoutError(error)) {
    return 'Request timed out. The AI may be busy, try again.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong. Please try again.'
}

export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Error${context ? ` in ${context}` : ''}`)
    console.error(error)
    console.groupEnd()
  }
}
import { useState, useEffect, useCallback } from 'react'
import { checkHealth } from '../services/api'
import { BackendStatus } from '../data/types'

export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const check = useCallback(async (): Promise<void> => {
    try {
      const health = await checkHealth()
      const backendOk = health.backend === "running"
      const ollamaOk = health.ollama === "running"
      setStatus(backendOk && ollamaOk ? "online" : "offline")
      setLastChecked(new Date())
    } catch {
      setStatus("offline")
      setLastChecked(new Date())
    }
  }, [])

  useEffect(() => { check() }, [check])

  useEffect(() => {
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [check])

  useEffect(() => {
    window.addEventListener("focus", check)
    return () => window.removeEventListener("focus", check)
  }, [check])

  return { status, lastChecked, recheckNow: check }
}
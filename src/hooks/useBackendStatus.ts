import { useState, useEffect, useCallback } from 'react'
import { BackendStatus } from '../data/types'
import { checkHealth } from '../services/api'

export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const check = useCallback(async (): Promise<void> => {
    try {
      const health = await checkHealth()
      const isOnline = health.backend === "running" && health.ollama === "running"
      setStatus(isOnline ? "online" : "offline")
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
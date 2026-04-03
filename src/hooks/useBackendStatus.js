// ============================================
// CUSTOM HOOK — Monitor backend connection
// ============================================
import { useState, useEffect, useCallback } from 'react'
import { checkHealth } from '../services/api'

export function useBackendStatus() {
  const [status, setStatus] = useState("checking")
  const [lastChecked, setLastChecked] = useState(null)

  const check = useCallback(async () => {
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

  // Check on load
  useEffect(() => {
    check()
  }, [check])

  // Recheck every 30 seconds
  useEffect(() => {
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [check])

  // Recheck when window gets focus
  useEffect(() => {
    window.addEventListener("focus", check)
    return () => window.removeEventListener("focus", check)
  }, [check])

  return { status, lastChecked, recheckNow: check }
}
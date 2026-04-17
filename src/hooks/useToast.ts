import { useState, useCallback } from 'react'
import { ToastMessage, ToastType } from '../components/Toast'

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((
    message: string,
    type: ToastType = 'info',
    duration: number = 4000
  ) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback((message: string) => {
    addToast(message, 'success')
  }, [addToast])

  const error = useCallback((message: string) => {
    addToast(message, 'error', 6000)
  }, [addToast])

  const info = useCallback((message: string) => {
    addToast(message, 'info')
  }, [addToast])

  const warning = useCallback((message: string) => {
    addToast(message, 'warning', 5000)
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}
import { useHealthQuery } from './useHealthQuery'
import { BackendStatus } from '../data/types'

export function useBackendStatus() {
  const { data, isLoading, refetch } = useHealthQuery()

  let status: BackendStatus = 'checking'

  if (isLoading) {
    status = 'checking'
  } else if (data?.backend === 'running' && data?.ollama === 'running') {
    status = 'online'
  } else {
    status = 'offline'
  }

  return {
    status,
    lastChecked: new Date(),
    recheckNow: refetch
  }
}
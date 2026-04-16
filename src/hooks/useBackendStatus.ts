import { useCallback } from 'react'
import { useHealthQuery } from './useHealthQuery'
import { useQueryHelpers } from './useQueryHelpers'
import { BackendStatus } from '../data/types'

export function useBackendStatus() {
  const { data, isLoading, isFetching } = useHealthQuery()
  const { invalidateHealth } = useQueryHelpers()

  let status: BackendStatus = 'checking'

  if (isLoading || isFetching && !data) {
    status = 'checking'
  } else if (data?.backend === 'running' && data?.ollama === 'running') {
    status = 'online'
  } else {
    status = 'offline'
  }

  const recheckNow = useCallback(() => {
    invalidateHealth()
  }, [invalidateHealth])

  return {
    status,
    lastChecked: new Date(),
    recheckNow
  }
}
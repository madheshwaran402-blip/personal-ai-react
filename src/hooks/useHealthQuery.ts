import { useQuery } from '@tanstack/react-query'
import { checkHealth } from '../services/api'
import { HealthResponse } from '../data/types'

export function useHealthQuery() {
  return useQuery<HealthResponse, Error>({
    queryKey: ['health'],
    queryFn: checkHealth,

    // Check every 30 seconds
    refetchInterval: 30000,

    // Recheck when tab gets focus
    refetchOnWindowFocus: true,

    // Keep previous data while refetching
    placeholderData: (prev) => prev,

    // Don't retry too many times
    retry: 1,

    // 5 second timeout before marking as stale
    staleTime: 5000
  })
}
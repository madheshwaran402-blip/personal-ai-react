import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useQueryHelpers() {
  const queryClient = useQueryClient()

  const invalidateHealth = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['health'] })
  }, [queryClient])

  const invalidateGitHub = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['github'] })
  }, [queryClient])

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries()
  }, [queryClient])

  const prefetchHealth = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ['health'],
      queryFn: async () => {
        const { checkHealth } = await import('../services/api')
        return checkHealth()
      },
      staleTime: 5000
    })
  }, [queryClient])

  const getCachedHealth = useCallback(() => {
    return queryClient.getQueryData(['health'])
  }, [queryClient])

  const getCachedProfile = useCallback(() => {
    return queryClient.getQueryData(['profile'])
  }, [queryClient])

  return {
    invalidateHealth,
    invalidateGitHub,
    invalidateAll,
    prefetchHealth,
    getCachedHealth,
    getCachedProfile
  }
}
import { useQuery } from '@tanstack/react-query'
import { Profile } from '../data/types'

async function fetchProfile(): Promise<Profile> {
  const profile = await import('../data/profile')
  return profile.default as Profile
}

export function useProfileQuery() {
  return useQuery<Profile, Error>({
    queryKey: ['profile'],
    queryFn: fetchProfile,

    // Profile never changes — cache forever
    staleTime: Infinity,

    // Never refetch profile in background
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false
  })
}
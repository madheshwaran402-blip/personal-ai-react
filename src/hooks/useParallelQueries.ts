import { useQueries } from '@tanstack/react-query'
import { checkHealth } from '../services/api'
import { HealthResponse } from '../data/types'

interface GitHubUser {
  public_repos: number
  followers: number
  name: string
  bio: string | null
}

interface GitHubRepo {
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
  updated_at: string
}

async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(
    'https://api.github.com/users/madheshwaran402-blip'
  )
  if (!res.ok) throw new Error('GitHub user fetch failed')
  return res.json()
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    'https://api.github.com/users/madheshwaran402-blip/repos?sort=updated&per_page=6'
  )
  if (!res.ok) throw new Error('GitHub repos fetch failed')
  return res.json()
}

export function usePortfolioData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['health'] as const,
        queryFn: checkHealth,
        staleTime: 5000,
        retry: 1,
        refetchInterval: 30000
      },
      {
        queryKey: ['github', 'user'] as const,
        queryFn: fetchGitHubUser,
        staleTime: 1000 * 60 * 60,
        retry: 1,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['github', 'repos'] as const,
        queryFn: fetchGitHubRepos,
        staleTime: 1000 * 60 * 60,
        retry: 1,
        refetchOnWindowFocus: false
      }
    ]
  })

  const [healthResult, userResult, reposResult] = results

  const isAnyLoading = results.some(r => r.isLoading)
  const isAnyError = results.some(r => r.isError)

  return {
    health: healthResult.data as HealthResponse | undefined,
    githubUser: userResult.data as GitHubUser | undefined,
    githubRepos: reposResult.data as GitHubRepo[] | undefined,
    isLoading: isAnyLoading,
    isError: isAnyError,
    refetchAll: () => results.forEach(r => r.refetch())
  }
}
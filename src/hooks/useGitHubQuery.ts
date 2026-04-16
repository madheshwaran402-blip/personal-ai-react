import { useQuery } from '@tanstack/react-query'

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  created_at: string
  bio: string | null
  name: string
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
  const res = await fetch('https://api.github.com/users/madheshwaran402-blip')
  if (!res.ok) throw new Error('GitHub API failed')
  return res.json()
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    'https://api.github.com/users/madheshwaran402-blip/repos?sort=updated&per_page=6'
  )
  if (!res.ok) throw new Error('GitHub repos failed')
  return res.json()
}

export function useGitHubUserQuery() {
  return useQuery<GitHubUser, Error>({
    queryKey: ['github', 'user'],
    queryFn: fetchGitHubUser,

    // Cache for 1 hour — GitHub data doesn't change often
    staleTime: 1000 * 60 * 60,

    retry: 1,
    refetchOnWindowFocus: false
  })
}

export function useGitHubReposQuery() {
  return useQuery<GitHubRepo[], Error>({
    queryKey: ['github', 'repos'],
    queryFn: fetchGitHubRepos,

    staleTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false
  })
}
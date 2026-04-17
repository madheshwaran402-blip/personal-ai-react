import { useQuery } from '@tanstack/react-query'

interface GitHubRepo {
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
  topics: string[]
  updated_at: string
}

interface GitHubUser {
  login: string
  public_repos: number
  followers: number
}

async function fetchUser(): Promise<GitHubUser> {
  const res = await fetch(
    'https://api.github.com/users/madheshwaran402-blip'
  )
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
  )
  if (!res.ok) throw new Error('Failed to fetch repos')
  return res.json()
}

export function useGitHubWithRepos() {
  const userQuery = useQuery({
    queryKey: ['github', 'user', 'detailed'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const reposQuery = useQuery({
    queryKey: ['github', 'repos', 'detailed', userQuery.data?.login],
    queryFn: () => fetchUserRepos(userQuery.data!.login),

    // Only runs when user data is available
    enabled: !!userQuery.data?.login,

    staleTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false
  })

  return {
    user: userQuery.data,
    repos: reposQuery.data,
    isLoadingUser: userQuery.isLoading,
    isLoadingRepos: reposQuery.isLoading,
    isFetching: userQuery.isFetching || reposQuery.isFetching,
    userError: userQuery.error,
    reposError: reposQuery.error
  }
}
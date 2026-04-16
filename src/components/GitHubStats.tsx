import React from 'react'
import { useGitHubUserQuery, useGitHubReposQuery } from '../hooks/useGitHubQuery'

function GitHubStats() {
  const {
    data: user,
    isLoading: userLoading,
    error: userError
  } = useGitHubUserQuery()

  const {
    data: repos,
    isLoading: reposLoading
  } = useGitHubReposQuery()

  if (userLoading || reposLoading) {
    return (
      <div className="github-stats loading">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    )
  }

  if (userError) {
    return null
  }

  return (
    <div className="github-stats" aria-label="GitHub statistics">
      <div className="github-header">
        <span className="github-icon" aria-hidden="true">⌥</span>
        <a
          href="https://github.com/madheshwaran402-blip"
          target="_blank"
          rel="noreferrer noopener"
          className="github-link"
          aria-label="View GitHub profile"
        >
          GitHub Activity
        </a>
      </div>

      {user && (
        <div className="github-meta">
          <span>{user.public_repos} repos</span>
          <span>·</span>
          <span>{user.followers} followers</span>
        </div>
      )}

      {repos && repos.length > 0 && (
        <div className="github-repos">
          {repos.slice(0, 3).map(repo => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="github-repo-card"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <span className="repo-name">{repo.name}</span>
              {repo.language && (
                <span className="repo-lang">{repo.language}</span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="repo-stars">
                  ★ {repo.stargazers_count}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default GitHubStats
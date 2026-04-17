import React from 'react'
import { usePortfolioData } from '../hooks/useParallelQueries'

function GitHubStats() {
  const { githubUser, githubRepos, isLoading, isError } = usePortfolioData()

  if (isLoading) {
    return (
      <div className="github-stats loading" aria-busy="true" aria-label="Loading GitHub stats">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    )
  }

  if (isError || !githubUser) {
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
          aria-label="View GitHub profile (opens in new tab)"
        >
          GitHub Activity
        </a>
      </div>

      <div className="github-meta">
        <span>{githubUser.public_repos} repos</span>
        <span>·</span>
        <span>{githubUser.followers} followers</span>
      </div>

      {githubRepos && githubRepos.length > 0 && (
        <div className="github-repos">
          {githubRepos.slice(0, 3).map(repo => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="github-repo-card"
              aria-label={`View ${repo.name} repository on GitHub`}
            >
              <span className="repo-name">{repo.name}</span>
              {repo.language && (
                <span className="repo-lang">{repo.language}</span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="repo-stars">★ {repo.stargazers_count}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default GitHubStats
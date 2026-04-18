import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../hooks/useParallelQueries'

function StatusPage() {
  useEffect(() => {
    document.title = "Status | Madheshwaran AI"
  }, [])

  const { health, githubUser, isLoading } = usePortfolioData()

  const services = [
    {
      name: "Frontend",
      description: "React app on Vercel",
      status: "online",
      url: "https://madheshwaran-ai.vercel.app"
    },
    {
      name: "AI Backend",
      description: "Python Flask + Ollama",
      status: health?.backend === "running" ? "online" : "offline",
      note: "Runs locally on Mac"
    },
    {
      name: "AI Model",
      description: health?.model || "Llama 3.2",
      status: health?.ollama === "running" ? "online" : "offline",
      note: "Ollama local inference"
    },
    {
      name: "GitHub API",
      description: "Live repository stats",
      status: githubUser ? "online" : "offline",
      url: "https://github.com/madheshwaran402-blip"
    }
  ]

  return (
    <div className="app-main">
      <div className="page-nav">
        <Link to="/" className="back-link">← Back to Portfolio</Link>
      </div>

      <div className="page-header">
        <h1 className="page-title">System Status</h1>
        <p className="page-subtitle">
          Live status of all services powering this portfolio.
        </p>
      </div>

      {isLoading ? (
        <div className="status-loading">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      ) : (
        <div className="status-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className={`status-card ${service.status}`}
            >
              <div className="status-card-header">
                <div className="status-indicator">
                  <span
                    className={`status-dot ${service.status}`}
                    aria-hidden="true"
                  />
                  <span className="status-label">
                    {service.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
                <h3>{service.name}</h3>
              </div>
              <p className="status-description">{service.description}</p>
              {service.note && (
                <p className="status-note">ℹ️ {service.note}</p>
              )}
              {service.url && (
                <a
                  href={service.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="status-link"
                >
                  View ↗️
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="status-footer">
        <p>
          Backend offline? Run locally:{' '}
          <code>ollama serve</code> then <code>python app.py</code>
        </p>
        <p className="status-upgrade-note">
          🚀 Planning to upgrade to Claude API + Render.com for 24/7 availability
        </p>
      </div>
    </div>
  )
}

export default StatusPage
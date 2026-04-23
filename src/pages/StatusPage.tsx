import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../hooks/useParallelQueries'
import { useHealthQuery } from '../hooks/useHealthQuery'
import ArchitectureDiagram from '../components/ArchitectureDiagram'

function StatusPage() {
  useEffect(() => {
    document.title = "Status | Madheshwaran AI"
  }, [])

  const { githubUser, isLoading } = usePortfolioData()
  const { data: health } = useHealthQuery()

  const services = [
    {
      name: "Frontend",
      description: "React 19 + TypeScript + Vite on Vercel",
      status: "online" as const,
      url: "https://madheshwaran-ai.vercel.app",
      detail: "Always online"
    },
    {
      name: "AI Backend",
      description: "Python Flask v4.0 with RAG + Memory",
      status: (health?.backend === "running" ? "online" : "offline") as "online" | "offline",
      note: "Runs locally on Mac",
      detail: "v4.0 — RAG + Memory + FAISS"
    },
    {
      name: "AI Model",
      description: health?.model || "Llama 3.2 via Ollama",
      status: (health?.ollama === "running" ? "online" : "offline") as "online" | "offline",
      note: "Local inference — no API costs",
      detail: "Custom Modelfile with tuned parameters"
    },
    {
      name: "RAG System",
      description: "FAISS vector search",
      status: (health?.rag?.enabled ? "online" : "offline") as "online" | "offline",
      detail: `${health?.rag?.chunks || 35} knowledge chunks indexed`
    },
    {
      name: "Memory System",
      description: "SQLite conversation storage",
      status: (health?.memory?.enabled ? "online" : "offline") as "online" | "offline",
      detail: `${health?.memory?.total_conversations || 0} conversations stored`
    },
    {
      name: "GitHub API",
      description: "Live repository stats",
      status: (githubUser ? "online" : "offline") as "online" | "offline",
      url: "https://github.com/madheshwaran402-blip",
      detail: `${githubUser?.public_repos || 0} public repos`
    }
  ]

  const techStack = [
    {
      category: "Frontend",
      items: ["React 19", "TypeScript", "Vite 8", "Zustand", "React Query"]
    },
    {
      category: "Backend",
      items: ["Python Flask", "Ollama", "Llama 3.2", "FAISS", "SQLite"]
    },
    {
      category: "AI System",
      items: ["RAG Pipeline", "Memory Store", "Query Expansion", "Semantic Search"]
    },
    {
      category: "DevOps",
      items: ["Vercel", "Git", "GitHub Actions CI", "Gunicorn"]
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
          Live status of all services powering this AI portfolio.
        </p>
      </div>

      {isLoading ? (
        <div className="status-loading">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      ) : (
        <>
          <div className="status-grid">
            {services.map((service, i) => (
              <div
                key={i}
                className={`status-card ${service.status}`}
                aria-label={`${service.name} is ${service.status}`}
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
                {service.detail && (
                  <p className="status-detail">{service.detail}</p>
                )}
                {service.note && (
                  <p className="status-note">ℹ️ {service.note}</p>
                )}
                {service.url && (
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="status-link"
                    aria-label={`View ${service.name}`}
                  >
                    View ↗️
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="tech-stack-section">
            <h2>Tech Stack</h2>
            <div className="tech-stack-grid">
              {techStack.map((group, i) => (
                <div key={i} className="tech-group">
                  <h3 className="tech-group-title">{group.category}</h3>
                  <div className="tech-items">
                    {group.items.map((item, j) => (
                      <span key={j} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ArchitectureDiagram />

          <div className="status-footer">
            <p>
              Backend offline? Run locally:{' '}
              <code>ollama serve</code> then <code>python app.py</code>
            </p>
            <p className="status-upgrade-note">
              🚀 Upgrade path: Claude API + Render.com for 24/7 availability
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default StatusPage
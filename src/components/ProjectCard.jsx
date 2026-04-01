import React from 'react'

function ProjectCard({ name, status, description, tech, achievement, highlight }) {
  return (
    <div className={`project-card ${highlight ? 'highlight' : ''}`}>
      <div className="project-header">
        <h3>{name}</h3>
        <span className="status-badge">{status}</span>
      </div>
      <p className="project-desc">{description}</p>
      {achievement && (
        <p className="project-achievement">🏆 {achievement}</p>
      )}
      {tech && (
        <div className="project-tags">
          {tech.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      )}
    </div>
  )
}

export default ProjectCard
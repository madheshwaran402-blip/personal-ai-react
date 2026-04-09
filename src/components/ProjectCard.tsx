import React from 'react'

interface ProjectCardProps {
  name: string
  status: string
  description: string
  tech: string[]
  achievement?: string
  highlight?: boolean
}

function ProjectCard({
  name,
  status,
  description,
  tech,
  achievement,
  highlight
}: ProjectCardProps) {
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
          {tech.map((t: string, i: number) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectCard
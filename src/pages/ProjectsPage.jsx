import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    name: "Determinex",
    status: "TRL 1–3 Prototype",
    description: "FPGA-based system handling missing, duplicate, and out-of-order data streams with deterministic fault-tolerant architecture. Built to solve real-world data integrity problems in high-speed systems.",
    tech: ["FPGA", "Verilog", "SystemVerilog", "Deterministic Systems"],
    achievement: "Submitted for Tamil Nadu Innovation & Quantum Challenge",
    highlight: true,
    details: [
      "Handles missing, duplicate and out-of-order packets",
      "Deterministic fault-tolerant architecture",
      "TRL 1-3 prototype stage",
      "Competition submission — Tamil Nadu Innovation Challenge"
    ]
  },
  {
    name: "Smart Shoe Prototype",
    status: "Patented",
    description: "ESP32-based smart shoe with air-bladder sole that switches between Sport Mode (curved) and Casual Mode (flat) via mobile app. Includes health monitoring sensors.",
    tech: ["ESP32", "IoT", "Embedded Systems", "Mobile App"],
    details: [
      "Air-bladder sole with two modes",
      "MPU6050 accelerometer + gyroscope",
      "MAX30102 heart rate sensor",
      "Pump control system",
      "Battery management",
      "Mobile app control"
    ]
  },
  {
    name: "Smart Water Tank Automation",
    status: "Completed",
    description: "MQTT-based dual-mode control system with live hardware mode and simulation demo mode. Built with Node.js and Turbotic automation workflows.",
    tech: ["MQTT", "Node.js", "Turbotic"],
    details: [
      "Live hardware mode",
      "Simulation demo mode",
      "MQTT protocol",
      "Node.js backend",
      "Turbotic automation"
    ]
  },
  {
    name: "Personal AI Assistant",
    status: "In Progress",
    description: "Full-stack AI chatbot that knows everything about Madheshwaran. Built over a 9-month roadmap using React, Python Flask, and Llama 3.2.",
    tech: ["React", "Python", "Flask", "Ollama", "TypeScript"],
    details: [
      "React frontend with TypeScript",
      "Python Flask backend",
      "Llama 3.2 via Ollama",
      "Streaming responses",
      "Recruiter mode",
      "Deployed on Vercel"
    ]
  }
]

function ProjectDetail({ details }) {
  return (
    <ul className="project-detail-list">
      {details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  )
}

function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects | Madheshwaran"
  }, [])

  return (
    <div className="app-main">

      {/* Back navigation */}
      <div className="page-nav">
        <Link to="/" className="back-link">← Back to Portfolio</Link>
      </div>

      {/* Page header */}
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          Hardware systems, IoT solutions, and AI applications
          built with a focus on reliability and real-world impact.
        </p>
      </div>

      {/* Projects grid */}
      <div className="projects-full-list">
        {projects.map((project, i) => (
          <div key={i} className={`project-full-card ${project.highlight ? 'highlight' : ''}`}>
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className="status-badge">{project.status}</span>
            </div>
            <p className="project-desc">{project.description}</p>
            {project.achievement && (
              <p className="project-achievement">🏆 {project.achievement}</p>
            )}
            <ProjectDetail details={project.details} />
            <div className="project-tags">
              {project.tech.map((t, j) => <span key={j}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="page-cta">
        <p>Want to know more about any project?</p>
        <Link to="/chat" className="cta-btn">
          Chat with my AI →
        </Link>
      </div>

    </div>
  )
}

export default ProjectsPage
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ResumePage() {
  useEffect(() => {
    document.title = "Resume | Madheshwaran"
  }, [])

  const timeline = [
    {
      period: "2024 — Present",
      title: "Personal AI Portfolio",
      type: "project",
      description: "Built full-stack AI chatbot with RAG, FAISS, SQLite memory, voice interface. React + TypeScript + Python Flask + Ollama.",
      tags: ["React", "TypeScript", "Python", "RAG", "FAISS"]
    },
    {
      period: "2024",
      title: "IDEATHON 1.0 Winner",
      type: "achievement",
      description: "Won first place at PSNA College with Team Determinex. Industry Innovation domain. Medal + Cash Prize.",
      tags: ["Determinex", "FPGA", "Innovation"]
    },
    {
      period: "2024",
      title: "Smart Shoe — Patented",
      type: "project",
      description: "ESP32-based smart shoe with air-bladder sole. MPU6050 + MAX30102 sensors. Patent filed and approved.",
      tags: ["ESP32", "IoT", "Patent"]
    },
    {
      period: "2023 — Present",
      title: "Determinex",
      type: "project",
      description: "FPGA-based deterministic data stream processor. Handles missing, duplicate, out-of-order packets. TRL 1-3.",
      tags: ["FPGA", "Verilog", "SystemVerilog"]
    },
    {
      period: "2023",
      title: "Smart Water Tank",
      type: "project",
      description: "MQTT-based dual-mode automation system with live hardware and simulation modes.",
      tags: ["MQTT", "Node.js", "IoT"]
    },
    {
      period: "2023 — Present",
      title: "B.E./B.Tech VLSI Design",
      type: "education",
      description: "2nd year student specializing in VLSI Design and Technology. Tamil Nadu, India.",
      tags: ["VLSI", "Digital Design", "Embedded"]
    }
  ]

  const skillLevels = [
    { name: "Verilog / SystemVerilog", level: 75, category: "Hardware" },
    { name: "FPGA Design", level: 70, category: "Hardware" },
    { name: "Digital Design", level: 80, category: "Hardware" },
    { name: "Python", level: 75, category: "Programming" },
    { name: "React + TypeScript", level: 80, category: "Programming" },
    { name: "JavaScript", level: 78, category: "Programming" },
    { name: "Java + DSA", level: 65, category: "Programming" },
    { name: "Flask / Backend", level: 70, category: "Programming" },
    { name: "RAG / AI Systems", level: 65, category: "AI" },
    { name: "MQTT / IoT", level: 72, category: "Tools" }
  ]

  const typeColors: Record<string, string> = {
    project: '#00ff88',
    achievement: '#ffd700',
    education: '#4488ff'
  }

  const typeLabels: Record<string, string> = {
    project: 'Project',
    achievement: 'Achievement',
    education: 'Education'
  }

  return (
    <div className="app-main">
      <div className="page-nav">
        <Link to="/" className="back-link">← Back to Portfolio</Link>
      </div>

      <div className="page-header">
        <h1 className="page-title">Resume</h1>
        <p className="page-subtitle">
          Timeline, skills, and achievements — all in one place.
        </p>
      </div>

      {/* Skills Section */}
      <section className="resume-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="resume-section-title">
          Skill Proficiency
        </h2>
        <div className="skills-bars">
          {skillLevels.map((skill, i) => (
            <div key={i} className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-category">{skill.category}</span>
              </div>
              <div
                className="skill-bar-track"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency: ${skill.level}%`}
              >
                <div
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="resume-section" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="resume-section-title">
          Timeline
        </h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <article
              key={i}
              className="timeline-entry"
              aria-label={`${item.title} — ${item.period}`}
            >
              <div className="timeline-line">
                <div
                  className="timeline-dot"
                  style={{ background: typeColors[item.type] }}
                  aria-hidden="true"
                />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <span
                    className="timeline-type"
                    style={{ color: typeColors[item.type] }}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="timeline-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="page-cta">
        <p>Want to know more? Chat with my AI.</p>
        <Link to="/chat" className="cta-btn">
          Start Chatting →
        </Link>
      </div>
    </div>
  )
}

export default ResumePage
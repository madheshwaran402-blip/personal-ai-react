import React from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  name: string
  status: string
  description: string
  tech: string[]
  achievement?: string
  highlight?: boolean
}

const projects: Project[] = [
  {
    name: "Determinex",
    status: "TRL 1–3 Prototype",
    description: "FPGA-based system handling missing, duplicate, and out-of-order data streams with deterministic fault-tolerant architecture.",
    tech: ["FPGA", "Verilog", "SystemVerilog", "Deterministic Systems"],
    achievement: "Submitted for Tamil Nadu Innovation & Quantum Challenge",
    highlight: true
  },
  {
    name: "Smart Shoe Prototype",
    status: "Patented",
    description: "ESP32-based shoe with air-bladder sole — Sport Mode and Casual Mode via mobile app. Includes MPU6050, MAX30102 sensors.",
    tech: ["ESP32", "IoT", "Embedded Systems", "Mobile App"]
  },
  {
    name: "Smart Water Tank Automation",
    status: "Completed",
    description: "MQTT-based dual-mode control system with live hardware mode and simulation demo mode. Built with Node.js and Turbotic.",
    tech: ["MQTT", "Node.js", "Turbotic"]
  },
  {
    name: "Personal AI Assistant",
    status: "In Progress",
    description: "AI chatbot that knows everything about Madheshwaran. Built over a 9-month roadmap using React and Ollama.",
    tech: ["React", "Python", "Flask", "Ollama"]
  }
]

function Projects() {
  return (
    <section className="section" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project: Project, i: number) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
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
    description: "ESP32-based shoe with air-bladder sole — Sport Mode (curved) and Casual Mode (flat) via mobile app. Includes MPU6050, MAX30102 sensors, pump control and battery management.",
    tech: ["ESP32", "IoT", "Embedded Systems", "Mobile App"]
  },
  {
    name: "Smart Water Tank Automation",
    status: "Completed",
    description: "MQTT-based dual-mode control system with live hardware mode and simulation demo mode. Built with Node.js and Turbotic workflows.",
    tech: ["MQTT", "Node.js", "Turbotic"]
  },
  {
    name: "Personal AI Assistant",
    status: "In Progress",
    description: "AI chatbot that knows everything about Madheshwaran. Built over a 9-month roadmap using React and Claude API.",
    tech: ["React", "Claude API", "Python", "JavaScript"]
  }
]

function Projects() {
  return (
    <section className="section" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { fadeUp, staggerContainer, staggerItem } from '../utils/animations'

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
    <motion.section
      className="section"
      id="projects"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2>Projects</h2>
      <motion.div
        className="projects-list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => (
          <motion.div key={i} variants={staggerItem}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Projects
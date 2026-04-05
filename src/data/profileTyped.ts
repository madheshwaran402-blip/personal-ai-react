import { Profile } from './types'

// Your profile now has TypeScript checking
// If you make a mistake — you'll see it immediately in VS Code
const profile: Profile = {
  personal: {
    name: "Madheshwaran Maruthamuthu",
    email: "madheshwaran402@gmail.com",
    location: "Tamil Nadu, India",
    status: "Engineering Student",
    github: "github.com/madheshwaran402-blip",
    bio: "VLSI Design student and hardware-focused innovator building FPGA-based deterministic systems and neuromorphic-inspired architectures."
  },

  education: {
    degree: "B.E. / B.Tech",
    specialization: "VLSI Design and Technology",
    year: "2nd Year",
    location: "Tamil Nadu, India",
    focus: "Progressing toward core VLSI specialization"
  },

  skills: {
    programming: ["Python (Brian2, Nengo)", "MATLAB / Simulink", "Java + DSA", "JavaScript", "Node.js"],
    hardware: ["Verilog", "SystemVerilog", "FPGA Design", "Digital Design", "FSM / FIFO / Counters", "Event-driven Architecture"],
    tools: ["MQTT", "Turbotic", "Linux RH104", "Git", "GitHub"]
  },

  projects: [
    {
      name: "Determinex",
      type: "Hardware",
      status: "TRL 1-3 Prototype",
      description: "FPGA-based system handling missing, duplicate, and out-of-order data streams with deterministic fault-tolerant architecture.",
      tech: ["FPGA", "Verilog", "SystemVerilog"],
      achievement: "Submitted for Tamil Nadu Innovation and Quantum Challenge"
    },
    {
      name: "Smart Shoe Prototype",
      type: "IoT + Embedded",
      status: "Patented",
      description: "ESP32-based shoe with air-bladder sole — Sport and Casual modes via mobile app. Includes MPU6050, MAX30102 sensors.",
      tech: ["ESP32", "IoT", "Embedded Systems"]
    },
    {
      name: "Smart Water Tank Automation",
      type: "IoT",
      status: "Completed",
      description: "MQTT-based dual-mode control system with Node.js and Turbotic workflows.",
      tech: ["MQTT", "Node.js", "Turbotic"]
    },
    {
      name: "Personal AI Assistant",
      type: "AI + Web",
      status: "In Progress",
      description: "AI chatbot built over a 9-month roadmap using React and Ollama.",
      tech: ["React", "Python", "Flask", "Ollama"]
    }
  ],

  research: {
    interests: [
      "Neuromorphic Computing",
      "Spiking Neural Networks (SNN)",
      "Edge AI for Medical Systems",
      "Safety-aware AI Systems",
      "Event-driven Hardware"
    ],
    goal: "Publish Scopus-indexed research in neuromorphic hardware"
  },

  goals: {
    primary: "Core VLSI / Hardware Engineering role",
    secondary: "Software / Programming role",
    longTerm: [
      "Build neuromorphic hardware systems",
      "Publish Scopus-indexed research",
      "Develop real-world safety-critical systems"
    ]
  },

  achievements: [
    {
      title: "IDEATHON 1.0 Winner",
      organizer: "PSNA College of Engineering and Technology — IT Dept",
      team: "Determinex",
      domain: "Industry Innovation & Infrastructure",
      prize: "Medal + Cash Prize"
    }
  ],

  startups: [
    {
      name: "Determinex",
      focus: "Data integrity and event-driven hardware systems"
    },
    {
      name: "Safety Watch Platform",
      focus: "Offline wearable-to-wearable alert system",
      products: ["Hospital Monitoring Watch", "Elder Safety Watch", "Child Safety Watch", "Couple Safety Watch"]
    }
  ],

  currentlyLearning: [
    "Verilog + SystemVerilog (Advanced)",
    "Java + Data Structures",
    "Linux RH104",
    "FPGA-based Design"
  ],

  personality: [
    "Hardware-first mindset",
    "Practical and implementation-focused",
    "Competition-oriented thinking",
    "System-level problem solving",
    "Detail-oriented engineering approach"
  ]
}

export default profile
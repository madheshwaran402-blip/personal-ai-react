import { useState } from 'react'
import './App.css'

// ============================================
// YOUR KNOWLEDGE BASE
// ============================================
const profile = {
  personal: {
    name: "Madheshwaran Maruthamuthu",
    email: "madheshwaran402@gmail.com",
    location: "Tamil Nadu, India",
    github: "github.com/madheshwaran402-blip",
    bio: "VLSI Design student and hardware-focused innovator building FPGA-based deterministic systems and neuromorphic-inspired architectures."
  },
  education: {
    degree: "B.E. / B.Tech",
    specialization: "VLSI Design and Technology",
    year: "2nd Year",
    location: "Tamil Nadu, India"
  },
  skills: {
    programming: ["Python (Brian2, Nengo)", "MATLAB / Simulink", "Java + DSA", "JavaScript", "Node.js"],
    hardware: ["Verilog", "SystemVerilog", "FPGA Design", "Digital Design", "FSM / FIFO / Counters"],
    tools: ["MQTT", "Turbotic", "Linux RH104", "Git", "GitHub"]
  },
  projects: [
    {
      name: "Determinex",
      status: "TRL 1-3 Prototype",
      description: "FPGA-based system handling missing, duplicate, and out-of-order data streams with deterministic fault-tolerant architecture.",
      achievement: "Submitted for Tamil Nadu Innovation and Quantum Challenge"
    },
    {
      name: "Smart Shoe Prototype",
      status: "Patented",
      description: "ESP32-based shoe with air-bladder sole — Sport and Casual modes via mobile app. Includes MPU6050, MAX30102 sensors."
    },
    {
      name: "Smart Water Tank Automation",
      status: "Completed",
      description: "MQTT-based dual-mode control system with Node.js and Turbotic workflows."
    },
    {
      name: "Personal AI Assistant",
      status: "In Progress",
      description: "AI chatbot built over a 9-month roadmap using React and Claude API."
    }
  ],
  research: {
    interests: ["Neuromorphic Computing", "Spiking Neural Networks", "Edge AI for Medical Systems", "Safety-aware AI", "Event-driven Hardware"],
    goal: "Publish Scopus-indexed research in neuromorphic hardware"
  },
  goals: {
    primary: "Core VLSI / Hardware Engineering role",
    longTerm: ["Build neuromorphic hardware systems", "Publish Scopus-indexed research", "Develop safety-critical systems"]
  },
  achievements: [{
    title: "IDEATHON 1.0 Winner",
    organizer: "PSNA College of Engineering and Technology",
    domain: "Industry Innovation & Infrastructure",
    prize: "Medal + Cash Prize"
  }],
  startups: [
    { name: "Determinex", focus: "Data integrity and event-driven hardware systems" },
    { name: "Safety Watch Platform", focus: "Offline wearable-to-wearable alert system" }
  ],
  currentlyLearning: ["Verilog + SystemVerilog (Advanced)", "Java + Data Structures", "Linux RH104", "FPGA Design"]
}

// ============================================
// ANSWER ENGINE
// ============================================
function getAnswer(input) {
  const text = input.toLowerCase()

  if (text.includes("who") || text.includes("about") || text.includes("introduce") || text.includes("yourself")) {
    return `${profile.personal.name} — ${profile.personal.bio} Based in ${profile.personal.location}.`
  }
  else if (text.includes("education") || text.includes("college") || text.includes("degree") || text.includes("study")) {
    return `${profile.education.degree} in ${profile.education.specialization}, currently in ${profile.education.year} at ${profile.education.location}.`
  }
  else if (text.includes("hardware") || text.includes("vlsi") || text.includes("fpga") || text.includes("verilog")) {
    return `Hardware & VLSI skills: ${profile.skills.hardware.join(", ")}.`
  }
  else if (text.includes("programming") || text.includes("language") || text.includes("code")) {
    return `Programming skills: ${profile.skills.programming.join(", ")}.`
  }
  else if (text.includes("skill") || text.includes("tech") || text.includes("know")) {
    return `Programming: ${profile.skills.programming.join(", ")}. Hardware: ${profile.skills.hardware.join(", ")}. Tools: ${profile.skills.tools.join(", ")}.`
  }
  else if (text.includes("determinex") || text.includes("data stream")) {
    const p = profile.projects[0]
    return `${p.name} (${p.status}): ${p.description} ${p.achievement}.`
  }
  else if (text.includes("shoe") || text.includes("patent") || text.includes("esp32")) {
    const p = profile.projects[1]
    return `${p.name} (${p.status}): ${p.description}`
  }
  else if (text.includes("water") || text.includes("tank") || text.includes("mqtt")) {
    const p = profile.projects[2]
    return `${p.name} (${p.status}): ${p.description}`
  }
  else if (text.includes("project") || text.includes("built") || text.includes("made")) {
    return `Key projects: ${profile.projects.map(p => `${p.name} (${p.status})`).join(", ")}. Ask about any specific one!`
  }
  else if (text.includes("research") || text.includes("neuromorphic") || text.includes("snn")) {
    return `Research interests: ${profile.research.interests.join(", ")}. Goal: ${profile.research.goal}.`
  }
  else if (text.includes("goal") || text.includes("future") || text.includes("plan")) {
    return `Primary goal: ${profile.goals.primary}. Long-term: ${profile.goals.longTerm.join(", ")}.`
  }
  else if (text.includes("achievement") || text.includes("win") || text.includes("ideathon")) {
    const a = profile.achievements[0]
    return `${a.title} at ${a.organizer}. Domain: ${a.domain}. Prize: ${a.prize}.`
  }
  else if (text.includes("startup") || text.includes("safety watch")) {
    return `Startups: ${profile.startups.map(s => `${s.name} — ${s.focus}`).join(". ")}.`
  }
  else if (text.includes("learning") || text.includes("currently")) {
    return `Currently learning: ${profile.currentlyLearning.join(", ")}.`
  }
  else if (text.includes("contact") || text.includes("email") || text.includes("github")) {
    return `Email: ${profile.personal.email} | GitHub: ${profile.personal.github}`
  }
  else {
    return "Try asking about skills, projects (Determinex, Smart Shoe, Water Tank), research, goals, or achievements!"
  }
}

// ============================================
// COMPONENTS
// ============================================

// Single message bubble
function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <span className="message-text">{text}</span>
      <span className="message-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  )
}

// Typing indicator
function TypingIndicator() {
  return (
    <div className="message bot typing">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  )
}

// Suggestion chips
function Suggestions({ onSelect }) {
  const chips = [
    { label: "🔷 What is Determinex?",         q: "What is Determinex?" },
    { label: "👟 Smart Shoe patent",            q: "Tell me about the smart shoe" },
    { label: "💻 Your skills",                  q: "What are your skills?" },
    { label: "🧠 Research interests",           q: "What are your research interests?" },
    { label: "🎯 Your goals",                   q: "What are your goals?" },
    { label: "🏆 Achievements",                 q: "What are your achievements?" },
    { label: "🚀 All projects",                 q: "Tell me about your projects" },
    { label: "🏢 Startup vision",               q: "Tell me about your startups" },
  ]

  return (
    <div className="suggestions">
      {chips.map((chip, index) => (
        <button
          key={index}
          className="suggestion-chip"
          onClick={() => onSelect(chip.q)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}

// Chat input row
function ChatInput({ onSend, disabled }) {
  const [inputText, setInputText] = useState("")

  function handleSend() {
    if (inputText.trim() === "") return
    onSend(inputText)
    setInputText("")
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div className="chat-input-row">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask me anything about Madheshwaran..."
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        Send ↑
      </button>
    </div>
  )
}

// Main chat component
function ChatWindow() {
  // STATE 1 — list of messages
  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! I'm Madheshwaran's AI assistant. Ask me about his projects, skills, research, or goals!", sender: "bot" }
  ])

  // STATE 2 — is bot currently typing?
  const [isTyping, setIsTyping] = useState(false)

  function handleSend(userText) {
    // Add user message to state
    const userMessage = { id: Date.now(), text: userText, sender: "user" }
    setMessages(prev => [...prev, userMessage])

    // Show typing indicator
    setIsTyping(true)

    // After delay — add bot reply
    setTimeout(() => {
      const answer = getAnswer(userText)
      const botMessage = { id: Date.now() + 1, text: answer, sender: "bot" }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-status">
          <span className="status-dot"></span>
          <span>Madheshwaran's AI · Online</span>
        </div>
        <button
          className="clear-btn"
          onClick={() => setMessages([
            { id: 1, text: "👋 Chat cleared! Ask me anything about Madheshwaran.", sender: "bot" }
          ])}
        >
          Clear
        </button>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <Suggestions onSelect={handleSend} />

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">Madheshwaran<span className="dot">.</span></span>
        <nav>
          <a href="#chat">Chat</a>
          <a href="#projects">Projects</a>
        </nav>
      </header>

      <main className="app-main">
        <section className="hero">
          <p className="greeting">Hello, I'm</p>
          <h1>Madheshwaran</h1>
          <p className="tagline">VLSI Design Student · Hardware Innovator · Neuromorphic Enthusiast</p>
        </section>

        <section className="chat-section" id="chat">
          <h2>Chat With Me</h2>
          <p className="chat-subtitle">Ask anything about Madheshwaran — skills, projects, research, goals.</p>
          <ChatWindow />
        </section>
      </main>
    </div>
  )
}

export default App
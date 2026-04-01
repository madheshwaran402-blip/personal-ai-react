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
      name: "Determinex", status: "TRL 1-3 Prototype",
      description: "FPGA-based system handling missing, duplicate, and out-of-order data streams with deterministic fault-tolerant architecture.",
      achievement: "Submitted for Tamil Nadu Innovation and Quantum Challenge"
    },
    {
      name: "Smart Shoe Prototype", status: "Patented",
      description: "ESP32-based shoe with air-bladder sole — Sport and Casual modes via mobile app. Includes MPU6050, MAX30102 sensors."
    },
    {
      name: "Smart Water Tank Automation", status: "Completed",
      description: "MQTT-based dual-mode control system with Node.js and Turbotic workflows."
    },
    {
      name: "Personal AI Assistant", status: "In Progress",
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

export default profile
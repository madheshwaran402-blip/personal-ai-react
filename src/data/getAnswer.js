import profile from './profile'

function getAnswer(input) {
  const text = input.toLowerCase()

  if (text.includes("who") || text.includes("about") || text.includes("introduce") || text.includes("yourself"))
    return `${profile.personal.name} — ${profile.personal.bio} Based in ${profile.personal.location}.`
  else if (text.includes("education") || text.includes("college") || text.includes("degree") || text.includes("study"))
    return `${profile.education.degree} in ${profile.education.specialization}, currently in ${profile.education.year} at ${profile.education.location}.`
  else if (text.includes("hardware") || text.includes("vlsi") || text.includes("fpga") || text.includes("verilog"))
    return `Hardware & VLSI skills: ${profile.skills.hardware.join(", ")}.`
  else if (text.includes("programming") || text.includes("language") || text.includes("code"))
    return `Programming skills: ${profile.skills.programming.join(", ")}.`
  else if (text.includes("skill") || text.includes("tech") || text.includes("know"))
    return `Programming: ${profile.skills.programming.join(", ")}. Hardware: ${profile.skills.hardware.join(", ")}. Tools: ${profile.skills.tools.join(", ")}.`
  else if (text.includes("determinex") || text.includes("data stream")) {
    const p = profile.projects[0]
    return `${p.name} (${p.status}): ${p.description} ${p.achievement}.`
  }
  else if (text.includes("shoe") || text.includes("patent") || text.includes("esp32"))
    return `${profile.projects[1].name} (${profile.projects[1].status}): ${profile.projects[1].description}`
  else if (text.includes("water") || text.includes("tank") || text.includes("mqtt"))
    return `${profile.projects[2].name} (${profile.projects[2].status}): ${profile.projects[2].description}`
  else if (text.includes("project") || text.includes("built") || text.includes("made"))
    return `Key projects: ${profile.projects.map(p => `${p.name} (${p.status})`).join(", ")}. Ask about any specific one!`
  else if (text.includes("research") || text.includes("neuromorphic") || text.includes("snn"))
    return `Research interests: ${profile.research.interests.join(", ")}. Goal: ${profile.research.goal}.`
  else if (text.includes("goal") || text.includes("future") || text.includes("plan"))
    return `Primary goal: ${profile.goals.primary}. Long-term: ${profile.goals.longTerm.join(", ")}.`
  else if (text.includes("achievement") || text.includes("win") || text.includes("award") ||text.includes("ideathon")) {
    const a = profile.achievements[0]
    return `${a.title} at ${a.organizer}. Domain: ${a.domain}. Prize: ${a.prize}.`
  }
  else if (text.includes("startup") || text.includes("safety watch"))
    return `Startups: ${profile.startups.map(s => `${s.name} — ${s.focus}`).join(". ")}.`
  else if (text.includes("learning") || text.includes("currently"))
    return `Currently learning: ${profile.currentlyLearning.join(", ")}.`
  else if (text.includes("contact") || text.includes("email") || text.includes("github"))
    return `Email: ${profile.personal.email} | GitHub: ${profile.personal.github}`
  else
    return "Try asking about skills, projects (Determinex, Smart Shoe, Water Tank), research, goals, or achievements!"
}

export default getAnswer
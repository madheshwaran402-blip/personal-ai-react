import React from 'react'

function Hero() {
  return (
    <section className="hero">
      <p className="greeting">Hello, I'm</p>
      <h1>Madheshwaran</h1>
      <p className="tagline">VLSI Design Student · Hardware Innovator · Neuromorphic Enthusiast</p>
      <div className="hero-links">
        <a href="https://github.com/madheshwaran402-blip" target="_blank" rel="noreferrer" className="hero-btn">GitHub ↗️</a>
        <a href="mailto:madheshwaran402@gmail.com" className="hero-btn">Email ↗️</a>
        <a href="#chat" className="hero-btn primary">Chat with AI ↗️</a>
      </div>
    </section>
  )
}

export default Hero
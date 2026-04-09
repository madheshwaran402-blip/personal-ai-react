import React from 'react'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-photo">
          <img
            src="/photo.jpg"
            alt="Madheshwaran Maruthamuthu"
            loading="eager"
            decoding="async"
            width="140"
            height="140"
          />
        </div>
        <div className="hero-text">
          <p className="greeting">Hello, I'm</p>
          <h1>Madheshwaran</h1>
          <p className="tagline">
            VLSI Design Student · Hardware Innovator · Neuromorphic Enthusiast
          </p>
          <p className="hero-bio">
            Engineering student from Tamil Nadu building FPGA-based deterministic
            systems and neuromorphic-inspired hardware. Creator of Determinex —
            winner of IDEATHON 1.0.
          </p>
          <div className="hero-links">
            <a
              href="https://github.com/madheshwaran402-blip"
              target="_blank"
              rel="noreferrer"
              className="hero-btn"
            >
              GitHub ↗️
            </a>
            <a href="mailto:madheshwaran402@gmail.com" className="hero-btn">
              Email ↗️
            </a>
            <a href="#chat" className="hero-btn primary">
              Chat with my AI ↗️
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
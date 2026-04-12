import React from 'react'

function Hero() {
  return (
    <section
      className="hero"
      aria-label="Profile introduction"
    >
      <div className="hero-content">
        <div className="hero-photo">
          <img
            src="/photo.jpg"
            alt="Madheshwaran Maruthamuthu — VLSI Design Student and Hardware Innovator from Tamil Nadu India"
            loading="eager"
            decoding="async"
            width="140"
            height="140"
          />
        </div>
        <div className="hero-text">
          <p className="greeting" aria-hidden="true">Hello, I'm</p>
          <h1>Madheshwaran</h1>
          <p className="tagline">
            VLSI Design Student · Hardware Innovator · Neuromorphic Enthusiast
          </p>
          <p className="hero-bio">
            Engineering student from Tamil Nadu building FPGA-based deterministic
            systems and neuromorphic-inspired hardware. Creator of Determinex —
            winner of IDEATHON 1.0.
          </p>
          <nav
            aria-label="Social links and contact"
            className="hero-links"
          >
            <a
              href="https://github.com/madheshwaran402-blip"
              target="_blank"
              rel="noreferrer noopener"
              className="hero-btn"
              aria-label="View GitHub profile (opens in new tab)"
            >
              GitHub ↗️
            </a>
            <a
              href="mailto:madheshwaran402@gmail.com"
              className="hero-btn"
              aria-label="Send email to Madheshwaran"
            >
              Email ↗️
            </a>
            <a
              href="#chat"
              className="hero-btn primary"
              aria-label="Open AI chat assistant"
            >
              Chat with my AI ↗️
            </a>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Hero
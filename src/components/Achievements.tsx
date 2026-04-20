import React from 'react'

function Achievements() {
  return (
    <section
      className="section"
      id="achievements"
      aria-labelledby="achievements-heading"
    >
      <h2 id="achievements-heading">Achievements</h2>

      <article
        className="achievement-card"
        aria-label="IDEATHON 1.0 Winner achievement"
      >
        <div className="achievement-icon" aria-hidden="true">🥇</div>
        <div className="achievement-info">
          <h3>IDEATHON 1.0 Winner</h3>
          <p>PSNA College of Engineering & Technology — IT Dept</p>
          <p className="achievement-meta">
            <span>Team Determinex</span>
            <span aria-hidden="true"> · </span>
            <span>Industry Innovation & Infrastructure</span>
            <span aria-hidden="true"> · </span>
            <span>Medal + Cash Prize</span>
          </p>
        </div>
      </article>

      <div
        className="section-sub"
        aria-labelledby="startup-heading"
      >
        <h2 id="startup-heading">Startup Vision</h2>
        <div
          className="startup-grid"
          role="list"
          aria-label="Startup ventures"
        >
          <article
            className="startup-card"
            role="listitem"
            aria-label="Determinex startup"
          >
            <h4>Determinex</h4>
            <p>Data integrity and event-driven hardware systems</p>
          </article>
          <article
            className="startup-card"
            role="listitem"
            aria-label="Safety Watch Platform startup"
          >
            <h4>Safety Watch Platform</h4>
            <p>Offline wearable-to-wearable alert system</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Achievements
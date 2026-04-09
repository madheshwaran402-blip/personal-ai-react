import React from 'react'

function Achievements() {
  return (
    <section className="section" id="achievements">
      <h2>Achievements</h2>

      <div className="achievement-card">
        <div className="achievement-icon">🥇</div>
        <div className="achievement-info">
          <h3>IDEATHON 1.0 Winner</h3>
          <p>PSNA College of Engineering & Technology — IT Dept</p>
          <p className="achievement-meta">
            Team Determinex · Industry Innovation & Infrastructure · Medal + Cash Prize
          </p>
        </div>
      </div>

      <div className="section-sub">
        <h2>Startup Vision</h2>
        <div className="startup-grid">
          <div className="startup-card">
            <h4>Determinex</h4>
            <p>Data integrity and event-driven hardware systems</p>
          </div>
          <div className="startup-card">
            <h4>Safety Watch Platform</h4>
            <p>Offline wearable-to-wearable alert system — Hospital, Elder, Child, Couple</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
import React from 'react'
import profile from '../data/profile'

function Research() {
  return (
    <section className="section" id="research">
      <h2>Research Interests</h2>
      <div className="research-grid">
        {profile.research.interests.map((interest: string, i: number) => (
          <div key={i} className="research-card">
            <span className="research-icon">
              {i === 0 ? '🧠' : i === 1 ? '⚡' : i === 2 ? '🏥' : i === 3 ? '🛡️' : '🔌'}
            </span>
            <p>{interest}</p>
          </div>
        ))}
      </div>
      <div className="research-goal">
        <span className="goal-label">Long-term Goal</span>
        <p>{profile.research.goal}</p>
      </div>
    </section>
  )
}

export default Research
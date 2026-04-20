import React from 'react'
import profile from '../data/profile'

function Research() {
  return (
    <section
      className="section"
      id="research"
      aria-labelledby="research-heading"
    >
      <h2 id="research-heading">Research Interests</h2>

      <div
        className="research-grid"
        role="list"
        aria-label="Research interests"
      >
        {profile.research.interests.map((interest: string, i: number) => (
          <div
            key={i}
            className="research-card"
            role="listitem"
          >
            <span className="research-icon" aria-hidden="true">
              {i === 0 ? '🧠' : i === 1 ? '⚡' : i === 2 ? '🏥' : i === 3 ? '🛡️' : '🔌'}
            </span>
            <p>{interest}</p>
          </div>
        ))}
      </div>

      <div
        className="research-goal"
        aria-label="Research long-term goal"
      >
        <span
          className="goal-label"
          aria-hidden="true"
        >
          Long-term Goal
        </span>
        <p>{profile.research.goal}</p>
      </div>
    </section>
  )
}

export default Research
import React from 'react'
import profile from '../data/profile'

interface SkillGroupProps {
  title: string
  skills: string[]
}

function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <p className="skill-label">{title}</p>
      <div className="skills-grid">
        {skills.map((skill: string, i: number) => (
          <span key={i} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <h2>Technical Skills</h2>
      <SkillGroup title="Hardware & VLSI" skills={profile.skills.hardware} />
      <SkillGroup title="Programming" skills={profile.skills.programming} />
      <SkillGroup title="Tools & Platforms" skills={profile.skills.tools} />
    </section>
  )
}

export default Skills
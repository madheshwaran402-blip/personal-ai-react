import React from 'react'
import Hero from '../components/Hero'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Achievements from '../components/Achievements'
import GitHubStats from '../components/GitHubStats'

function HomePage() {
  return (
    <main className="app-main">
      <Hero />
      <GitHubStats />
      <Education />
      <Skills />
      <Projects />
      <Research />
      <Achievements />
    </main>
  )
}

export default HomePage
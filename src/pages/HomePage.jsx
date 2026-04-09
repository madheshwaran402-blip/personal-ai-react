import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Achievements from '../components/Achievements'
import Hero from '../components/Hero'

function HomePage() {
  return (
    <main className="app-main">
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Research />
      <Achievements />
    </main>
  )
}

export default HomePage
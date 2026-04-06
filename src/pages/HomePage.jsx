import { lazy, Suspense } from 'react'

const Hero = lazy(() => import('../components/Hero'))
const Education = lazy(() => import('../components/Education'))
const Skills = lazy(() => import('../components/Skills'))
const Projects = lazy(() => import('../components/Projects'))
const Research = lazy(() => import('../components/Research'))
const Achievements = lazy(() => import('../components/Achievements'))

function SectionSkeleton() {
  return (
    <div className="skeleton-section">
      <div className="skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  )
}

function HomePage() {
  return (
    <main className="app-main">
      <Suspense fallback={<SectionSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Research />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Achievements />
      </Suspense>
    </main>
  )
}

export default HomePage
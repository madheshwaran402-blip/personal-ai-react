import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import QueryStatus from './QueryStatus'

function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const location = useLocation()
  const isHome: boolean = location.pathname === '/'

  const recruiterMode = useAppStore(state => state.recruiterMode)
  const toggleRecruiterMode = useAppStore(state => state.toggleRecruiterMode)
  const visitorName = useAppStore(state => state.visitorName)

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`app-header ${scrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <div className="header-left">
        <Link
          to="/"
          className="logo-link"
          aria-label="Madheshwaran — Go to homepage"
        >
          <span className="logo" aria-hidden="true">
            M<span className="dot">.</span>
          </span>
        </Link>
        {visitorName && (
          <span className="visitor-greeting">Hi, {visitorName}!</span>
        )}
        <QueryStatus />
      </div>

      <nav aria-label="Main navigation">
        {isHome ? (
          <>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#research">Research</a>
            <a href="#chat">Chat</a>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/chat">Chat</Link>
          </>
        )}
        <button
          className={`nav-recruiter-btn ${recruiterMode ? 'active' : ''}`}
          onClick={toggleRecruiterMode}
          aria-pressed={recruiterMode}
          aria-label={recruiterMode ? 'Recruiter mode on' : 'Recruiter mode off'}
          title="Toggle recruiter mode"
        >
          {recruiterMode ? '👔 ON' : '👔'}
        </button>
      </nav>
    </header>
  )
}

export default Header
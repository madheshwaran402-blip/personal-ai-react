import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import QueryStatus from './QueryStatus'
import ScrollProgress from './ScrollProgress'

function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
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

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`app-header ${scrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <ScrollProgress />

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

      {/* Desktop nav */}
      <nav className="desktop-nav" aria-label="Main navigation">
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
            <Link to="/resume">Resume</Link>
            <Link to="/chat">Chat</Link>
          </>
        )}
        <button
          className={`nav-recruiter-btn ${recruiterMode ? 'active' : ''}`}
          onClick={toggleRecruiterMode}
          aria-pressed={recruiterMode}
          title="Toggle recruiter mode"
        >
          {recruiterMode ? '👔 ON' : '👔'}
        </button>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        type="button"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav>
            {isHome ? (
              <>
                <a href="#education" onClick={() => setMobileMenuOpen(false)}>Education</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                <a href="#research" onClick={() => setMobileMenuOpen(false)}>Research</a>
                <a href="#chat" onClick={() => setMobileMenuOpen(false)}>Chat</a>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>Resume</Link>
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>Chat</Link>
                <Link to="/status" onClick={() => setMobileMenuOpen(false)}>Status</Link>
              </>
            )}
            <button
              className={`mobile-recruiter-btn ${recruiterMode ? 'active' : ''}`}
              onClick={() => {
                toggleRecruiterMode()
                setMobileMenuOpen(false)
              }}
              aria-pressed={recruiterMode}
            >
              👔 Recruiter Mode {recruiterMode ? 'ON' : 'OFF'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
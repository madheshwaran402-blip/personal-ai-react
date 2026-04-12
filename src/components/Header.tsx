import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const location = useLocation()
  const isHome: boolean = location.pathname === '/'

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
      </div>

      <nav aria-label="Main navigation">
        {isHome ? (
          <>
            <a href="#education" aria-label="Go to Education section">Education</a>
            <a href="#skills" aria-label="Go to Skills section">Skills</a>
            <a href="#projects" aria-label="Go to Projects section">Projects</a>
            <a href="#research" aria-label="Go to Research section">Research</a>
            <a href="#chat" aria-label="Go to Chat section">Chat</a>
          </>
        ) : (
          <>
            <Link to="/" aria-label="Go to Home page">Home</Link>
            <Link to="/projects" aria-label="Go to Projects page">Projects</Link>
            <Link to="/chat" aria-label="Go to Chat page">Chat</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
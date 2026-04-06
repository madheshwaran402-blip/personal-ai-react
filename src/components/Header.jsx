import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { recruiterMode, toggleRecruiterMode, visitorName } = useAppContext()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <Link to="/" className="logo-link">
          <span className="logo">M<span className="dot">.</span></span>
        </Link>
        {visitorName && (
          <span className="visitor-greeting">Hi, {visitorName}!</span>
        )}
      </div>

      <nav>
        {isHome ? (
          // On home page — anchor links to sections
          <>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#research">Research</a>
            <a href="#chat">Chat</a>
          </>
        ) : (
          // On other pages — router links
          <>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/chat">Chat</Link>
          </>
        )}
        <button
          className={`nav-recruiter-btn ${recruiterMode ? 'active' : ''}`}
          onClick={toggleRecruiterMode}
          title="Toggle recruiter mode"
        >
          {recruiterMode ? '👔 ON' : '👔'}
        </button>
      </nav>
    </header>
  )
}

export default Header
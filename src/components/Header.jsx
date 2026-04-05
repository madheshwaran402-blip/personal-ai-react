import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { recruiterMode, toggleRecruiterMode, visitorName } = useAppContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <span className="logo">M<span className="dot">.</span></span>
        {visitorName && (
          <span className="visitor-greeting">
            Hi, {visitorName}!
          </span>
        )}
      </div>
      <nav>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#research">Research</a>
        <a href="#chat">Chat</a>
        <button
          className={`nav-recruiter-btn ${recruiterMode ? 'active' : ''}`}
          onClick={toggleRecruiterMode}
          title="Toggle recruiter mode"
        >
          {recruiterMode ? '👔 Recruiter ON' : '👔'}
        </button>
      </nav>
    </header>
  )
}

export default Header
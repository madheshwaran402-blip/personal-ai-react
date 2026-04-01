import React, { useState, useEffect } from 'react'

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <span className="logo">M<span className="dot">.</span></span>
      <nav>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#research">Research</a>
        <a href="#chat">Chat</a>
      </nav>
    </header>
  )
}

export default Header
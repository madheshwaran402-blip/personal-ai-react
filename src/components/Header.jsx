import React from 'react'

function Header() {
  return (
    <header className="app-header">
      <span className="logo">Madheshwaran<span className="dot">.</span></span>
      <nav>
        <a href="#chat">Chat</a>
        <a href="#projects">Projects</a>
      </nav>
    </header>
  )
}

export default Header
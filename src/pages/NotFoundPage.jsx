import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function NotFoundPage() {
  useEffect(() => {
    document.title = "404 | Madheshwaran"
  }, [])

  return (
    <div className="not-found">
      <div className="not-found-content">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p>This page doesn't exist. But my portfolio does.</p>
        <div className="not-found-links">
          <Link to="/" className="cta-btn">Go Home</Link>
          <Link to="/chat" className="cta-btn secondary">Chat with AI</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
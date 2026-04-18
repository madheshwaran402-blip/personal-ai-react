import React from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="scroll-progress-container"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Page scroll progress: ${progress}%`}
    >
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
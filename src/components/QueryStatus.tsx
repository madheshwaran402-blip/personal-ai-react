import React from 'react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

function QueryStatus() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  if (!isFetching && !isMutating) return null

  return (
    <div
      className="query-status"
      role="status"
      aria-live="polite"
      aria-label={isMutating ? "Sending message" : "Loading data"}
    >
      <div className="query-spinner" aria-hidden="true" />
      <span className="sr-only">
        {isMutating ? "Sending..." : "Loading..."}
      </span>
    </div>
  )
}

export default QueryStatus
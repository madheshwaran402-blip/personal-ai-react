import React, { useState } from 'react'

interface Layer {
  name: string
  color: string
  items: string[]
  description: string
}

const layers: Layer[] = [
  {
    name: "User Interface",
    color: "#00ff88",
    items: [
      "React 19 + TypeScript",
      "Vite 8 (130ms start)",
      "React Router (5 pages)",
      "Zustand (4 stores)",
      "React Query (server state)"
    ],
    description: "Frontend SPA deployed on Vercel. Handles all UI, state management, routing, and data fetching."
  },
  {
    name: "Communication Layer",
    color: "#4488ff",
    items: [
      "REST API (fetch)",
      "SSE Streaming",
      "Session ID tracking",
      "CORS handling",
      "Error boundaries"
    ],
    description: "Frontend talks to backend via REST for single responses and SSE for streaming. Session ID persisted in localStorage."
  },
  {
    name: "Flask Backend",
    color: "#ff8844",
    items: [
      "Python Flask v4.0",
      "Gunicorn (production)",
      "10 REST endpoints",
      "Request validation",
      "Error handling"
    ],
    description: "Lightweight Python backend. Receives requests, builds enhanced prompts, calls Ollama, streams responses back."
  },
  {
    name: "AI Pipeline",
    color: "#ff44aa",
    items: [
      "Query Preprocessor",
      "FAISS Vector Search",
      "Memory Retrieval",
      "Prompt Builder",
      "Ollama Llama 3.2"
    ],
    description: "RAG pipeline: preprocess query → search knowledge → retrieve memories → build prompt → generate response."
  },
  {
    name: "Data Layer",
    color: "#aa44ff",
    items: [
      "FAISS Index (35 chunks)",
      "SQLite Memory Store",
      "SentenceTransformers",
      "Embedding Cache",
      "Profile Knowledge Base"
    ],
    description: "Vector embeddings for semantic search. SQLite for conversation memory. All cached for performance."
  }
]

const dataFlow = [
  { step: "1", action: "User types or speaks question", layer: "UI" },
  { step: "2", action: "Session ID attached to request", layer: "UI" },
  { step: "3", action: "POST /chat/stream sent to Flask", layer: "HTTP" },
  { step: "4", action: "Query preprocessed and expanded", layer: "Backend" },
  { step: "5", action: "FAISS searches 35 knowledge chunks", layer: "RAG" },
  { step: "6", action: "SQLite searched for past memories", layer: "Memory" },
  { step: "7", action: "Enhanced prompt built with context", layer: "Backend" },
  { step: "8", action: "Ollama streams tokens back", layer: "AI" },
  { step: "9", action: "SSE sends words to frontend", layer: "HTTP" },
  { step: "10", action: "UI renders word by word", layer: "UI" },
  { step: "11", action: "Conversation saved to SQLite", layer: "Memory" }
]

function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <div className="architecture-diagram" aria-label="System architecture diagram">
      <h2 className="arch-title">System Architecture</h2>

      <div className="arch-layers">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`arch-layer ${activeLayer === i ? 'active' : ''}`}
            style={{ borderLeftColor: layer.color }}
            onClick={() => setActiveLayer(activeLayer === i ? null : i)}
            role="button"
            tabIndex={0}
            aria-expanded={activeLayer === i}
            aria-label={`${layer.name} layer — click to expand`}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveLayer(activeLayer === i ? null : i)
              }
            }}
          >
            <div className="arch-layer-header">
              <span
                className="arch-layer-dot"
                style={{ background: layer.color }}
                aria-hidden="true"
              />
              <h3
                className="arch-layer-name"
                style={{ color: layer.color }}
              >
                {layer.name}
              </h3>
              <span className="arch-layer-toggle" aria-hidden="true">
                {activeLayer === i ? '−' : '+'}
              </span>
            </div>

            <div className="arch-layer-items">
              {layer.items.map((item, j) => (
                <span key={j} className="arch-item">
                  {item}
                </span>
              ))}
            </div>

            {activeLayer === i && (
              <p className="arch-layer-description">
                {layer.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="arch-flow">
        <h3 className="arch-flow-title">Request Data Flow</h3>
        <div
          className="arch-flow-steps"
          role="list"
          aria-label="Data flow steps"
        >
          {dataFlow.map((item, i) => (
            <div
              key={i}
              className="arch-flow-step"
              role="listitem"
            >
              <span
                className="arch-flow-number"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <span className="arch-flow-action">{item.action}</span>
              <span className="arch-flow-layer">{item.layer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
# Madheshwaran's Personal AI Portfolio v4.0

Live: https://madheshwaran-ai.vercel.app

Built over 73 days of structured daily learning.
An AI-powered portfolio with RAG, Memory, and Voice.

## Quick Start

Terminal 1 — AI Model:
ollama serve

Terminal 2 — Backend:
cd personal-ai-backend
source venv/bin/activate
python app.py

Terminal 3 — Frontend:
cd personal-ai-react
npm run dev

Open: http://localhost:3000

## Upgrade to Claude API (30 minutes)

1. Get API key: console.anthropic.com
2. Add $5 credits
3. Update backend .env:
   ANTHROPIC_API_KEY=sk-ant-...
   MODEL=claude-haiku-4-5-20251001
4. Deploy to Render.com
5. Update frontend .env:
   VITE_BACKEND_URL=https://your-app.onrender.com

## Tech Stack

Frontend:
- React 19 + TypeScript + Vite 8
- Zustand (4 stores, persisted)
- React Query (server state)
- React Router (5 pages)
- Web Speech API (voice)

Backend:
- Python Flask v4.0
- Ollama + Llama 3.2
- FAISS vector search
- SQLite memory store
- SentenceTransformers
- Gunicorn (production)

## AI Architecture

User question
  → Query Preprocessor
  → FAISS Knowledge Search (35 chunks)
  → Memory Search (SQLite)
  → Enhanced prompt
  → Llama 3.2 via Ollama
  → Streaming response
  → Save to memory

## Features

AI Chat:
✅ Streaming word-by-word responses
✅ RAG retrieval augmented generation
✅ Memory across sessions (SQLite)
✅ Voice input (Web Speech API)
✅ Voice output (Speech Synthesis)
✅ Auto-speak mode
✅ Voice settings (rate, pitch, volume)
✅ Recruiter mode (formal tone)
✅ Chat history persistence
✅ Export chat as text
✅ Copy message to clipboard
✅ Undo clear chat
✅ Toast notifications
✅ Error boundaries

Portfolio:
✅ Live GitHub stats
✅ Scroll progress bar
✅ Analytics tracking
✅ System status page
✅ Mobile responsive
✅ Hamburger menu
✅ 100/100 SEO score
✅ 90+ Accessibility score

## Testing

npm run test:ci

Test Suites: 7
Tests: 115+
Types: Unit, Integration, Accessibility

## Build

npm run build

Chunks:
- vendor.js  — React + ReactDOM
- router.js  — React Router
- query.js   — TanStack Query
- state.js   — Zustand
- index.js   — App code

## Pages

/            — Portfolio home
/chat        — Full screen chat
/projects    — Detailed projects
/status      — System status
*            — 404

## Backend Endpoints

GET  /              — Server info
GET  /health        — All system status
POST /chat          — Single response
POST /chat/stream   — Streaming SSE
POST /search        — Semantic search
GET  /memory        — Memory stats
POST /memory/search — Search memories
GET  /memory/session/:id — Session history
GET  /models        — Available models

## Project Stats

Days building:    73
Tests passing:    115+
Components:       20+
Custom hooks:     15+
Zustand stores:   4
Pages:            5
Backend endpoints: 10
Knowledge chunks: 35
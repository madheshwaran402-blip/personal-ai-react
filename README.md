# Madheshwaran's Personal AI Portfolio

Live: https://madheshwaran-ai.vercel.app

AI-powered portfolio with RAG + Memory system.

## AI Architecture

User question
  → Query Preprocessor (expand + clean)
  → FAISS Knowledge Search (35 chunks, semantic)
  → Memory Search (SQLite, past conversations)
  → Enhanced prompt (profile + knowledge + memory)
  → Ollama Llama 3.2 (custom Modelfile)
  → Streaming response
  → Save to memory (SQLite)

## Tech Stack

Frontend: React 19, TypeScript, Vite 8, Zustand, React Query
Backend: Python Flask v4.0, Ollama, Llama 3.2
RAG: FAISS, SentenceTransformers, all-MiniLM-L6-v2
Memory: SQLite with semantic search
Testing: Jest + React Testing Library (110+ tests)
Deployment: Vercel (frontend), local Mac (backend)

## Features

Chat:
- Real AI streaming responses
- RAG — retrieves relevant knowledge before answering
- Memory — remembers past conversations
- Recruiter mode
- Chat history persistence
- Export chat
- Copy message
- Undo clear

Portfolio:
- Live GitHub stats
- Scroll progress bar
- Analytics tracking
- System status page
- Error boundaries
- Toast notifications
- Accessibility (90+ score)
- SEO (100/100)

## Running Locally

Terminal 1: ollama serve
Terminal 2: cd personal-ai-backend && source venv/bin/activate && python app.py
Terminal 3: cd personal-ai-react && npm run dev

## Testing

npm run test:ci

## Backend Endpoints

GET  /           — server info
GET  /health     — all system status
POST /chat       — single response
POST /chat/stream — streaming response
POST /search     — semantic search test
GET  /memory     — memory stats
POST /memory/search — search memories
GET  /memory/session/:id — session history
GET  /models     — available models

## Upgrade Path (for interviews)

1. Add $5 to console.anthropic.com
2. Change .env MODEL to claude-haiku-4-5-20251001
3. Deploy to Render.com
4. AI works 24/7 from anywhere
Time: 30 minutes

## About

Madheshwaran Maruthamuthu
B.E./B.Tech VLSI Design — Tamil Nadu
madheshwaran402@gmail.com
github.com/madheshwaran402-blip
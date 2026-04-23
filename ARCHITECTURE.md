# System Architecture — Madheshwaran Personal AI v4.0

## Overview

Full-stack AI portfolio with RAG and Memory.
Frontend on Vercel, Backend local, AI via Ollama.

## Architecture Layers

### Layer 1 — User Interface (React)
- React 19 + TypeScript + Vite 8
- 5 pages: Home, Chat, Projects, Resume, Status
- State: Zustand (4 stores) + React Query
- Voice: Web Speech API (browser built-in)
- Deploy: Vercel (auto-deploy on git push)

### Layer 2 — Communication
- REST API via fetch
- SSE (Server-Sent Events) for streaming
- Session ID in localStorage
- CORS configured for localhost + Vercel

### Layer 3 — Flask Backend
- Python Flask with gunicorn
- 10 REST endpoints
- Validates input, builds prompts
- Orchestrates RAG + Memory + Ollama

### Layer 4 — AI Pipeline
Query → Preprocess → FAISS → Memory → Prompt → Ollama → Stream

Step 1: Query Preprocessor
- Clean text (lowercase, remove punctuation)
- Expand with related terms
  "shoe" → "shoe smart shoe esp32 MPU6050"
- Extract keywords

Step 2: FAISS Knowledge Search
- Query encoded to 384-dim vector
- IndexFlatIP similarity search
- Top 3 chunks above 0.3 threshold
- Returns relevant knowledge text

Step 3: Memory Search
- Query encoded to vector
- Numpy dot product over stored conversations
- Top 2 relevant past conversations
- Excludes current session

Step 4: Prompt Assembly
System prompt = Profile + Knowledge + Memories + Tone

Step 5: Ollama Generation
- Model: madheshwaran-ai (custom Modelfile)
- Fallback: llama3.2
- Temperature: 0.65
- Max tokens: 250
- Streaming: true

Step 6: SSE Streaming
- Each token sent as SSE event
- Frontend renders word by word
- Conversation saved to SQLite on done

### Layer 5 — Data Layer
- FAISS index: 35 knowledge chunks, 384-dim
- SQLite: conversations table with embeddings
- SentenceTransformers: all-MiniLM-L6-v2
- Embedding cache: pickle file

## Data Flow Diagram

User
  │ types/speaks
  ▼
ChatInput Component
  │ onSend()
  ▼
useMessageOptimistic hook
  │ optimistic UI update
  │ sendMessageStreaming()
  ▼
api.ts (fetch)
  │ POST /chat/stream
  │ sessionId attached
  ▼
Flask Route /chat/stream
  │ validate input
  ▼
Query Preprocessor
  │ expand query
  ▼
FAISS Store.get_context()
  │ semantic search
  ▼
Memory Store.get_relevant_memories()
  │ past conversation search
  ▼
build_enhanced_prompt()
  │ profile + knowledge + memories
  ▼
Ollama API /api/chat
  │ stream=True
  ▼
SSE Generator
  │ yield each token
  ▼
Frontend SSE Reader
  │ onWord callback
  ▼
Message Component
  │ renders streaming
  ▼
SQLite
  │ save conversation
  ▼
Done

## Design Decisions

### Why FAISS over simple keyword search?
Semantic search finds meaning not keywords.
"What detects motion?" finds MPU6050 content
without the word "MPU6050" in the query.

### Why SQLite over PostgreSQL?
For a local portfolio: zero config, no server,
file-based, fast for small datasets.
Scale path: pg with pgvector when deploying.

### Why Zustand over Redux?
Zero boilerplate, works outside React,
selective subscriptions (no unnecessary re-renders),
built-in persist middleware.

### Why Vite over CRA?
CRA is unmaintained. Vite uses ES modules
for 130ms startup vs 30 seconds.
Native TypeScript support, better DX.

### Why SSE over WebSockets?
SSE is simpler for one-way streaming.
No need for bidirectional communication.
Works over standard HTTP, no upgrade needed.

## Upgrade Path

For 24/7 deployment (30 minutes):

1. Claude API
   - Add credits to console.anthropic.com
   - Change MODEL in .env
   - Modify app.py to use anthropic client

2. Render.com Backend
   - Create web service
   - Connect GitHub repo
   - Add environment variables
   - Deploy with gunicorn Procfile

3. Update Frontend
   - Change VITE_BACKEND_URL
   - Push to GitHub → Vercel auto-deploys

Cost: ~$12/month for interview period

## Performance

Frontend:
- Vite build: 5 chunks (vendor, router, query, state, index)
- Lazy loading: pages load on demand
- Bundle splitting: vendor cached long-term

Backend:
- FAISS search: <1ms for 35 chunks
- Embedding: cached on startup
- Memory search: <5ms for 100 conversations

## Security Notes

Current (local):
- No authentication needed (local only)
- CORS restricted to known origins
- Input length validation (1000 char max)

Production upgrades needed:
- Rate limiting per IP
- API key authentication
- HTTPS only
- Sanitize inputs
- Rotate secrets regularly
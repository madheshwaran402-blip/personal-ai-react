# Technical Presentation Guide

## 5-Minute Interview Presentation

---

### SLIDE 1 — What I Built
"A full-stack AI-powered personal portfolio
with RAG, Memory, and Voice interface.
Built over 74 days from HTML to production AI."

Key numbers:
- 74 days
- 115+ tests
- 3 GitHub repos
- 1 live deployment

---

### SLIDE 2 — The Problem I Solved
"Standard portfolios are static.
Recruiters read the same information
on every candidate's page.

My solution: An AI that knows everything
about me and can answer any question
conversationally, in real time."

---

### SLIDE 3 — Architecture Overview

Frontend (Vercel):
React 19 → TypeScript → Vite
Zustand → React Query → React Router

Backend (Local/Render):
Flask → Ollama → Llama 3.2

AI Pipeline:
Query → FAISS Search → Memory → Prompt → Response

---

### SLIDE 4 — RAG System
"The most technically interesting part."

Without RAG:
Generic answer from profile text

With RAG:
1. Query converted to vector embedding
2. FAISS searches 35 knowledge chunks
3. Most relevant chunks retrieved
4. Injected into prompt with context
5. AI gives specific accurate answer

Result: AI knows exact sensor names,
TRL levels, competition details

---

### SLIDE 5 — State Management
"I use three layers of state:"

1. Zustand — client state
   4 stores: App, Chat, UI, Analytics
   All persisted to localStorage

2. React Query — server state
   Health checks, GitHub API
   Automatic caching and refetch

3. SQLite — conversation memory
   Semantic search across past chats
   Session-based retrieval

---

### SLIDE 6 — Testing Strategy
"115+ tests across 7 suites:"

Unit tests:
- Helper functions (debounce, throttle, etc.)
- Answer engine keyword matching
- TypeScript type validation

Integration tests:
- All React components render
- User interactions work correctly
- Accessibility roles present

Result: Confident in every deployment

---

### SLIDE 7 — What I Would Do Differently
Shows self-reflection and growth:

1. Start with TypeScript from Day 1
   (Migrated on Day 29 — painful)

2. Use Vite from the beginning
   (Migrated from CRA on Day 42)

3. Plan state architecture upfront
   (Refactored Context → Zustand on Day 53)

Lesson: Architecture decisions matter early.

---

### SLIDE 8 — Upgrade Path
"When interviewing at a company:"

30-minute upgrade:
1. Add $5 Claude API credits
2. Switch MODEL to claude-haiku
3. Deploy Flask to Render.com
4. Update frontend VITE_BACKEND_URL
5. Push to GitHub → Vercel auto-deploys

Result: AI works 24/7 without my Mac.
Cost: ~$12/month for interview period.

---

## Elevator Pitches

### 30-second version:
"I built an AI-powered portfolio chatbot
from scratch over 74 days.
It uses RAG with FAISS vector search,
remembers past conversations in SQLite,
and has voice input and output.
Built with React, TypeScript, Python Flask,
and 115 automated tests.
Live at madheshwaran-ai.vercel.app —
you can chat with my AI right now."

### 10-second version:
"I built an AI that knows everything
about me. Visitors can ask it anything
about my projects, skills, or goals.
It's live — try it at madheshwaran-ai.vercel.app"

### For hardware companies:
"I'm primarily a hardware engineer —
Verilog, FPGA, VLSI design.
But I also built a full AI system
to demonstrate software capability.
I can work at any layer of the stack."

---

## Common Interview Questions

Q: Why did you build this?
A: "To learn full-stack development in a
   structured way, and to have something
   concrete to show recruiters beyond
   a static resume."

Q: What was the hardest part?
A: "The RAG system. Understanding how
   embeddings work, why FAISS is faster
   than numpy dot product, how to tune
   the similarity threshold — these took
   real debugging and experimentation."

Q: Why Zustand over Redux?
A: "Zustand has zero boilerplate, works
   outside React components, and has
   built-in persist middleware. For a
   project of this size Redux would be
   over-engineering."

Q: How would you scale this?
A: "Replace Ollama with Claude API,
   deploy Flask to Render with proper
   RAM, use Postgres instead of SQLite,
   add Redis for caching, and a CDN
   for static assets. The architecture
   already supports this — just swap
   the infrastructure."

Q: Why TypeScript?
A: "TypeScript caught real bugs during
   development — wrong prop types,
   missing fields in interfaces. The
   compiler is a free code reviewer.
   After migrating from JavaScript I
   would never go back."
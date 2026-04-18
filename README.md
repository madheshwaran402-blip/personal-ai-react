# Madheshwaran's Personal AI Portfolio

Live at: https://madheshwaran-ai.vercel.app

A full-stack AI-powered portfolio with a personal chatbot
that knows everything about Madheshwaran Maruthamuthu —
VLSI Design student, hardware innovator, and creator of Determinex.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite 8 (130ms startup)
- Zustand (state management)
- React Query (server state)
- React Router (navigation)
- Framer Motion (animations)

**Backend**
- Python Flask
- Ollama + Llama 3.2
- Streaming responses (SSE)

**Testing**
- Jest + React Testing Library
- 110+ tests passing

**Deployment**
- Vercel (frontend)
- Local Mac (backend)

## Features

- Real AI chat powered by Llama 3.2
- Streaming word-by-word responses
- Recruiter mode (formal tone)
- Chat history persistence
- Export chat as text file
- Copy message to clipboard
- Undo clear chat
- Toast notifications
- Error boundaries
- Scroll progress bar
- GitHub stats (live API)
- Analytics tracking
- Multiple pages (Home, Chat, Projects, 404)
- 100/100 SEO score
- 90+ Accessibility score
- Bundle splitting + Gzip compression

## State Architecture

- AppStore — user preferences (Zustand + persist)
- ChatStore — messages and chat state (Zustand + persist)
- UIStore — UI state like scroll progress (Zustand)
- AnalyticsStore — usage tracking (Zustand + persist)
- React Query — server state (health check, GitHub API)

## Running Locally

Terminal 1 — Start Ollama:
ollama serve

Terminal 2 — Start Flask backend:
cd personal-ai-backend
source venv/bin/activate
python app.py

Terminal 3 — Start React frontend:
cd personal-ai-react
npm run dev

Open http://localhost:3000

## Running Tests

npm run test:ci

## Building for Production

npm run build

## Project Structure

src/
  components/   — React components
  pages/        — Route pages
  hooks/        — Custom hooks
  stores/       — Zustand stores
  context/      — AppContext (Zustand wrapper)
  services/     — API calls
  utils/        — Helper functions
  data/         — Profile data and types
  __tests__/    — All test files

## About Madheshwaran

B.E./B.Tech VLSI Design & Technology student from Tamil Nadu, India.
Building FPGA-based deterministic systems and neuromorphic hardware.
Creator of Determinex — winner of IDEATHON 1.0.

GitHub: github.com/madheshwaran402-blip
Email: madheshwaran402@gmail.com

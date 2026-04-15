# Performance Report — Personal AI Portfolio

## Build Tool Comparison

| Metric | CRA (Before) | Vite (After) | Improvement |
|--------|-------------|--------------|-------------|
| Dev start time | ~20 seconds | ~130ms | 150x faster |
| JS bundle size | 257KB (single) | Split chunks | Better caching |
| Hot reload | 2-5 seconds | Instant | Much better DX |
| Build tool | Webpack (legacy) | Vite 8 (modern) | — |

## Bundle Chunks (Vite)
- vendor.js — React + ReactDOM (cached long-term)
- router.js — React Router (cached long-term)  
- index.js — App code (updates with each deploy)

## Lighthouse Scores (Live — madheshwaran-ai.vercel.app)
- Performance: 58/100
- Accessibility: 90/100
- Best Practices: 100/100
- SEO: 100/100

## Test Coverage
- Test Suites: 4 passing
- Total Tests: 93+ passing
- Unit Tests: helpers, getAnswer, types
- Integration Tests: all components

## Tech Stack
- Frontend: React 19 + TypeScript + Vite 8
- Backend: Python Flask + Ollama Llama 3.2
- Deployment: Vercel
- Testing: Jest + React Testing Library
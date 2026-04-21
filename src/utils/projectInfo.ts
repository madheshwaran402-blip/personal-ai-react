export const PROJECT_INFO = {
  name: "Madheshwaran Personal AI Portfolio",
  version: "4.0.0",
  author: "Madheshwaran Maruthamuthu",
  email: "madheshwaran402@gmail.com",
  github: "github.com/madheshwaran402-blip",
  portfolio: "madheshwaran-ai.vercel.app",

  tech: {
    frontend: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "Zustand",
      "React Query",
      "React Router"
    ],
    backend: [
      "Python Flask",
      "Ollama",
      "Llama 3.2",
      "FAISS",
      "SQLite",
      "SentenceTransformers"
    ],
    testing: [
      "Jest",
      "React Testing Library",
      "Accessibility tests"
    ],
    deployment: [
      "Vercel (frontend)",
      "Local Mac (backend)"
    ]
  },

  features: {
    ai: [
      "Streaming responses",
      "RAG knowledge retrieval",
      "Memory across sessions",
      "Voice input",
      "Voice output",
      "Recruiter mode"
    ],
    portfolio: [
      "Live GitHub stats",
      "Scroll progress bar",
      "Analytics tracking",
      "System status page",
      "Error boundaries",
      "Toast notifications"
    ],
    quality: [
      "115+ tests passing",
      "TypeScript throughout",
      "90+ accessibility score",
      "100/100 SEO score",
      "Mobile responsive",
      "Keyboard navigable"
    ]
  },

  stats: {
    daysBuilding: 73,
    testsPassing: 115,
    components: 20,
    customHooks: 15,
    zustandStores: 4,
    pages: 5,
    backendEndpoints: 10
  }
} as const
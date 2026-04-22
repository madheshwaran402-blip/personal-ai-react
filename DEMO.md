# Demo Script — Madheshwaran Personal AI Portfolio

## Video Demo (3 minutes)

---

### INTRO (0:00 - 0:20)
"Hi, I'm Madheshwaran — VLSI Design student from Tamil Nadu.
Over 74 days I built a full-stack AI portfolio from scratch.
Let me show you what it can do."

---

### PORTFOLIO TOUR (0:20 - 0:45)
Open: madheshwaran-ai.vercel.app

Point out:
- Hero section with profile
- Education — VLSI Design, 2nd year
- Skills — hardware and programming
- Projects — Determinex, Smart Shoe, Water Tank
- Research — Neuromorphic Computing
- Achievements — IDEATHON 1.0 Winner

---

### VOICE DEMO (0:45 - 1:15)
"The AI has voice input. Watch this."

Click microphone button.
SAY: "What is Determinex?"

Watch:
- Interim transcript appears live
- Text fills input automatically
- Send message
- AI streams response word by word
- Hover over response
- Click speaker button to hear it read aloud

"I spoke the question. The AI answered.
I can hear the response. All in the browser."

---

### CHAT DEMO (1:15 - 1:50)
Type: "What sensors are in the Smart Shoe?"

"Notice how specific the answer is.
This is because of RAG —
Retrieval Augmented Generation.
Before answering, the AI searches
35 knowledge chunks using FAISS
vector similarity search.
It finds the exact information
then gives a precise answer."

Type: "What are your research interests?"

Show the neuromorphic answer.

"The AI knows about my research in
Spiking Neural Networks and
neuromorphic computing."

---

### RECRUITER MODE (1:50 - 2:10)
Click Recruiter button — turns ON.

Type: "Why should we hire Madheshwaran?"

"Recruiter mode switches to formal tone
and highlights technical achievements."

---

### STATUS PAGE (2:10 - 2:30)
Navigate to /status

"This status page shows all systems live.
Frontend on Vercel — always online.
Backend Flask with RAG and Memory.
GitHub API fetching live repo stats."

---

### TECH STACK (2:30 - 2:50)
"Under the hood:
React 19 with TypeScript
Vite — 130ms startup vs 30 seconds with CRA
Zustand for state — 4 stores, all persisted
React Query for server state
115 automated tests across 7 suites
Python Flask backend
FAISS vector search
SQLite memory database"

---

### CLOSE (2:50 - 3:00)
"74 days. 148 hours.
Built understanding every line.
Live at madheshwaran-ai.vercel.app"

---

## Live Demo Checklist

Before showing anyone:
- [ ] ollama serve is running
- [ ] python app.py is running
- [ ] localhost:3000 loads
- [ ] Chat shows Online status
- [ ] Voice works in Chrome
- [ ] All 4 pages load correctly
- [ ] Recruiter mode toggles

Emergency backup:
If backend is down → show vercel.app
Frontend still shows portfolio
Chat shows offline message (expected)
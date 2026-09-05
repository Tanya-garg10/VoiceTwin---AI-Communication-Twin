
# Architecture
Frontend: Vite React TS + Tailwind + Framer Motion + Zustand (local demo) + Recharts.
Backend: Express TS, JWT auth, /api/voice/token for Agora, /api/voice/respond for LLM.
Voice: Primary Web Speech API (SpeechRecognition + SpeechSynthesis) for zero-config demo. Agora SDK hook ready: backend generates token if AGORA_APP_ID present, frontend can swap to agora-rtc-sdk-ng.
AI: Prompt system in frontend/lib/aiEngine + backend /respond that proxies to OpenAI if AI_API_KEY set, else fallback with adaptive question bank.
Persistence: localStorage in demo (vt_* keys). Production uses Postgres schema in /database/schema.sql.
Flow: Landing → Auth → Onboarding → Twin Studio → New Session (scenario + context + pre-brief) → VoiceSession (Orb states, live metrics, transcript) → Report (Mirror, Replay, adaptive insights) → Dashboard DNA.

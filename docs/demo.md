
Demo Mode: Works without any credentials.
1. Open frontend, auth with demo@voicetwin.ai / any password
2. Onboarding stores in localStorage
3. VoiceSession uses browser SpeechRecognition; if unsupported, type answers
4. Feedback generated via rule-based analyzer (filler detection, clarity)
5. Set VITE_DEMO_MODE=true to show banner
Live Mode: Set .env AGORA_APP_ID, AGORA_APP_CERTIFICATE, AI_API_KEY
Then /api/voice/token returns real token, /respond proxies to LLM.

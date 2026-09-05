# VoiceTwin - AI Communication Twin

VoiceTwin is a React and Node.js application for practicing interviews, presentations, negotiations, sales conversations, and other difficult conversations with an AI communication twin. It includes a browser-based demo mode with speech recognition, speech synthesis, rule-based coaching estimates, session reports, and a configurable twin profile.

## Features

- Scenario setup for HR, technical, presentation, sales, negotiation, public speaking, and custom practice.
- Twin Studio controls for personality, conversation style, coaching, and difficulty.
- Voice session experience with transcript, waveform, browser speech input, and text-to-speech output.
- Rule-based estimates for filler words, pace, clarity, confidence, and engagement.
- Pressure Mode, adaptive question depth, pre-conversation briefs, Communication Mirror, and Smart Replay views.
- Dashboard, session history, Communication DNA charts, settings, and reset/delete demo data controls.
- Express API for authentication, twin configuration, sessions, health checks, voice token responses, and AI responses.
- PostgreSQL schema and seed SQL are included for future persistence work.

## How It Works

The frontend runs as a Vite single-page application. Its demo experience stores state locally and uses browser speech APIs when available. The backend is a separate Express service. It currently keeps users, sessions, and twin configuration in memory, returns demo responses when optional integrations are not configured, and exposes an Agora token endpoint whose production token generation is still a placeholder.

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts, Zustand, and React Router.
- Backend: Node.js, Express, TypeScript, CORS, dotenv, JWT, bcryptjs, Zod, and `agora-access-token`.
- Voice: browser Web Speech API and speech synthesis in demo mode; Agora configuration is environment-gated.
- Data: in-memory backend stores today, with PostgreSQL schema and seed files under `database/`.

## Architecture

```text
Browser
  |-- frontend/  React/Vite UI, local demo state, speech APIs
  |-- backend/   Express REST API on port 4000
  |       |-- /api/health
  |       |-- /api/auth
  |       |-- /api/twin
  |       |-- /api/sessions
  |       `-- /api/voice
  `-- database/  PostgreSQL schema and seed SQL (not wired into the server yet)
```

## Project Structure

```text
backend/src/index.ts       Express entry point
backend/src/routes/         Auth, twin, sessions, and voice routes
frontend/src/main.tsx       Frontend entry point
frontend/src/App.tsx        Client routing and application shell
frontend/src/pages/         Product screens
frontend/src/lib/           Demo state and AI/coaching helpers
database/                   PostgreSQL schema and seed SQL
docs/                       AI, API, architecture, database, demo, and voice notes
```

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A browser with Web Speech API support for voice input; typing remains available as a fallback

## Installation

```bash
git clone https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin.git
cd VoiceTwin---AI-Communication-Twin
npm install
```

Copy `.env.example` to `.env` only when running the backend with local configuration:

```bash
copy .env.example .env
```

On macOS/Linux, use `cp .env.example .env` instead. Keep `.env` local and never commit it.

## Run Locally

Start the frontend in one terminal:

```bash
npm run dev:frontend
```

Open http://localhost:5173. To run the backend API in a second terminal:

```bash
npm run dev:backend
```

The backend listens on http://localhost:4000. Both services can also be started from their directories with `npm run dev`.

For a production build:

```bash
npm run build
npm run start:backend
```

## Environment Variables

See `.env.example` for placeholders. `AUTH_SECRET` should be a long random value for stable JWTs. `AI_API_KEY`, `AI_MODEL`, `AGORA_APP_ID`, and `AGORA_APP_CERTIFICATE` enable integration paths, but the current AI proxy and Agora token generation are intentionally incomplete. `PORT`, `FRONTEND_URL`, and frontend `VITE_*` values control local service configuration.

## API Summary

The backend exposes:

- `GET /api/health`
- `POST /api/auth/signup` and `POST /api/auth/login`
- `GET/PUT /api/twin`
- `GET/POST /api/sessions`, `GET /api/sessions/:id`, and `POST /api/sessions/:id/end`
- `POST /api/voice/token` and `POST /api/voice/respond`

Detailed notes are in `docs/api.md`.

## Example Usage

1. Open the frontend and continue through authentication in demo mode.
2. Complete onboarding and configure the twin in Twin Studio.
3. Choose a scenario, start a voice session, and allow microphone access if supported.
4. Review the transcript, coaching estimates, and post-session report.

## Limitations

- Backend data is in memory and is lost when the process restarts.
- The PostgreSQL schema is not connected to the Express service.
- AI responses are demo fallbacks unless an integration is implemented and configured.
- Agora token generation currently returns a placeholder in the live branch.
- Browser speech recognition support varies by browser and operating system.
- Authentication is a demo implementation and is not ready for production use.

## Future Improvements

- Connect the backend to PostgreSQL and add migrations.
- Implement a real OpenAI-compatible client with request validation and provider error handling.
- Complete Agora token generation and live voice integration.
- Add automated frontend and backend tests, rate limiting, durable authentication, and production observability.

## License

No license has been selected for this repository yet. Until a license file is added, all rights are reserved by the copyright holder.

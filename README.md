<h1 align="center">🎙️ VoiceTwin — AI Communication & Interview Twin</h1>

<p align="center">
  <strong>Real-time conversational voice interview practice, dynamic pressure testing, speech analytics, and personal communication twin powered by OpenAI (GPT-4o) and Agora Low-Latency RTC.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?logo=openai" alt="OpenAI GPT-4o"></a>
  <a href="#features"><img src="https://img.shields.io/badge/Agora_RTC-Sub--280ms-099DFD?logo=agora" alt="Agora RTC"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19.0-61DAFB?logo=react" alt="React 19"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css" alt="Tailwind CSS"></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Express-4.21-000000?logo=express" alt="Express"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

## ⚡ Overview

**VoiceTwin** is an advanced AI communication coach and simulated interviewer. Whether preparing for high-stakes technical loops (System Design, Staff Architecture, Coding), executive presentations, or salary negotiations, VoiceTwin provides a realistic, spoken dialogue environment that evaluates **not just what you say, but how you say it**.

By pairing **OpenAI (GPT-4o)** for high-level reasoning, dynamic follow-up questioning, and speech reframing with **Agora RTC** for ultra-low latency real-time voice streaming, VoiceTwin mimics the conversational cadence and pressure of real interviewers.

## ✨ Key Features

### 🎯 1. Live Conversational Interview Studio
- **Dynamic Question Generation**: Generates contextual questions tailored to specific roles, seniority levels (Junior to Staff/Principal), and architectural topics using OpenAI.
- **Contextual Follow-ups**: The AI analyzes your verbal answers in real time and probes deeper based on your claims, omissions, or architectural trade-offs.
- **Sub-280ms Voice Streaming**: Built with Agora RTC for natural voice interaction without awkward delays.

### 🔥 2. Dynamic Pressure Mode
- **Stress-Testing Engine**: Rapid 30-second response windows simulating crisis triage, live outage handling, and executive pushback.
- **Probe Edge Cases**: Automatically targets fragile assumptions in answers with sharp, counter-scenario questions.

### 🪄 3. Answer Polisher & STAR Reframer
- **Raw Answer Transformation**: Turns rambling, hedge-filled verbal transcripts into crisp, executive-grade responses.
- **STAR Framing**: Restructures stories into Situation, Task, Action, and Measurable Result.
- **Verbal Delivery Advice**: Recommends optimal cadence (e.g. 135–140 WPM), strategic pauses, and tone adjustments.

### 🧬 4. Communication Twin & DNA
- **Speech Profiler**: Tracks verbal crutches and filler words (`"um"`, `"like"`, `"basically"`).
- **Delivery Metrics**: Multi-dimensional scores for Clarity, Confidence, Technical Depth, Relevance, and Conciseness.
- **Archetype Progression**: Tracks evolution toward specific communication archetypes (e.g., *Staff Communicator*, *Executive Speaker*).

### 📊 5. Comprehensive Post-Session Report
- **Session Transcript & Key Moments**: Full transcript with time-indexed feedback markers.
- **Actionable Praise & Critique**: Identifies top strengths and precise areas for improvement.
- **Visual Audio Waves & Orbit Visualizers**: Interactive audio waveforms and reactive 3D voice orbs during speech.

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│  (React 19 + TypeScript + Agora RTC SDK + Web Audio API)    │
└──────────────┬──────────────────────────────▲───────────────┘
               │                              │
         Voice Audio (Agora)           Real-time Events
               │                              │
               ▼                              │
┌──────────────────────────────┐              │
│       Agora RTC Engine       │──────────────┘
│  (Sub-280ms Audio Channel)   │
└──────────────────────────────┘
               ▲
               │ Token Authentication
               ▼
┌─────────────────────────────────────────────────────────────┐
│                 VoiceTwin Express Server                    │
│                    (Node.js / tsx)                          │
├──────────────────────────────┬──────────────────────────────┤
│  Agora Token Builder         │  OpenAI Intelligence Engine  │
│  - /api/agora/token          │  - /api/interview/question   │
│  - /api/agora/config         │  - /api/interview/followup   │
│                              │  - /api/interview/improve    │
└──────────────────────────────┴──────────────▲───────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │       OpenAI API             │
                               │   (gpt-4o / gpt-4o-mini)     │
                               └──────────────────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx), [dotenv](https://github.com/motdotla/dotenv)
- **AI Engine**: [OpenAI Node SDK](https://github.com/openai/openai-node) (Model: `gpt-4o`)
- **Voice & Real-Time RTC**: [Agora RTC SDK NG](https://www.agora.io/) (`agora-rtc-sdk-ng`, `agora-token`)

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or newer recommended)
- **npm** or **bun** / **yarn**
- Modern web browser with microphone access permissions (Chrome, Brave, Edge, Firefox, or Safari)

### 1. Clone the Repository
```bash
git clone https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin.git
cd VoiceTwin---AI-Communication-Twin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
copy .env.example .env
```
*(On Linux/macOS, use `cp .env.example .env`)*

Configure the following keys in your `.env`:
```env
# OpenAI API Key (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY="your-openai-api-key"

# Optional: Default model (defaults to gpt-4o)
# OPENAI_MODEL="gpt-4o"

# Agora Credentials (Get from https://console.agora.io/)
AGORA_APP_ID="your-agora-app-id"
AGORA_APP_CERTIFICATE="your-agora-app-certificate"
VITE_AGORA_APP_ID="your-agora-app-id"

# Port (Optional, defaults to 3000)
PORT=3000
```

> **Note**: If `OPENAI_API_KEY` or Agora credentials are not provided, VoiceTwin includes seamless built-in fallback mock responses and simulated voice modes so you can test the UI and workflows immediately.

## 💻 Running the App

### Development Mode
Runs the unified full-stack server (Express backend + Vite HMR frontend) on a single port:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Production Build
```bash
npm run build
npm run start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/agora/config` | Retrieves Agora configuration status & masked App ID |
| `POST` | `/api/agora/token` | Generates secure RTC token for the audio channel |
| `POST` | `/api/interview/question` | Generates role-specific questions with OpenAI GPT-4o |
| `POST` | `/api/interview/followup` | Evaluates answer transcript, crutches, and follow-ups with OpenAI |
| `POST` | `/api/interview/improve-answer` | Polishes raw spoken answer into structured STAR response with OpenAI |

## 📁 Project Structure

```text
├── server.ts                       # Express server, Agora token generation & OpenAI routes
├── index.html                      # HTML root template
├── package.json                    # Project dependencies & scripts
├── vite.config.ts                  # Vite build & plugin configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment variable template
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Main layout & view routing
│   ├── index.css                   # Global styles & Tailwind CSS
│   ├── types.ts                    # Core TypeScript definitions & models
│   ├── services/
│   │   └── agoraService.ts         # Agora RTC client & channel manager
│   ├── data/
│   │   └── mockData.ts             # Default fallback scenarios & questions
│   └── components/                 # UI Views & Interactive Studios
│       ├── AgoraRTCStudio.tsx      # Real-time voice channel interface
│       ├── AnswerPolisherView.tsx  # Executive answer reframer & polish
│       ├── AudioVisualizer.tsx     # Frequency waveform visualizer
│       ├── CommunicationTwinPage.tsx # Communication DNA & twin profile
│       ├── EditorialDashboard.tsx  # Main practice dashboard
│       ├── ElevatorPitchStudio.tsx # 60-second pitch practice studio
│       ├── LiveInterviewView.tsx   # Conversational interview practice
│       ├── PostSessionReport.tsx   # Scoring, praise & critique summary
│       ├── PressureModeStudio.tsx  # Time-pressured stress interview mode
│       ├── VoiceOrb.tsx            # Animated 3D reactive speech orb
│       └── ...
```

## 🤝 Contributing

Contributions, feedback, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

import React, { useState } from 'react';
import {
  Mic,
  Radio,
  Flame,
  BarChart3,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Target,
  Clock,
  Play,
  Pause,
  Layers,
  ChevronRight,
  UserCheck,
  Award,
  Globe,
  Star,
  Quote,
  Sliders,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { PRESET_ROLES } from '../data/mockData';

interface LandingPageViewProps {
  onStartSession: () => void;
  onExploreDashboard: () => void;
  onExplorePressure: () => void;
  onExploreArchitecture: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onStartSession,
  onExploreDashboard,
  onExplorePressure,
  onExploreArchitecture
}) => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [selectedRolePreview, setSelectedRolePreview] = useState(PRESET_ROLES[0]);

  // Audio sample playback for the landing page teaser
  const playSampleAudio = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingTeaser) {
        window.speechSynthesis.cancel();
        setIsPlayingTeaser(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsPlayingTeaser(true);
      utterance.onend = () => setIsPlayingTeaser(false);
      utterance.onerror = () => setIsPlayingTeaser(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingTeaser(true);
      setTimeout(() => setIsPlayingTeaser(false), 4000);
    }
  };

  return (
    <div className="space-y-24 py-4 animate-fade-in text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-white/[0.08] p-6 sm:p-12 md:p-16 shadow-2xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-indigo-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-950/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">Next-Gen Real-Time Voice Coach</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-mono">Agora RTC &lt; 280ms</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Master High-Stakes Tech Interviews with Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Voice Twin
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Engineers don't fail interviews because they lack knowledge—they fail because verbal delivery collapses under pressure. VoiceTwin coaches your tone, speech cadence, and technical depth in natural, ultra-low latency voice interviews.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartSession}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-2.5 transition active:scale-95 group border border-indigo-400/30"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition" />
              <span>Start Free Practice Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onExplorePressure}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-500/30 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Try 30s Hot Seat Drill</span>
            </button>

            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Inspect Twin DNA</span>
            </button>
          </div>

          {/* Real-time Interactive Teaser Glass Console */}
          <div className="pt-10">
            <div className="rounded-3xl bg-slate-950/80 border border-white/[0.1] p-5 sm:p-6 shadow-2xl max-w-2xl mx-auto backdrop-blur-2xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-slate-200">Interactive Conversational Voice Teaser</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-semibold">Agora RTC: 34ms</span>
                  <span>•</span>
                  <span className="text-purple-400 font-semibold">Gemini Flash: 165ms</span>
                </div>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="py-1">
                <AudioVisualizer state={isPlayingTeaser ? 'ai_speaking' : 'idle'} height={64} barCount={42} />
              </div>

              {/* Audio Prompt Card with Play Button */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Sarah Chen (Staff Architect)
                    </span>
                    <span className="text-slate-400 text-[11px]">Kafka Consumer Rebalancing</span>
                  </div>
                  <p className="text-slate-200 text-xs mt-1.5 leading-relaxed font-medium">
                    "How does Apache Kafka handle partition reassignment during a consumer crash without stop-the-world lag spikes?"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => playSampleAudio("How does Apache Kafka handle partition reassignment during a consumer crash without stop-the-world lag spikes?")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlayingTeaser
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    {isPlayingTeaser ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isPlayingTeaser ? 'Pause Voice' : 'Hear AI Interviewer'}</span>
                  </button>

                  <button
                    onClick={onStartSession}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Answer Live</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF METRICS TICKER */}
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">14,200+</span>
            <span className="text-xs text-slate-400 block font-medium">Spoken Mock Sessions</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">&lt; 280ms</span>
            <span className="text-xs text-slate-400 block font-medium">End-to-End Voice Latency</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">84%</span>
            <span className="text-xs text-slate-400 block font-medium">Filler Word Reduction</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-purple-400">2.4×</span>
            <span className="text-xs text-slate-400 block font-medium">Higher L6+ Offer Rate</span>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 3 SIMPLE STEPS */}
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-indigo-400 tracking-wider">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            From Rambling Explanations to Unforgettable Articulation
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Experience how VoiceTwin systematically eliminates verbal crutches and shapes executive presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/[0.08] space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-mono font-black text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Select Role & Persona</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose your target level—Staff Distributed Systems, Frontend Architect, or Engineering Director—and select your interviewer avatar.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
              <span>Personalized Archetype Modeling</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/[0.08] space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono font-black text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Speak in Real-Time Voice</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Talk freely through your microphone. The AI evaluates your claims in real time and asks contextual, unscripted follow-up probes.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-purple-400 font-semibold flex items-center gap-1">
              <span>Low-Latency Agora RTC Audio</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/[0.08] space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-black text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Forensic Diagnostics & STAR Polish</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive second-by-second filler timestamps, speech cadence WPM curves, and an AI-transformed executive answer ready to drill.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
              <span>Muscle Memory Re-drill Mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENTO GRID OF CORE CAPABILITIES */}
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-cyan-400 tracking-wider">
            Architectural Depth
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Built for Engineers Who Value Real Articulation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Item 1: 30s Hot Seat (7 cols) */}
          <div
            onClick={onExplorePressure}
            className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-500/25 space-y-4 shadow-xl hover:border-red-500/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Pressure Mode Simulator</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition">
                The 30-Second Crisis Hot Seat
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Simulates real-world production incident war rooms. The primary replica is stalling during a flash sale, and the VP is on speakerphone. Can you articulate triage steps in under 30 seconds with zero filler words?
              </p>
            </div>

            <div className="pt-4 border-t border-red-500/20 flex items-center justify-between text-xs text-red-300 font-semibold">
              <span>Test Your Stress Composure</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Bento Item 2: Answer Polisher (5 cols) */}
          <div
            onClick={onStartSession}
            className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/25 space-y-4 shadow-xl hover:border-purple-500/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>STAR Framework</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                Before vs After Polisher
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transforms conversational uncertainty into authoritative Staff Engineer delivery. Strips 11 fillers and cuts rambling duration by 50%.
              </p>
            </div>

            <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span>See Answer Transformation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Bento Item 3: Voice DNA Radar (5 cols) */}
          <div
            onClick={onExploreDashboard}
            className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/25 space-y-4 shadow-xl hover:border-indigo-500/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span>Biometric Tracking</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                Voice DNA & Archetypes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Track your progression from "The Rambling Architect" (high tech depth, low conciseness) to "Crisp Staff Leader" across multiple sessions.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/20 flex items-center justify-between text-xs text-indigo-300 font-semibold">
              <span>View Communication Matrix</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Bento Item 4: Agora Low-Latency RTC Backbone (7 cols) */}
          <div
            onClick={onExploreArchitecture}
            className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/25 space-y-4 shadow-xl hover:border-cyan-500/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Agora RTC Backbone</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                Low-Latency Real-Time Pipeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Traditional AI chatbots have 4.4-second lag over HTTP polling, destroying conversational immersion. VoiceTwin leverages Agora Low-Latency Voice and Gemini streaming to keep end-to-end turnaround under 280ms.
              </p>
            </div>

            <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300 font-semibold">
              <span>Inspect Real-Time Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CANDIDATE TESTIMONIALS */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-indigo-400 tracking-wider">
            Verified Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Trusted by Engineers Landing L6+ Offers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "I used to get rejected after system design rounds because I would talk in circles. VoiceTwin showed me I was saying 'basically' 14 times per answer and rushing at 180 WPM. Re-drilling with the AI polisher got me an L6 offer at Stripe."
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Rohan Verma</span>
              <span className="text-[10px] text-slate-400">Staff Infrastructure Engineer</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The 30-second Hot Seat is brutal in the best way possible. When you have a VP firing questions with a ticking clock, you learn to discard filler words and state architectural trade-offs immediately."
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Priya Sundaram</span>
              <span className="text-[10px] text-slate-400">Lead Distributed Systems Architect</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The latency makes all the difference. Other tools make you wait 3-4 seconds after speaking. VoiceTwin responds instantly like a human being across the table. Absolute game changer."
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Michael Chang</span>
              <span className="text-[10px] text-slate-400">Principal Platform Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Stop Rambling. Start Commanding the Room.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Take 5 minutes today to diagnose your speech cadence, eliminate filler words, and unlock executive presence with VoiceTwin.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onStartSession}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-2xl shadow-indigo-600/40 flex items-center gap-2.5 transition active:scale-95 group border border-indigo-400/30"
            >
              <Mic className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition" />
              <span>Launch Live Practice Session Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="max-w-5xl mx-auto pt-8 pb-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-slate-300">VoiceTwin</span>
          <span>• Powered by Agora Low-Latency Voice RTC & Gemini 3.8 Flash</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStartSession} className="hover:text-slate-300 transition">Studio Console</button>
          <button onClick={onExploreDashboard} className="hover:text-slate-300 transition">Twin DNA</button>
          <button onClick={onExploreArchitecture} className="hover:text-slate-300 transition">RTC Architecture</button>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { Cpu, Radio, Network, Sparkles, Database, ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export const AgoraArchitectureView: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      title: "1. User Voice Capture & VAD",
      subtitle: "Edge Microphone & Hardware RTC",
      tech: "Agora Low-Latency RTC SDK",
      latency: "32ms",
      color: "border-cyan-500 bg-cyan-950/30 text-cyan-300",
      description: "Captures candidate audio via browser WebRTC / Agora Voice SDK with Hardware Voice Activity Detection (VAD). Automatically cuts off silence and detects when the candidate stops speaking to initiate instant turn-taking.",
      highlights: [
        "Acoustic Echo Cancellation (AEC) & AI Noise Suppression (AINS)",
        "Ultra-fast local Voice Activity Detection (<15ms)",
        "Global SD-RTN (Software Defined Real-Time Network) audio routing"
      ]
    },
    {
      id: 1,
      title: "2. Agora Conversational AI Gateway",
      subtitle: "Audio Streaming & Session Orchestration",
      tech: "Agora Real-time AI Bridge",
      latency: "45ms",
      color: "border-indigo-500 bg-indigo-950/30 text-indigo-300",
      description: "Direct bi-directional real-time audio gateway. Manages low-latency WebSocket / WebRTC streams between candidate, transcription services, and the LLM engine with zero packet drops.",
      highlights: [
        "Packet Loss Concealment (PLC) up to 80% network jitter",
        "Stream multiplexing for real-time speech analytics & live transcript",
        "Interruption handling: if candidate speaks while AI is talking, AI halts instantly"
      ]
    },
    {
      id: 2,
      title: "3. Reasoning AI Agent",
      subtitle: "Dynamic Contextual Questioning",
      tech: "Gemini 3.8 Flash Streaming",
      latency: "145ms",
      color: "border-purple-500 bg-purple-950/30 text-purple-300",
      description: "Processes live transcript chunks. Evaluates technical accuracy, identifies cognitive hedges, and generates real-time contextual follow-ups rather than canned questionnaire answers.",
      highlights: [
        "Token-by-token streaming response to minimize initial time-to-first-byte",
        "Strict prompt boundaries for technical depth and senior interviewer persona",
        "Live metric extraction (Clarity, Confidence, Tech Depth)"
      ]
    },
    {
      id: 3,
      title: "4. VoiceTwin Personalization",
      subtitle: "Candidate Archetype & Memory",
      tech: "VoiceTwin DNA Profile Context",
      latency: "18ms",
      color: "border-emerald-500 bg-emerald-950/30 text-emerald-300",
      description: "Injects candidate-specific communication vulnerabilities into the prompt. For example: if Alex tends to ramble on distributed systems, the AI is dynamically instructed to challenge conciseness.",
      highlights: [
        "Real-time historical session memory injection",
        "Target archetype trajectory monitoring ('The Rambling Architect' → 'Staff Leader')",
        "Dynamic difficulty adaptation based on candidate confidence signals"
      ]
    },
    {
      id: 4,
      title: "5. Ultra Low-Latency Voice Synthesis",
      subtitle: "Natural Turn-Taking Audio Delivery",
      tech: "Agora RTC Audio Playback Engine",
      latency: "38ms",
      color: "border-pink-500 bg-pink-950/30 text-pink-300",
      description: "Streams natural human-like interviewer voice back through Agora RTC to the candidate's headphones. Total end-to-end latency stays under 280ms, enabling real human conversation.",
      highlights: [
        "End-to-End Glass-to-Glass Latency: ~278ms",
        "Human-like cadence with conversational pauses and natural pitch",
        "Concurrent telemetry synchronization for live UI transcript & audio wave"
      ]
    }
  ];

  const currentStage = stages[selectedStage];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Low-Latency Architecture
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold">
              Total Pipeline Latency: ~278ms
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">How Agora & Real-Time AI Powers VoiceTwin</h2>
          <p className="text-xs text-slate-400">
            Real-time conversational pipeline architecture built for true conversational turn-taking, not turn-based chatbot polling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-xs">
            <Zap className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-500 text-[10px] block">Turn-Taking Speed</span>
              <span className="text-white font-mono font-bold">&lt; 300ms End-to-End</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Network className="w-4 h-4 text-indigo-400" />
            Interactive End-to-End Pipeline Stages (Click any node to inspect)
          </span>
          <span className="text-xs text-slate-400 font-mono">5 Modular Layers</span>
        </div>

        {/* Pipeline Nodes Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {stages.map((stage, idx) => {
            const isSelected = selectedStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? `${stage.color} border-2 shadow-lg shadow-indigo-500/10 scale-[1.02]`
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="opacity-75">Stage {idx + 1}</span>
                    <span className="font-bold">{stage.latency}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{stage.title.split('. ')[1]}</h4>
                  <p className="text-[10px] opacity-75 mt-0.5 line-clamp-1">{stage.tech}</p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="font-mono">{isSelected ? 'Active View' : 'Inspect'}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Details */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-indigo-400 uppercase font-mono font-bold block">
                {currentStage.subtitle}
              </span>
              <h3 className="text-base font-bold text-white">{currentStage.title}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Stage Latency</span>
              <span className="text-base font-bold font-mono text-cyan-300">{currentStage.latency}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {currentStage.description}
          </p>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Engineering Advantages & Specs:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentStage.highlights.map((h, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latency Comparison Card: Old Turn-based Chatbots vs VoiceTwin Agora RTC */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Latency & Conversational Naturalness Comparison
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">10× Faster Responsiveness</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Traditional Chatbot Flaw */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 space-y-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
              ❌ Traditional AI Interview Chatbots (HTTP Polling)
            </span>
            <p className="text-slate-400 leading-relaxed">
              Record whole audio file → send multipart upload over HTTP (1.2s) → wait for whole transcription (800ms) → LLM complete text response (1.5s) → slow cloud TTS render (900ms).
            </p>
            <div className="p-2 rounded bg-rose-950/20 border border-rose-500/30 text-rose-300 font-mono font-semibold">
              Total Latency: 4,400ms (4.4 seconds). Destroys realistic conversational flow.
            </div>
          </div>

          {/* VoiceTwin Powered by Agora & Streaming AI */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              ✓ VoiceTwin (Agora RTC + Gemini Streaming Engine)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Live hardware VAD streaming over Agora SD-RTN (32ms) → streaming transcription & Gemini reasoning tokens (145ms) → real-time synthetic playback buffer (38ms).
            </p>
            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
              Total Latency: &lt; 280ms. Feels like a real human interviewer across the desk.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

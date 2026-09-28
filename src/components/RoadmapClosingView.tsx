import React from 'react';
import { Globe, Video, Smartphone, Building2, Sparkles, CheckCircle2, Award, ArrowRight, HeartHandshake } from 'lucide-react';

interface RoadmapClosingViewProps {
  onRestartDemo: () => void;
}

export const RoadmapClosingView: React.FC<RoadmapClosingViewProps> = ({ onRestartDemo }) => {
  const roadmapItems = [
    {
      icon: Globe,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      title: "Multilingual Voice Twin (Hindi, Spanish, Mandarin)",
      tag: "Phase 1 - In Progress",
      description: "Empower non-native English speakers to practice technical concepts first in their native language (e.g. Hindi/Hinglish), with real-time AI vocabulary bridging into fluent executive English."
    },
    {
      icon: Video,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      title: "Computer Vision & Body Language Diagnostics",
      tag: "Phase 2",
      description: "Real-time webcam telemetry measuring eye contact, posture stability, blink frequency, and micro-expressions to evaluate physical executive presence alongside verbal cadence."
    },
    {
      icon: Smartphone,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      title: "Mobile App & Commute Practice Mode",
      tag: "Phase 3",
      description: "Ultra-low bandwidth Agora audio SDK integration for iOS/Android, allowing candidates to do 5-minute rapid-fire voice drills during commutes or before entering the interview building."
    },
    {
      icon: Building2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      title: "Enterprise Custom Pipeline Sandbox",
      tag: "Phase 4 - B2B",
      description: "Allow tech enterprises and hiring teams to upload their exact internal interview rubrics, providing standardized, bias-free candidate screening with verifiable forensic speech scorecards."
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Closing Card */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
              Vision & Beyond
            </span>
            <span className="text-xs text-slate-400 font-mono">Closing Note • 05:50 – 06:10</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Turning Interview Anxiety Into Executive Presence
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            "Engineers spend hundreds of hours studying algorithms, yet get rejected in the first 10 minutes because of rambling delivery, filler words, and panic under pressure. VoiceTwin gives every candidate an unfair advantage: a personal, 24/7 low-latency conversational coach that transforms raw technical thought into unforgettable executive articulation."
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onRestartDemo}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Restart Demo Experience</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Roadmap Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roadmapItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {item.tag}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>On active production milestone roadmap</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Hackathon Judging Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Agora Conversational AI Hackathon Ready</h4>
            <p className="text-xs text-slate-400">Full end-to-end low-latency RTC, dynamic multi-turn questioning, and biometric diagnostics.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 font-mono text-xs border border-slate-800">
            Built with Agora RTC & Gemini 3.8 Flash
          </span>
        </div>
      </div>
    </div>
  );
};

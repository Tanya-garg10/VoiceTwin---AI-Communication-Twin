import React, { useState } from 'react';
import { VoiceWaveSignal } from './VoiceWaveSignal';
import { ArrowRight, Sparkles, Clock, Compass, ChevronRight, Play } from 'lucide-react';

interface EditorialDashboardProps {
  onStartModeSession: (modeId: string) => void;
  onNavigateToInsights: () => void;
  onNavigateToTwin: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const EditorialDashboard: React.FC<EditorialDashboardProps> = ({
  onStartModeSession,
  onNavigateToInsights,
  onNavigateToTwin,
  onNavigateTab,
}) => {
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);

  const modes = [
    {
      id: 'interview',
      number: '01',
      title: 'Interview',
      tagline: 'Think clearly. Answer naturally.',
      desc: 'System architecture, concurrency, and behavioral edge cases with adaptive unscripted follow-up probes.',
      duration: '18 minutes',
      difficulty: 'Advanced',
    },
    {
      id: 'presentation',
      number: '02',
      title: 'Presentation',
      tagline: 'Lead with outcome. Hold attention.',
      desc: 'Quarterly roadmap reviews, executive slide talk-tracks, and high-impact framing.',
      duration: '12 minutes',
      difficulty: 'Intermediate',
    },
    {
      id: 'meeting',
      number: '03',
      title: 'Meeting',
      tagline: 'Disagree with poise. Guide alignment.',
      desc: 'Steer cross-functional architectural disagreements with senior staff and product stakeholders.',
      duration: '15 minutes',
      difficulty: 'Senior Staff',
    },
    {
      id: 'client',
      number: '04',
      title: 'Client',
      tagline: 'Translate complexity into commercial trust.',
      desc: 'Explain infrastructure trade-offs and SLAs to enterprise partners without alienating them.',
      duration: '14 minutes',
      difficulty: 'Executive',
    },
    {
      id: 'networking',
      number: '05',
      title: 'Networking',
      tagline: 'Be memorable in two minutes.',
      desc: 'Crisp elevator intros, technical passion stories, and authentic conversational rapport.',
      duration: '6 minutes',
      difficulty: 'All Levels',
    },
    {
      id: 'pressure',
      number: '06',
      title: 'Pressure',
      tagline: '30 seconds. Zero hesitation.',
      desc: 'High-intensity crisis war-room drills. State triage actions under a ticking clock without fillers.',
      duration: '5 minutes',
      difficulty: 'High Urgency',
    },
  ];

  const currentMode = modes[selectedModeIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-16 text-left">
      {/* 1. EDITORIAL GREETING */}
      <div className="space-y-1">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
          Good evening, Tanya.
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base font-normal">
          “Let's make your next conversation better.”
        </p>
      </div>

      {/* 2. COMMUNICATION PULSE (Editorial Hero Metric) */}
      <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl">
        {/* Ambient Subtle Wave Canvas Background */}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path
              d="M0 150 C 150 70, 300 230, 450 150 C 600 70, 750 230, 900 150 L 1000 150"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="12"
            />
            <path
              d="M0 170 C 150 110, 300 210, 450 170 C 600 110, 750 210, 900 170 L 1000 170"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="6"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Big Score */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 block">
              COMMUNICATION PULSE
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-7xl sm:text-8xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-mono">
                82
              </span>
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 block">
                  Communication Score
                </span>
                <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  ↑ 8% from your last 5 sessions
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 pt-1 leading-relaxed">
              Calculated across clarity, acoustic stability, conciseness, and cognitive composure.
            </p>
          </div>

          {/* Performance Strip with Thin Waveform Lines */}
          <div className="lg:col-span-7 space-y-1.5 pt-4 lg:pt-0 lg:border-l border-stone-200/80 dark:border-stone-800 lg:pl-8">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 block mb-2">
              PERFORMANCE STRIP
            </span>

            <VoiceWaveSignal label="CLARITY" score={86} />
            <VoiceWaveSignal label="CONFIDENCE" score={79} />
            <VoiceWaveSignal label="RELEVANCE" score={91} />
            <VoiceWaveSignal label="CONCISENESS" score={74} />
            <VoiceWaveSignal label="TECHNICAL DEPTH" score={88} />
          </div>
        </div>
      </section>

      {/* 3. “WHAT SHOULD I PRACTICE?” (Editorial AI Recommendation) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-500/[0.04] via-transparent to-cyan-500/[0.04] border border-stone-200/80 dark:border-stone-800/80 space-y-4">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 font-bold block">
          YOUR NEXT CONVERSATION
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
          “Practice answering technical questions in under 30 seconds.”
        </h3>

        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Reason: <strong className="text-stone-900 dark:text-stone-200">“Your technical depth is strong, but your recent answers became longer under pressure.”</strong>
        </p>

        <div className="pt-2">
          <button
            onClick={() => onStartModeSession('pressure')}
            className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm flex items-center gap-2 transition active:scale-95"
          >
            <span>PRACTICE THIS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. PRACTICE MODES (Horizontal Mode Selector) */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
            PRACTICE MODES
          </span>
          <span className="text-xs text-stone-400 font-mono">06 Specialized Studios</span>
        </div>

        {/* Large Horizontal Mode Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {modes.map((mode, idx) => {
            const isSelected = selectedModeIndex === idx;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedModeIndex(idx)}
                className={`shrink-0 px-5 py-3 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'bg-transparent border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100/50 dark:hover:bg-stone-900/30'
                }`}
              >
                <span className="text-[10px] font-mono opacity-60 block">{mode.number}</span>
                <span className="text-sm font-bold tracking-tight block">{mode.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Mode Dynamic Detail Panel */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all duration-300">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">
                {currentMode.number}
              </span>
              <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase tracking-tight">
                {currentMode.title}
              </h4>
            </div>

            <p className="text-lg text-stone-800 dark:text-stone-200 font-medium">
              “{currentMode.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {currentMode.desc}
            </p>

            <div className="flex items-center gap-6 pt-1 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span>Estimated: <strong className="text-stone-900 dark:text-stone-200">{currentMode.duration}</strong></span>
              <span>•</span>
              <span>Difficulty: <strong className="text-stone-900 dark:text-stone-200">{currentMode.difficulty}</strong></span>
            </div>
          </div>

          <button
            onClick={() => onStartModeSession(currentMode.id)}
            className="px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-md flex items-center gap-2.5 transition active:scale-95 shrink-0"
          >
            <span>BEGIN SESSION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. DAILY MISSION (Small Editorial Challenge) */}
      <section className="p-6 rounded-2xl bg-stone-100/70 dark:bg-stone-900/30 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 block">
            TODAY'S PRACTICE
          </span>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            “Explain your project to a non-technical person.”
          </p>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">30 seconds challenge</span>
        </div>

        <button
          onClick={() => onStartModeSession('pressure')}
          className="px-4 py-2 rounded-full text-xs font-bold tracking-wider text-stone-900 dark:text-stone-100 hover:bg-white dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 transition flex items-center gap-1.5"
        >
          <span>START</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </section>

      {/* 6. SPECIALIZED DRILL STUDIOS (Direct Access to All 4 Practice Modules) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            SPECIALIZED DRILL STUDIOS
          </h3>
          <span className="text-xs font-mono text-stone-400">Targeted skill development</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigateTab && onNavigateTab('questions')}
            className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 hover:border-violet-500/60 dark:hover:border-violet-400/60 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono uppercase text-violet-600 dark:text-violet-400 font-semibold mb-1">
              Google · Meta · Stripe
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition mb-1">
              Questions & Personas
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Practice against 4 tough AI interviewer personalities with anchor checkpoints.
            </p>
            <div className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab && onNavigateTab('elevator_pitch')}
            className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold mb-1">
              4-Beat Narrative
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition mb-1">
              60s Executive Pitch
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Master the first 60 seconds of your interview with real-time beat chronometer.
            </p>
            <div className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab && onNavigateTab('practice')}
            className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 hover:border-indigo-500/60 dark:hover:border-indigo-400/60 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              Structure & Polish
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition mb-1">
              STAR Story Reframer
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Turn rambling explanations into concise Situation, Task, Action, Result answers.
            </p>
            <div className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab && onNavigateTab('speechlab')}
            className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold mb-1">
              Speech Telemetry
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition mb-1">
              Forensic Speech Lab
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Acoustic diagnostics, pacing (WPM), pitch inflection, and vocal warmup.
            </p>
            <div className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const milestones = [
    { session: 'SESSION 01', score: 62, note: 'Baseline Diagnostic', date: 'Aug 12' },
    { session: 'SESSION 05', score: 71, note: 'Reduced Hesitations', date: 'Aug 24' },
    { session: 'SESSION 10', score: 78, note: 'Structured STAR Delivery', date: 'Sep 08' },
    { session: 'SESSION 18', score: 82, note: 'Crisp Staff Executive', date: 'Today' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16 text-left select-none text-stone-900 dark:text-stone-100">
      {/* 1. Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
          LONGITUDINAL PROGRESS
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
          YOUR COMMUNICATION IS EVOLVING.
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg font-normal">
          A continuous record of your conversational acoustic clarity, pacing stability, and cognitive resilience across practice sessions.
        </p>
      </div>

      {/* 2. Flowing Milestone Chart */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl space-y-8">
        {/* SVG Flowing Line Wave Chart */}
        <div className="w-full h-48 relative flex items-center justify-between">
          <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
            {/* Soft area gradient */}
            <defs>
              <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 50,120 C 180,95 280,70 380,45 C 480,25 520,20 560,15 L 560,160 L 50,160 Z"
              fill="url(#progressGrad)"
            />
            {/* Flowing Line */}
            <path
              d="M 50,120 C 180,95 280,70 380,45 C 480,25 520,20 560,15"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2.5"
            />
            {/* Milestone nodes */}
            <circle cx="50" cy="120" r="5" className="fill-stone-900 dark:fill-stone-100" />
            <circle cx="210" cy="90" r="5" className="fill-stone-900 dark:fill-stone-100" />
            <circle cx="390" cy="45" r="5" className="fill-stone-900 dark:fill-stone-100" />
            <circle cx="560" cy="15" r="6" className="fill-violet-600 ring-4 ring-violet-200 dark:ring-violet-900/40" />
          </svg>
        </div>

        {/* Milestone Cards underneath */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
          {milestones.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
                {m.session}
              </span>
              <span className="text-3xl font-black font-mono tracking-tight block">
                {m.score}
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-300 font-medium block">
                {m.note}
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">{m.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. “WHAT CHANGED?” SECTION */}
      <section className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          “What changed?”
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold block">
              → Better clarity
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Jargon replaced with direct architectural concepts and verified metrics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="text-violet-600 dark:text-violet-400 font-mono text-sm font-bold block">
              → Faster responses
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Latency before speaking reduced from 3.2s hesitation to 1.1s calm intent.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold block">
              → Less filler language
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              "Basically" and "um" declined from 14/min down to 4.8/min.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold block">
              → Stronger structure
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Consistent adoption of Point → Example → Business Result framework.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

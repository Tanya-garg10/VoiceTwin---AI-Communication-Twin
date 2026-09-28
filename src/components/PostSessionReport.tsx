import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw, Volume2, ArrowDown } from 'lucide-react';
import { SAMPLE_IMPROVED_ANSWER } from '../data/mockData';

interface PostSessionReportProps {
  onPracticeAgain: () => void;
  onExploreTwin: () => void;
}

export const PostSessionReport: React.FC<PostSessionReportProps> = ({
  onPracticeAgain,
  onExploreTwin,
}) => {
  // Beautiful editorial loading transition states:
  // 1: CONVERSATION COMPLETE
  // 2: ANALYZING YOUR COMMUNICATION
  // 3: YOUR SESSION IS READY
  // 4: Show full report
  const [transitionPhase, setTransitionPhase] = useState<number>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setTransitionPhase(2), 900);
    const t2 = setTimeout(() => setTransitionPhase(3), 1900);
    const t3 = setTimeout(() => setTransitionPhase(4), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (transitionPhase < 4) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 text-center select-none animate-fade-in">
        <div className="w-16 h-16 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center animate-spin">
          <div className="w-3 h-3 rounded-full bg-violet-600 dark:bg-violet-400" />
        </div>

        <div className="space-y-3 font-mono text-xs tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400">
          <div className={transitionPhase >= 1 ? 'text-stone-900 dark:text-stone-100 font-bold' : 'opacity-40'}>
            CONVERSATION COMPLETE
          </div>
          <ArrowDown className="w-3.5 h-3.5 mx-auto opacity-40 animate-bounce" />
          <div className={transitionPhase >= 2 ? 'text-violet-600 dark:text-violet-400 font-bold' : 'opacity-40'}>
            ANALYZING YOUR COMMUNICATION
          </div>
          <ArrowDown className="w-3.5 h-3.5 mx-auto opacity-40 animate-bounce" />
          <div className={transitionPhase >= 3 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'opacity-40'}>
            YOUR SESSION IS READY
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    { value: 91, label: 'RELEVANCE' },
    { value: 86, label: 'CLARITY' },
    { value: 88, label: 'TECHNICAL DEPTH' },
    { value: 79, label: 'CONFIDENCE' },
    { value: 74, label: 'CONCISENESS' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-20 text-left select-none animate-fade-in text-stone-900 dark:text-stone-100">
      {/* 1. EDITORIAL REPORT HEADER & TOP METRICS */}
      <section className="space-y-8">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
            SESSION REPORT #102 • TECHNICAL ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
            YOU WERE STRONG HERE.
          </h2>
        </div>

        {/* Big Typography-driven Metrics without identical cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-4 border-t border-b border-stone-200 dark:border-stone-800 py-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight block">
                {m.value}
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase block">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. AI INSIGHT (Large Editorial Quote) */}
      <section className="space-y-8 max-w-3xl">
        <blockquote className="text-2xl sm:text-3xl font-medium tracking-tight leading-relaxed italic text-stone-900 dark:text-stone-100">
          “Your strongest answers were technically detailed, but your opening sentences could be more direct.”
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
          {/* Why this matters */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-stone-500 dark:text-stone-400">
              WHY THIS MATTERS
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Interviewers understand your core idea faster when the main point comes first. Hesitant openings signal uncertainty.
            </p>
          </div>

          {/* Try this */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-violet-600 dark:text-violet-400">
              TRY THIS
            </h4>
            <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs font-mono leading-relaxed">
              Answer in this structure:
              <br />
              <strong className="text-stone-900 dark:text-stone-100">Point → Example → Result.</strong>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onPracticeAgain}
            className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm transition flex items-center gap-2"
          >
            <span>PRACTICE AGAIN</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. ANSWER TRANSFORMATION (Before / After Interface) */}
      <section className="space-y-8 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
            ANSWER TRANSFORMATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How to Elevate Your Response
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Your Answer */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 block font-bold">
              YOUR ANSWER
            </span>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
              "{SAMPLE_IMPROVED_ANSWER.originalAnswer.slice(0, 220)}..."
            </p>
            <span className="text-[11px] font-mono text-rose-500 block">
              11 fillers detected • 48s duration
            </span>
          </div>

          {/* Center: Waveform Arrow */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-violet-600 dark:text-violet-400 font-mono text-xs">
            <span className="w-16 h-px bg-violet-300 dark:bg-violet-700 hidden lg:block mb-2" />
            <span className="tracking-widest uppercase text-[10px]">TRANSFORM</span>
            <ArrowRight className="w-5 h-5 mt-1 animate-pulse" />
          </div>

          {/* Right: Stronger Version */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white/90 dark:bg-stone-900/80 border border-violet-300/80 dark:border-violet-700/60 shadow-xl space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 block font-bold">
              STRONGER VERSION
            </span>
            <p className="text-sm text-stone-900 dark:text-stone-100 leading-relaxed font-medium">
              "{SAMPLE_IMPROVED_ANSWER.improvedAnswer}"
            </p>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block">
              Direct opening • 26s punchy cadence
            </span>
          </div>
        </div>

        {/* Why it works better */}
        <div className="p-6 rounded-2xl bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200/60 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 text-xs">
            <span className="font-mono uppercase tracking-[0.15em] font-bold text-stone-500 dark:text-stone-400 block">
              WHY IT WORKS BETTER
            </span>
            <div className="flex flex-wrap items-center gap-4 text-stone-800 dark:text-stone-200 font-medium">
              <span>• Clearer opening</span>
              <span>• Less repetition</span>
              <span>• Stronger architectural impact</span>
            </div>
          </div>

          <button
            onClick={onPracticeAgain}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition shrink-0"
          >
            PRACTICE THIS VERSION
          </button>
        </div>
      </section>

      {/* 4. BOTTOM ACTION TO TWIN */}
      <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={onExploreTwin}
          className="text-xs font-mono tracking-wider uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition"
        >
          <span>VIEW YOUR COMMUNICATION DNA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

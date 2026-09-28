import React from 'react';
import { VoiceOrb } from './VoiceOrb';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface EditorialHeroProps {
  onStartSession: () => void;
  onWatchHowItWorks: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onStartSession,
  onWatchHowItWorks,
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-20 md:py-24">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[300px] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-100/40 dark:bg-cyan-900/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Huge Editorial Typography (7 Cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Subtle Studio Label */}
          <div className="inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
            <span>The Private Communication Studio</span>
          </div>

          {/* Huge Heading */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.02] text-stone-900 dark:text-stone-100 uppercase">
              YOUR VOICE.
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.02] text-stone-900 dark:text-stone-100 uppercase">
              YOUR CONTEXT.
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.02] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-300 uppercase">
              YOUR AI TWIN.
            </h1>
          </div>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed font-normal">
            Practice the conversations that matter with an AI partner that adapts to the way you communicate.
          </p>

          {/* Editorial Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartSession}
              className="px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-lg shadow-stone-900/10 flex items-center justify-center gap-2.5 transition active:scale-95 group"
            >
              <span>START A SESSION</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onWatchHowItWorks}
              className="px-6 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300/80 dark:border-stone-700 hover:border-stone-400 bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm transition flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>WATCH HOW IT WORKS</span>
            </button>
          </div>

          {/* Bottom Minimalist Tagline */}
          <div className="pt-4 text-xs font-mono text-stone-400 dark:text-stone-500 flex items-center gap-3">
            <span>VOICE → WAVE → INSIGHT</span>
            <span>•</span>
            <span>Sub-280ms Real-Time RTC</span>
          </div>
        </div>

        {/* Right Column: Floating Communication Orb (5 Cols) */}
        <div className="lg:col-span-5 flex items-center justify-center relative py-6">
          <VoiceOrb size={320} state="idle" showOrbitPhrases={true} />
        </div>
      </div>
    </section>
  );
};

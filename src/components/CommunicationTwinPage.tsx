import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_TWIN_PROFILE } from '../data/mockData';

export const CommunicationTwinPage: React.FC = () => {
  const profile = INITIAL_TWIN_PROFILE;

  // Twin Studio Customization states
  const [personality, setPersonality] = useState('Professional');
  const [intensity, setIntensity] = useState('Balanced');
  const [style, setStyle] = useState('Direct');
  const [language, setLanguage] = useState('English');

  const dnaTags = ['STRUCTURED', 'TECHNICAL', 'CURIOUS', 'DETAIL-ORIENTED', 'IMPROVING'];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-20 text-left select-none text-stone-900 dark:text-stone-100">
      {/* 1. YOUR COMMUNICATION DNA */}
      <section className="space-y-12">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
            INDIVIDUAL MATRIX
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
            YOUR COMMUNICATION DNA
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl font-normal">
            Your unique acoustic cadence, conversational pacing, and conceptual framing distilled from 14 verified sessions.
          </p>
        </div>

        {/* Abstract DNA Waveform Centerpiece */}
        <div className="relative p-10 sm:p-14 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle radiating lines */}
          <div className="w-full max-w-xl h-44 flex items-center justify-center relative">
            {/* SVG Double Helix Waveform Lines */}
            <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
              <path
                d="M 10,80 Q 70,10 130,80 T 250,80 T 370,80 T 490,80"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="opacity-80"
              />
              <path
                d="M 10,80 Q 70,150 130,80 T 250,80 T 370,80 T 490,80"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                className="opacity-70"
              />
              {/* Connecting resonance bridges */}
              {[40, 100, 160, 220, 280, 340, 400, 460].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={80 + Math.sin(i * 1.2) * 35}
                  r="3.5"
                  className="fill-stone-900 dark:fill-stone-100"
                />
              ))}
            </svg>
          </div>

          {/* DNA Characteristic Tags surrounding the abstract wave */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {dnaTags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300/80 dark:border-stone-700 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Four Column Insights: Strengths, Patterns, Current Focus, Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {/* Strengths */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 font-bold block">
              YOUR STRENGTHS
            </span>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 leading-relaxed">
              <li>• Concrete architectural depth on distributed systems</li>
              <li>• Rapid technical recovery when challenged</li>
              <li>• Strong contextual framing on scale</li>
            </ul>
          </div>

          {/* Patterns */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 font-bold block">
              YOUR PATTERNS
            </span>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 leading-relaxed">
              <li>• Cadence rushes to 175 WPM on latency questions</li>
              <li>• "Basically" used 4.8 times per answer</li>
              <li>• Pauses before stating key protocols</li>
            </ul>
          </div>

          {/* Current Focus */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 font-bold block">
              CURRENT FOCUS
            </span>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              Transforming "The Rambling Architect" archetype into a crisp, authoritative Staff Leader delivery.
            </p>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-400 font-bold block">
              YOUR GOALS
            </span>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              Sustain 135–140 WPM steady delivery and cut filler rate below 1.5 per minute across 5 consecutive sessions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SHAPE YOUR TWIN STUDIO */}
      <section className="space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
            TWIN STUDIO
          </span>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            SHAPE YOUR TWIN
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Tune how your AI practice partner reacts, pushes back, and mirrors your conversational style.
          </p>
        </div>

        {/* Elegant Segmented Controls Grid */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl space-y-6">
          {/* 1. AI Personality */}
          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 block">
              AI Personality
            </label>
            <div className="flex flex-wrap gap-2">
              {['Supportive', 'Professional', 'Socratic', 'Challenging'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPersonality(opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    personality === opt
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Conversation Intensity */}
          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 block">
              Conversation Intensity
            </label>
            <div className="flex flex-wrap gap-2">
              {['Calm', 'Balanced', 'Pressure'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setIntensity(opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    intensity === opt
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Response Style */}
          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 block">
              Response Style
            </label>
            <div className="flex flex-wrap gap-2">
              {['Concise', 'Detailed', 'Direct'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStyle(opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    style === opt
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Preferred Language */}
          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 block">
              Preferred Language
            </label>
            <div className="flex flex-wrap gap-2">
              {['English', 'Hindi', 'Hinglish'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLanguage(opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    language === opt
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

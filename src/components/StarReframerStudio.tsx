import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw, Volume2, Play, Pause, ChevronRight } from 'lucide-react';

export const StarReframerStudio: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const starSteps = [
    {
      key: 'S',
      title: 'Situation',
      prompt: 'Set the macro architectural stage in 1–2 crisp sentences. What was the scale or business crisis?',
      example: 'Our core payment gateway was processing 140,000 transactions/sec when database connection pool starvation caused a 400ms latency spike.',
      tip: 'Do not spend 45 seconds explaining company history. State the scale and the failure mode.'
    },
    {
      key: 'T',
      title: 'Task',
      prompt: 'What was your specific ownership and measurable objective?',
      example: 'As Staff Infrastructure Lead, my mandate was to eliminate connection pool thrashing within 2 hours without dropping in-flight payments.',
      tip: 'Use active first-person phrasing ("My mandate was...") instead of passive team ambiguity.'
    },
    {
      key: 'A',
      title: 'Action',
      prompt: 'What concrete architectural mechanisms and protocols did you execute?',
      example: 'I implemented dynamic query throttling via Envoy rate limiters, isolated read traffic to regional replicas, and terminated hung idle transactions.',
      tip: 'Name concrete protocols, flags, or parameters. Avoid vague phrases like "we optimized queries".'
    },
    {
      key: 'R',
      title: 'Result',
      prompt: 'What was the verified business metric and lasting reliability outcome?',
      example: 'P99 latency dropped from 420ms back to 18ms within 15 minutes, preserving $1.4M in peak checkout volume with zero customer transaction losses.',
      tip: 'Always anchor with a quantified metric: latency delta, cost reduction, or uptime percentage.'
    }
  ];

  const fullPolishedText = 
    "Our core payment gateway was processing 140,000 transactions/sec when database connection pool starvation caused a 400ms latency spike. As Staff Infrastructure Lead, my mandate was to eliminate connection pool thrashing within 2 hours without dropping in-flight payments. I implemented dynamic query throttling via Envoy rate limiters, isolated read traffic to regional replicas, and terminated hung idle transactions. Within 15 minutes, P99 latency dropped from 420ms back to 18ms, preserving $1.4M in peak checkout volume with zero customer transaction losses.";

  const playSynthesis = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullPolishedText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const activeStepData = starSteps[currentStep];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16 text-left select-none text-stone-900 dark:text-stone-100">
      {/* 1. Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
          PRACTICE DRILL
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
          THE S.T.A.R. EXECUTIVE RE-FRAMER
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl font-normal">
          Break rambling narrative answers into a razor-sharp 4-part structure that commands technical authority.
        </p>
      </div>

      {/* 2. Step Selector (S - T - A - R) */}
      <div className="grid grid-cols-4 gap-3">
        {starSteps.map((step, idx) => {
          const isActive = currentStep === idx;
          return (
            <button
              key={step.key}
              onClick={() => setCurrentStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-white dark:bg-stone-900 border-violet-500 shadow-md text-stone-900 dark:text-stone-100'
                  : 'bg-stone-100/50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900'
              }`}
            >
              <span className="text-lg font-black font-mono block text-violet-600 dark:text-violet-400">
                {step.key}
              </span>
              <span className="text-xs font-bold tracking-tight block">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Step Studio Card */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl space-y-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-violet-600 dark:text-violet-400">
            STEP 0{currentStep + 1} • {activeStepData.title.toUpperCase()}
          </span>
          <h3 className="text-2xl font-bold tracking-tight">{activeStepData.prompt}</h3>
        </div>

        {/* Example Box */}
        <div className="p-5 rounded-2xl bg-[#faf9f5] dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 space-y-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block font-bold">
            RECOMMENDED EXECUTIVE MODEL
          </span>
          <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium leading-relaxed italic">
            "{activeStepData.example}"
          </p>
        </div>

        {/* Coach Tip */}
        <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 text-xs text-violet-900 dark:text-violet-200 font-medium flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
          <span><strong>VoiceTwin Coach:</strong> {activeStepData.tip}</span>
        </div>

        {/* Step Navigation Button */}
        <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-full text-xs font-semibold text-stone-500 disabled:opacity-30"
          >
            Previous
          </button>

          <span className="text-xs font-mono text-stone-400">
            Step {currentStep + 1} of 4
          </span>

          <button
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            disabled={currentStep === 3}
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 disabled:opacity-30 flex items-center gap-1.5 transition"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. Complete Synthesized Response Audio Playback */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-violet-500/[0.05] via-transparent to-cyan-500/[0.05] border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h4 className="text-lg font-bold">Hear the Complete 4-Part STAR Delivery</h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
            Listen to all four components seamlessly stitched into an executive-level Staff Engineer response at 135 WPM.
          </p>
        </div>

        <button
          onClick={playSynthesis}
          className={`px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition flex items-center gap-2 shrink-0 ${
            isPlayingAudio
              ? 'bg-rose-600 text-white'
              : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800'
          }`}
        >
          {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlayingAudio ? 'Pause Voice' : 'Play Full Delivery'}</span>
        </button>
      </section>
    </div>
  );
};

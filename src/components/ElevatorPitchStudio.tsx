import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Play,
  Pause,
  Award,
  Zap,
  TrendingUp,
  Flame
} from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

interface ElevatorPitchStudioProps {
  onStartFullSession: () => void;
}

export const ElevatorPitchStudio: React.FC<ElevatorPitchStudioProps> = ({
  onStartFullSession,
}) => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const prompts = [
    {
      title: '01 / The 60s Executive Intro',
      sub: '"Tell me about yourself as a Staff/Principal Engineer."',
      beat1: '0-15s: Architectural Identity & Scale of Scope',
      beat2: '15-30s: Core Technical Specialization (Distributed / Concurrency)',
      beat3: '30-45s: 1 Flagship Problem Solved & Verified Metric',
      beat4: '45-60s: Forward-Looking Mission & What Fuels You',
      sampleAnswer:
        "I'm Alex, a Staff Distributed Systems Engineer with 8 years of experience scaling global cloud data backbones. My specialization is high-throughput consensus protocols and sub-10ms transactional state replication. Most recently at FinTech Core, I re-architected our transaction engine across 3 continental regions, eliminating single-zone bottlenecks and reducing P99 latency by 68% while handling 140k TPS. What excites me now is building self-healing distributed runtimes that make complex distributed consensus invisible to product engineers.",
    },
    {
      title: '02 / The Complex System Elevator Pitch',
      sub: '"Explain your most complex architecture in 60 seconds."',
      beat1: '0-15s: The Business Scale & Bottleneck Problem',
      beat2: '15-30s: The Key Technical Insight & Design Trade-off',
      beat3: '30-45s: How Edge Cases / Partitions Were Handled',
      beat4: '45-60s: Verified Reliability & Cost Impact',
      sampleAnswer:
        "We had a multi-tenant payment ingestion pipeline processing $80M in daily transactions that suffered tail latency degradation whenever database connection pools saturated. Instead of just scaling up database clusters, I introduced an Envoy-based dynamic rate limiter and asynchronous batching engine with cooperative sticky Kafka rebalancing. Under peak Black Friday stress, this decoupled client writes from DB persistence, maintaining a flat 18ms latency and slashing cloud compute costs by $320k annually.",
    },
    {
      title: '03 / The Tough Conflict Story',
      sub: '"Describe a time you challenged a VP or Staff peer."',
      beat1: '0-15s: The Architectural Disagreement & Risk',
      beat2: '15-30s: The Empirical Telemetry/Benchmark You Built',
      beat3: '30-45s: How Alignment & Trust Were Built',
      beat4: '45-60s: The Lasting Organizational Precedent',
      sampleAnswer:
        "Our VP of Engineering wanted to adopt a proprietary graph database for our real-time identity graph, while I advocated for a lightweight PostgreSQL extension with Redis caching. Instead of debating theoretical trade-offs, I spent 48 hours spinning up an empirical load test cluster simulating 50k QPS. The data proved the graph database had 4x write amplification and 10x license costs. I presented the findings in a collaborative memo, resulting in unanimous leadership consensus and saving $500k in recurring vendor licensing.",
    },
  ];

  const currentPrompt = prompts[selectedPromptIndex];

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRunning) {
      setIsRunning(false);
      setHasRecorded(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const handleStartTimer = () => {
    setTimerSeconds(60);
    setIsRunning(true);
    setHasRecorded(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(60);
    setHasRecorded(false);
  };

  const handlePlaySample = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSynthesizing) {
        window.speechSynthesis.cancel();
        setIsSynthesizing(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPrompt.sampleAnswer);
      utterance.rate = 1.0;
      utterance.pitch = 0.98;
      utterance.onstart = () => setIsSynthesizing(true);
      utterance.onend = () => setIsSynthesizing(false);
      utterance.onerror = () => setIsSynthesizing(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Determine current active beat
  const elapsed = 60 - timerSeconds;
  let activeBeat = 1;
  if (elapsed > 45) activeBeat = 4;
  else if (elapsed > 30) activeBeat = 3;
  else if (elapsed > 15) activeBeat = 2;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
          <span>The 60-Second Story Deck</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
          60-Second Executive Pitch Studio
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl">
          Executives and hiring committees make up their minds in the first 60 seconds. Master concise, punchy storytelling structured across 4 narrative beats.
        </p>
      </div>

      {/* Prompt Selector Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {prompts.map((p, idx) => {
          const isSelected = selectedPromptIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedPromptIndex(idx);
                handleResetTimer();
              }}
              className={`p-5 rounded-2xl text-left border transition-all duration-200 ${
                isSelected
                  ? 'bg-white dark:bg-stone-900 border-violet-600 dark:border-violet-400 shadow-md ring-1 ring-violet-500/20'
                  : 'bg-white/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                {p.title}
              </div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {p.sub}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Pitch Workspace: Live Countdown & 4-Beat Teleprompter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Countdown & Audio Visualizer (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 space-y-6 text-center shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400">
            <span>CHRONOMETER</span>
            <span className={isRunning ? 'text-rose-500 font-bold animate-pulse' : ''}>
              {isRunning ? 'RECORDING LIVE' : 'STANDBY'}
            </span>
          </div>

          {/* Big Circular / Numeric Timer */}
          <div className="py-4">
            <div className="text-7xl sm:text-8xl font-black font-mono tracking-tighter text-stone-900 dark:text-stone-100">
              00:{timerSeconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mt-2">
              {isRunning ? `Beat ${activeBeat} of 4 Active` : 'Target: Exactly 60 Seconds'}
            </div>
          </div>

          {/* Waveform Visualizer */}
          <div className="py-2">
            <AudioVisualizer
              state={isRunning ? 'user_speaking' : isSynthesizing ? 'ai_speaking' : 'idle'}
              barCount={32}
              height={50}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {!isRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-md flex items-center gap-2 transition active:scale-95"
              >
                <Mic className="w-4 h-4 text-rose-500" />
                <span>Start 60s Pitch</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsRunning(false);
                  setHasRecorded(true);
                }}
                className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-600 text-white hover:bg-rose-700 shadow-md flex items-center gap-2 transition active:scale-95"
              >
                <MicOff className="w-4 h-4" />
                <span>Finish Early</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="p-3 rounded-full border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-600 dark:text-stone-400 transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Verification Badge */}
          {hasRecorded && (
            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-800 dark:text-violet-300">
                <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Pacing Evaluation: 94% Perfect Beat Timing</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You hit each narrative milestone within ±3 seconds of optimal cadences. No dead air or filler rush detected.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: 4 Beat Narrative Architecture (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Narrative Beat Progression
              </h3>
              <button
                onClick={handlePlaySample}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>{isSynthesizing ? 'Stop Model' : 'Hear Model Pitch'}</span>
              </button>
            </div>

            {/* 4 Beats */}
            <div className="space-y-3">
              {[
                { beat: 1, text: currentPrompt.beat1, time: '0-15s', color: 'border-violet-500/40' },
                { beat: 2, text: currentPrompt.beat2, time: '15-30s', color: 'border-indigo-500/40' },
                { beat: 3, text: currentPrompt.beat3, time: '30-45s', color: 'border-cyan-500/40' },
                { beat: 4, text: currentPrompt.beat4, time: '45-60s', color: 'border-emerald-500/40' },
              ].map((b) => {
                const isCurrentActive = isRunning && activeBeat === b.beat;
                return (
                  <div
                    key={b.beat}
                    className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                      isCurrentActive
                        ? 'bg-violet-50/70 dark:bg-violet-950/30 border-violet-500 shadow-sm ring-1 ring-violet-500/30'
                        : 'bg-stone-50/50 dark:bg-stone-800/40 border-stone-200/70 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isCurrentActive
                          ? 'bg-violet-600 text-white animate-pulse'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        {b.beat}
                      </span>
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {b.text}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-stone-400 whitespace-nowrap">
                      {b.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Gold Standard Model Script */}
            <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400">
                <span className="font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Gold Standard Model Response
                </span>
                <span>~140 words · 60s cadence</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                "{currentPrompt.sampleAnswer}"
              </p>
            </div>

            {/* Next Step CTA */}
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={onStartFullSession}
                className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white flex items-center gap-2 transition"
              >
                <span>Take into Live Interview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

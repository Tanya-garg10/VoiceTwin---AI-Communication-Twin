import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Activity, Play, Pause, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { VoiceWaveSignal } from './VoiceWaveSignal';

export const SpeechLabView: React.FC<{ onStartSession: () => void }> = ({ onStartSession }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [testText, setTestText] = useState(
    "In our architecture, we mitigate Kafka partition assignment delays by leveraging cooperative sticky rebalancing and configuring static group membership."
  );
  const [analyzed, setAnalyzed] = useState(true);
  const [isPlayingWarmup, setIsPlayingWarmup] = useState(false);

  // Live acoustic diagnostics
  const [metrics, setMetrics] = useState({
    wpm: 138,
    pitchModulation: 84, // %
    hesitationRatio: 12, // %
    fillersPerMin: 1.2,
    clarityScore: 89,
    breathControl: 82,
  });

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setAnalyzed(true);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setAnalyzed(true);
        setMetrics({
          wpm: Math.floor(130 + Math.random() * 15),
          pitchModulation: 86,
          hesitationRatio: 9,
          fillersPerMin: 0.8,
          clarityScore: 92,
          breathControl: 88,
        });
      }, 4000);
    }
  };

  const playWarmupAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingWarmup) {
        window.speechSynthesis.cancel();
        setIsPlayingWarmup(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Breathe from your diaphragm. Inhale for two seconds. Speak your opening sentence with calm, downward vocal inflection: The architecture is stable."
      );
      utterance.rate = 0.95;
      utterance.pitch = 0.98;
      utterance.onstart = () => setIsPlayingWarmup(true);
      utterance.onend = () => setIsPlayingWarmup(false);
      utterance.onerror = () => setIsPlayingWarmup(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingWarmup(true);
      setTimeout(() => setIsPlayingWarmup(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16 text-left select-none text-stone-900 dark:text-stone-100">
      {/* 1. Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
          ACOUSTIC SPEECH LABORATORY
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
          VOCAL RESONANCE & BIOMETRICS
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl font-normal">
          Calibrate your speech cadence, pitch dynamic range, and acoustic pause management before entering high-stakes conversations.
        </p>
      </div>

      {/* 2. Interactive Vocal Mirror & Recording Pod */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-violet-600 dark:text-violet-400 block">
              REAL-TIME VOCAL MIRROR
            </span>
            <h3 className="text-xl font-bold tracking-tight mt-0.5">Test Your Articulation Sample</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={playWarmupAudio}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 ${
                isPlayingWarmup
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              {isPlayingWarmup ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingWarmup ? 'Pause Coach' : 'Diaphragm Warmup'}</span>
            </button>

            <button
              onClick={handleToggleRecord}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all active:scale-95 flex items-center gap-2 ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Listening (4s)...' : 'Record Sample'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Waveform Screen */}
        <div className="p-4 rounded-2xl bg-[#faf9f5] dark:bg-stone-950/60 border border-stone-200/60 dark:border-stone-800 flex flex-col items-center">
          <AudioVisualizer state={isRecording ? 'user_speaking' : 'idle'} height={68} barCount={44} />
          <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-2 italic text-center">
            "{testText}"
          </p>
        </div>

        {/* Diagnostic Spectrum Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">CADENCE</span>
            <span className="text-2xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              {metrics.wpm}
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">WPM (135–145 sweet spot)</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">PITCH RANGE</span>
            <span className="text-2xl font-black font-mono tracking-tight text-violet-600 dark:text-violet-400">
              {metrics.pitchModulation}%
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">Dynamic (Non-monotone)</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">HESITATION</span>
            <span className="text-2xl font-black font-mono tracking-tight text-stone-900 dark:text-stone-100">
              {metrics.hesitationRatio}%
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">Pause Stability</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">FILLERS</span>
            <span className="text-2xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              {metrics.fillersPerMin}
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">Per Minute</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">CLARITY</span>
            <span className="text-2xl font-black font-mono tracking-tight text-cyan-600 dark:text-cyan-400">
              {metrics.clarityScore}%
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">Consonant Crispness</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/60 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800/60 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">BREATH</span>
            <span className="text-2xl font-black font-mono tracking-tight text-stone-900 dark:text-stone-100">
              {metrics.breathControl}%
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">Diaphragm Poise</span>
          </div>
        </div>
      </section>

      {/* 3. Three Editorial Principles of Executive Speech */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold tracking-tight">The 3 Principles of Executive Cadence</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
            <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">01</span>
            <h4 className="text-base font-bold">The Strategic 1.2-Second Silence</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
              When an interviewer asks a complex question, novice engineers speak instantly and fill silence with "um". Leaders pause 1.2 seconds to frame the macro architecture. Silence projects cognitive command.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">02</span>
            <h4 className="text-base font-bold">Downward Vocal Inflection</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
              Ending declarative sentences with rising pitch makes statements sound like questions. Finish architectural conclusions with a calm downward cadence to convey conviction.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">03</span>
            <h4 className="text-base font-bold">The 135 WPM Sweet Spot</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
              Under cognitive stress, speech naturally accelerates beyond 170 WPM. Consciously grounding yourself at 135–140 WPM forces concise word choice and lets listeners absorb technical trade-offs.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-500/[0.05] via-transparent to-cyan-500/[0.05] border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-lg font-bold">Ready to apply these vocal acoustics in a live interview?</h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Launch a 1-on-1 session with AI Staff Architect Sarah Chen and receive real-time cadence feedback.
          </p>
        </div>

        <button
          onClick={onStartSession}
          className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm flex items-center gap-2 transition active:scale-95 shrink-0"
        >
          <span>ENTER LIVE STUDIO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

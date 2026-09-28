import React, { useState, useEffect, useRef } from 'react';
import { Flame, Clock, AlertOctagon, Mic, MicOff, Play, RotateCcw, Sparkles, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

interface PressureModeViewProps {
  onNavigateToAnalysis: () => void;
}

export const PressureModeView: React.FC<PressureModeViewProps> = ({ onNavigateToAnalysis }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [fillersCount, setFillersCount] = useState(0);
  const [wpm, setWpm] = useState(135);
  const [isMicOn, setIsMicOn] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = {
    title: "Black Friday Flash Sale Production Outage",
    interviewer: "Sarah Chen, VP of Infrastructure",
    prompt: "The primary database lock contention spiked to 98% during peak traffic. Orders are dropping, and the VP is on speakerphone right now. In 30 seconds, what are your immediate 3 triage actions to stop the bleeding without crashing checkout?",
    constraint: "Strict 30-second limit • Zero filler words • Direct action steps"
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setHasFinished(false);
    setTimeLeft(30);
    setTranscript('');
    setFillersCount(0);
    setEvaluation(null);
    setIsMicOn(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setHasFinished(false);
    setTimeLeft(30);
    setTranscript('');
    setFillersCount(0);
    setIsMicOn(false);
    setEvaluation(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleComplete = (finalText?: string) => {
    setIsActive(false);
    setIsMicOn(false);
    setHasFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const spoken = finalText || transcript || "First, shed non-critical read traffic by enabling aggressive CDN caching. Second, isolate the offending bulk write queries via pg_stat_activity and terminate hanging transactions. Third, scale read replicas and notify the war room.";
    
    // Simulate real-time pressure evaluation
    const detectedFillers = (spoken.match(/\b(um|uh|basically|like|sort of)\b/gi) || []).length;
    setFillersCount(detectedFillers);

    setEvaluation({
      composureScore: detectedFillers === 0 ? 92 : 78,
      decisiveness: 94,
      conciseness: 90,
      triageAccuracy: 95,
      verdict: "High-Caliber Crisis Handling",
      aiReaction: "Crisp triage sequencing. You immediately isolated read shedding before terminating queries, preserving customer checkout sessions.",
      coachTip: "Your pace accelerated to 172 WPM in the final 5 seconds. Remember to breathe—a calm voice projects command in the incident war room."
    });
  };

  const handleSimulateAnswer = () => {
    const demoPressureAnswer = "First: immediately shed read load to Redis and edge caches. Second: kill the long-running analytical query blocking write locks on the orders table via pg_terminate_backend. Third: spin up two additional read replicas and divert search queries. All within 90 seconds.";
    setTranscript(demoPressureAnswer);
    setWpm(168);
    handleComplete(demoPressureAnswer);
  };

  return (
    <div className="space-y-4">
      {/* Alert Header */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/60 border border-red-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Flame className="w-6 h-6 text-red-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Pressure Mode: 30-Second Hot Seat</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wider">
                  Adaptive Stress Simulator
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Evaluates verbal composure, pause management, and zero-filler conciseness under strict clock constraints.
              </p>
            </div>
          </div>

          {/* Large Countdown Display */}
          <div className="flex items-center gap-3">
            <div className={`px-5 py-2.5 rounded-xl border flex items-center gap-3 ${
              timeLeft <= 10 && isActive
                ? 'bg-red-950 border-red-500 animate-pressure-pulse text-red-400'
                : 'bg-slate-950/90 border-slate-800 text-cyan-300'
            }`}>
              <Clock className={`w-5 h-5 ${timeLeft <= 10 && isActive ? 'text-red-400 animate-spin' : 'text-slate-400'}`} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-slate-400">Time Remaining</span>
                <span className="font-mono text-2xl font-black">
                  00:{timeLeft.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {!isActive ? (
              <button
                onClick={handleStart}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Activate Hot Seat</span>
              </button>
            ) : (
              <button
                onClick={() => handleComplete()}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Answer Early</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Reset Drill"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Crisis Scenario Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Scenario & Teleprompter (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              Live Crisis Prompt
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Caller: <span className="text-slate-200 font-semibold">{scenario.interviewer}</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-red-500/30">
            <h3 className="text-sm font-bold text-white mb-2">{scenario.title}</h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              "{scenario.prompt}"
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{scenario.constraint}</span>
            </div>
          </div>

          {/* Audio Visualizer on Pressure */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mb-1">
              Audio Waveform & Pitch Agitation
            </span>
            <AudioVisualizer state={isActive ? 'pressure' : 'idle'} height={60} />
          </div>

          {/* Live Transcript / Candidate Spoken Text */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Your Live Response:</span>
              <span className="font-mono text-cyan-400">
                {transcript.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Speak directly into your mic during the 30-second window, or use the quick simulation button below..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleSimulateAnswer}
                className="px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Staff 30s Crisis Answer</span>
              </button>

              <span className="text-[11px] text-slate-400">
                Optimal pace: <span className="text-emerald-400 font-mono font-bold">140 WPM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Pressure Evaluation & Composure Diagnostics (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Composure Diagnostics
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Real-Time Evaluation</span>
            </div>

            {evaluation ? (
              <div className="mt-4 space-y-3.5">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold">Composure Score</span>
                    <h4 className="text-2xl font-black text-white">{evaluation.composureScore}/100</h4>
                    <span className="text-xs text-emerald-300">{evaluation.verdict}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-black text-lg">
                    {evaluation.composureScore}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Decisiveness</span>
                    <span className="text-sm font-bold text-cyan-300">{evaluation.decisiveness}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Conciseness</span>
                    <span className="text-sm font-bold text-indigo-300">{evaluation.conciseness}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Fillers Lost</span>
                    <span className="text-sm font-bold text-emerald-400">{fillersCount}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-indigo-300 block mb-0.5">AI Interviewer Reaction:</span>
                    <p className="text-slate-300 leading-relaxed">{evaluation.aiReaction}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="font-semibold text-amber-300 block mb-0.5">Executive Presence Coach:</span>
                    <p className="text-slate-300 leading-relaxed">{evaluation.coachTip}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
                <div className="w-14 h-14 rounded-2xl bg-red-950/40 border border-red-500/20 flex items-center justify-center">
                  <Flame className="w-7 h-7 text-red-400 opacity-60" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Hot Seat Inactive</h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Click "Activate Hot Seat" or "Simulate Staff 30s Crisis Answer" to trigger the cognitive stress diagnostic.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onNavigateToAnalysis}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
            >
              <span>View Cumulative Session Analysis</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

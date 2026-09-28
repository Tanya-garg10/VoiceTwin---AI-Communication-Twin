import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Clock, Sparkles, CheckCircle2, ChevronRight, Activity, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SAMPLE_FILLERS } from '../data/mockData';

interface SessionAnalyticsViewProps {
  onNavigateToImprove: () => void;
}

export const SessionAnalyticsView: React.FC<SessionAnalyticsViewProps> = ({ onNavigateToImprove }) => {
  const pillars = [
    { name: 'Clarity', score: 84, target: 90, color: 'text-cyan-400', bar: 'bg-cyan-500', note: 'Clear technical terminology, minimal jargon misuse' },
    { name: 'Confidence', score: 78, target: 88, color: 'text-indigo-400', bar: 'bg-indigo-500', note: 'Strong opening, but wavered during partition edge case' },
    { name: 'Relevance', score: 92, target: 95, color: 'text-emerald-400', bar: 'bg-emerald-500', note: 'Directly addressed Kafka cooperative sticky protocols' },
    { name: 'Conciseness', score: 68, target: 85, color: 'text-amber-400', bar: 'bg-amber-500', note: 'Over-extended backstory on eager rebalancing delays' },
    { name: 'Tech Depth', score: 88, target: 92, color: 'text-purple-400', bar: 'bg-purple-500', note: 'Mastery of consumer group coordinators and KRaft' }
  ];

  return (
    <div className="space-y-4">
      {/* Top Session Summary Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Session #101 Diagnostic
            </span>
            <span className="text-xs text-slate-400">Completed Today, 09:15 AM</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Forensic Speech & Communication Report</h2>
          <p className="text-xs text-slate-400">
            Topic: <span className="text-slate-200 font-semibold">Kafka Consumer Rebalancing & Lag Triage</span> • Duration: <span className="text-cyan-300 font-mono">4m 12s</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-mono font-black text-indigo-400 text-lg">
              82
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall Score</span>
              <span className="text-xs font-bold text-white">Proficient Communicator</span>
            </div>
          </div>

          <button
            onClick={onNavigateToImprove}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition"
          >
            <span>AI Answer Polisher</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Pillar Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {pillars.map((p) => (
          <div key={p.name} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">{p.name}</span>
              <span className={`text-base font-bold font-mono ${p.color}`}>{p.score}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${p.bar}`}
                style={{ width: `${p.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Target: {p.target}%</span>
              <span>{p.score >= p.target ? '✓ Met' : `${p.target - p.score}% gap`}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight pt-1 border-t border-slate-800/80 line-clamp-2">
              {p.note}
            </p>
          </div>
        ))}
      </div>

      {/* Deep-Dive Grid: Filler Forensics & Pace Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Filler Words Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verbal Crutches & Filler Forensics</h3>
            </div>
            <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              24 Total Detected
            </span>
          </div>

          <div className="space-y-3">
            {SAMPLE_FILLERS.map((f) => (
              <div key={f.word} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono font-bold text-xs">
                      "{f.word}"
                    </span>
                    <span className="text-xs text-slate-400">× {f.count} occurrences</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {f.timestamps.slice(0, 3).map((ts, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {ts}
                      </span>
                    ))}
                    {f.timestamps.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono">+{f.timestamps.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/50 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Voice Coach Replacement:</strong> {f.replacementTip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pace & Cadence Analysis (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Speech Cadence & Pacing</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">168 WPM Avg</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Pace Spectrum:</span>
                  <span className="text-amber-400 font-semibold font-mono">168 WPM (Fast)</span>
                </div>

                <div className="relative h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  {/* Optimal Zone indicator (130-150) */}
                  <div className="absolute left-[40%] width-[20%] h-full bg-emerald-500/25 border-x border-emerald-500/40" />
                  {/* Candidate Current Position */}
                  <div className="absolute left-[65%] top-0 bottom-0 w-1.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400" />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Slow (&lt;110)</span>
                  <span className="text-emerald-400 font-semibold">Optimal (135–145)</span>
                  <span>Rushed (&gt;165)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 text-xs">
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                  Cognitive Load Observation
                </span>
                <p className="text-slate-300 leading-relaxed">
                  During Question 1, when challenged on stop-the-world rebalance delays, your pace surged from 140 WPM to 175 WPM. This signals subconscious cognitive panic to the interviewer.
                </p>
                <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[11px]">
                  💡 <strong>Prescription:</strong> When faced with an architectural edge case, insert a deliberate 1.5-second silent pause before speaking. This projects calm executive authority.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onNavigateToImprove}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
            >
              <span>See Before vs After Answer Transformation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

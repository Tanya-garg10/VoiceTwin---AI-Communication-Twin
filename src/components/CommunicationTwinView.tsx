import React from 'react';
import { User, Award, TrendingUp, History, Shield, Zap, Sparkles, ChevronRight, Activity, Target } from 'lucide-react';
import { INITIAL_TWIN_PROFILE } from '../data/mockData';

interface CommunicationTwinViewProps {
  onStartSession: () => void;
  onNavigateToAnalysis: () => void;
}

export const CommunicationTwinView: React.FC<CommunicationTwinViewProps> = ({
  onStartSession,
  onNavigateToAnalysis
}) => {
  const profile = INITIAL_TWIN_PROFILE;

  // Radar polygon computation for SVG
  const size = 260;
  const center = size / 2;
  const radius = 95;
  const numSides = profile.radarScores.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const candidatePoints = profile.radarScores.map((item, idx) => {
    const { x, y } = getCoordinates(item.score, idx);
    return `${x},${y}`;
  }).join(' ');

  const targetPoints = profile.radarScores.map((item, idx) => {
    const { x, y } = getCoordinates(item.target, idx);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-4">
      {/* Hero Profile & Communication Score Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-indigo-600/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Staff Candidate
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Role: <span className="text-indigo-300 font-semibold">{profile.targetRole}</span>
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-mono">
              <span>{profile.sessionsCompleted} Mock Sessions</span>
              <span>•</span>
              <span>{profile.totalPracticeMinutes} Mins Verbal Practice</span>
              <span>•</span>
              <span className="text-amber-400">{profile.fillerRatePerMin} Fillers/Min</span>
            </div>
          </div>
        </div>

        {/* Big Overall Communication Score Gauge */}
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 flex items-center gap-4 shadow-lg shadow-indigo-950/30">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500"
                  strokeDasharray={`${profile.overallScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono font-black text-xl text-white">
                {profile.overallScore}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 uppercase font-mono font-bold block">
                Communication Twin Score
              </span>
              <span className="text-sm font-bold text-white">Advanced Architect</span>
              <span className="text-[11px] text-emerald-400 block mt-0.5">+6 pts this week</span>
            </div>
          </div>

          <button
            onClick={onStartSession}
            className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Launch Live Interview</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Archetype Evolution + Voice DNA Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Communication Archetype & Progression (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">VoiceTwin Archetype Matrix</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Progression: {profile.archetypeMatch}%
            </span>
          </div>

          {/* Archetype Transition Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Current Communication Archetype</span>
                <span className="text-base font-bold text-amber-300">{profile.archetype}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
              <div className="text-right">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Target Executive Archetype</span>
                <span className="text-base font-bold text-cyan-300">{profile.targetArchetype}</span>
              </div>
            </div>

            {/* Progression Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${profile.archetypeMatch}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Rambling (High Depth / Low Conciseness)</span>
                <span>Crisp Staff (High Depth / Zero Fluff)</span>
              </div>
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/20 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                ✓ Proven Strengths
              </span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {profile.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                ⚠️ Voice Twin Growth Areas
              </span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {profile.growthAreas.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Interactive Voice DNA Radar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between items-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Voice & Speech DNA</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Alex
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Staff Benchmark
              </span>
            </div>
          </div>

          {/* SVG Radar Chart */}
          <div className="relative py-2 flex items-center justify-center">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric Web Rings */}
              {[0.25, 0.5, 0.75, 1.0].map((level, ringIdx) => {
                const ringPoints = profile.radarScores.map((_, idx) => {
                  const { x, y } = getCoordinates(level * 100, idx);
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <polygon
                    key={ringIdx}
                    points={ringPoints}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.15)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis lines */}
              {profile.radarScores.map((_, idx) => {
                const { x, y } = getCoordinates(100, idx);
                return (
                  <line
                    key={idx}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(148, 163, 184, 0.2)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target Benchmark Polygon */}
              <polygon
                points={targetPoints}
                fill="rgba(6, 182, 212, 0.08)"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Candidate Actual Polygon */}
              <polygon
                points={candidatePoints}
                fill="rgba(99, 102, 241, 0.25)"
                stroke="#818cf8"
                strokeWidth="2"
              />

              {/* Data points */}
              {profile.radarScores.map((item, idx) => {
                const { x, y } = getCoordinates(item.score, idx);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="3.5"
                    className="fill-indigo-400 stroke-slate-900 stroke-2"
                  />
                );
              })}

              {/* Labels */}
              {profile.radarScores.map((item, idx) => {
                const angle = (Math.PI * 2 / numSides) * idx - Math.PI / 2;
                const labelRadius = radius + 22;
                const lx = center + labelRadius * Math.cos(angle);
                const ly = center + labelRadius * Math.sin(angle);

                return (
                  <text
                    key={idx}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] font-mono fill-slate-300 font-semibold"
                  >
                    {item.label}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="w-full pt-3 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-400">
              Conciseness (+18% required) is the single blocker to reaching target archetype.
            </span>
          </div>
        </div>
      </div>

      {/* Session History Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent VoiceTwin Sessions</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">{profile.sessionsCompleted} Total Sessions Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80 font-mono text-[11px]">
                <th className="pb-2 font-semibold">Date & Time</th>
                <th className="pb-2 font-semibold">Topic Tested</th>
                <th className="pb-2 font-semibold">Target Level</th>
                <th className="pb-2 font-semibold">Score</th>
                <th className="pb-2 font-semibold">Duration</th>
                <th className="pb-2 font-semibold">Fillers Detected</th>
                <th className="pb-2 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {profile.recentSessions.map((sess) => (
                <tr key={sess.id} className="hover:bg-slate-950/40 transition">
                  <td className="py-3 font-mono text-slate-300">{sess.date}</td>
                  <td className="py-3 font-medium text-white">{sess.topic}</td>
                  <td className="py-3 text-slate-400">{sess.role}</td>
                  <td className="py-3 font-mono font-bold text-indigo-400">{sess.score}/100</td>
                  <td className="py-3 font-mono text-slate-400">{sess.duration}</td>
                  <td className="py-3 font-mono text-amber-400">{sess.fillersCount} crutches</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={onNavigateToAnalysis}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition"
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

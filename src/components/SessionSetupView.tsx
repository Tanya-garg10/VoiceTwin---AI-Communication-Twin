import React, { useState } from 'react';
import {
  Mic,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Radio,
  Cpu,
  Layers,
  Flame,
  Volume2,
  Sliders,
  ChevronRight,
  User,
  Bot,
  Zap
} from 'lucide-react';
import { PRESET_ROLES } from '../data/mockData';
import { AudioVisualizer } from './AudioVisualizer';

interface SessionSetupViewProps {
  onEnterLiveRoom: (config: {
    role: typeof PRESET_ROLES[0];
    roundType: string;
    difficulty: string;
    mode: 'conversational' | 'pressure';
  }) => void;
  onExploreOtherTab: (tabId: string) => void;
  onBackToHome: () => void;
}

export const SessionSetupView: React.FC<SessionSetupViewProps> = ({
  onEnterLiveRoom,
  onExploreOtherTab,
  onBackToHome
}) => {
  const [selectedRole, setSelectedRole] = useState(PRESET_ROLES[0]);
  const [roundType, setRoundType] = useState('Technical Architecture & Deep-Dive');
  const [difficulty, setDifficulty] = useState('Staff / Principal (L6+)');
  const [mode, setMode] = useState<'conversational' | 'pressure'>('conversational');
  const [micTested, setMicTested] = useState(false);
  const [isTestingMic, setIsTestingMic] = useState(false);

  const rounds = [
    {
      id: 'tech',
      title: 'Technical Architecture & Deep-Dive',
      desc: 'Probes concurrency, partition rebalancing, caching, and failure modes.',
      interviewer: 'Sarah Chen, Staff Infrastructure Architect'
    },
    {
      id: 'incident',
      title: 'System Design & Distributed Scalability',
      desc: 'High-throughput event sourcing, rate limiting, and global consistency.',
      interviewer: 'David Rossi, Director of Platform'
    },
    {
      id: 'star',
      title: 'Executive Behavioral & Leadership (STAR)',
      desc: 'Conflict resolution, cross-functional roadblocks, and production war rooms.',
      interviewer: 'Elena Rostova, VP of Engineering'
    }
  ];

  const handleTestMic = () => {
    setIsTestingMic(true);
    setTimeout(() => {
      setIsTestingMic(false);
      setMicTested(true);
    }, 2400);
  };

  const handleLaunch = () => {
    onEnterLiveRoom({
      role: selectedRole,
      roundType,
      difficulty,
      mode
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Top Banner & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 group"
            >
              <span>← Back to Overview</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Studio Launchpad
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Configure Your Live Voice Session
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Set your target role, select the AI interviewer persona, and test low-latency RTC audio before entering the room.
          </p>
        </div>

        {/* Quick Quicklinks into other tabs */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onExploreOtherTab('dashboard')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            Twin DNA
          </button>
          <button
            onClick={() => onExploreOtherTab('analysis')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            Past Reports
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Target Role */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Target Engineering Role
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Select level</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_ROLES.map((r) => {
                const isSelected = selectedRole.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="font-bold text-xs text-white leading-tight">{r.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{r.defaultTopic}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Interview Round & Persona */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-400 border border-purple-500/40 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interview Round & Topic
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {rounds.map((round) => {
                const isSelected = roundType === round.title;
                return (
                  <button
                    key={round.id}
                    onClick={() => setRoundType(round.title)}
                    className={`w-full p-3.5 rounded-xl border text-left transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-950/30 border-purple-500 text-white shadow-lg shadow-purple-600/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{round.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{round.desc}</div>
                      <div className="text-[10px] text-purple-300 font-mono mt-1">
                        Interviewer: {round.interviewer}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Intensity & Mode */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Session Intensity Mode
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setMode('conversational')}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  mode === 'conversational'
                    ? 'bg-cyan-950/30 border-cyan-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-white">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Conversational Flow</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Natural back-and-forth dialogue with deep contextual follow-ups.
                  </p>
                </div>
                <span className="text-[10px] text-cyan-300 font-mono mt-2 block">Standard ~15 Mins</span>
              </button>

              <button
                onClick={() => setMode('pressure')}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  mode === 'pressure'
                    ? 'bg-red-950/40 border-red-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-white">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    <span>Pressure Hot Seat</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Strict 30-second ticking clock with penalty for hesitations and fillers.
                  </p>
                </div>
                <span className="text-[10px] text-red-400 font-mono mt-2 block">Rapid Fire Drill</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Audio & Device Check & Launch Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Audio & Device Pre-flight Check */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Pre-Flight Hardware Check
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Agora RTC Edge</span>
            </div>

            {/* Hardware diagnostics checklist */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Agora Audio Gateway</span>
                    <span className="text-[10px] text-slate-400">Singapore / Global SD-RTN</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-[11px]">34ms (Fast)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">LLM Reasoning Engine</span>
                    <span className="text-[10px] text-slate-400">Gemini 3.8 Flash Streaming</span>
                  </div>
                </div>
                <span className="text-purple-400 font-mono font-bold text-[11px]">Online</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    micTested ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Microphone Access</span>
                    <span className="text-[10px] text-slate-400">
                      {micTested ? 'Hardware VAD Calibrated' : 'Web Speech / Mic check'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleTestMic}
                  disabled={isTestingMic}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold transition"
                >
                  {isTestingMic ? 'Listening...' : micTested ? '✓ Tested' : 'Test Mic'}
                </button>
              </div>
            </div>

            {/* Audio Wave preview during test */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                Audio Waveform Frequency
              </span>
              <AudioVisualizer state={isTestingMic ? 'user_speaking' : 'idle'} height={48} barCount={28} />
            </div>
          </div>

          {/* Launch Room Button Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 shadow-2xl space-y-4">
            <div>
              <span className="text-[10px] text-indigo-400 uppercase font-mono font-bold block">
                Ready to Practice
              </span>
              <h3 className="text-lg font-bold text-white">Enter Live Practice Room</h3>
              <p className="text-xs text-slate-300 mt-1">
                You will be connected to <strong className="text-indigo-200">Sarah Chen</strong> for a 1-on-1 voice interview on <strong className="text-white">{selectedRole.name}</strong>.
              </p>
            </div>

            <button
              onClick={handleLaunch}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition active:scale-95 group"
            >
              <Mic className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition" />
              <span>{mode === 'pressure' ? '🚀 Enter 30s Hot Seat' : '🚀 Enter Live Voice Room'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Zero-latency WebRTC</span>
              <span>•</span>
              <span>Real-time Biometrics</span>
              <span>•</span>
              <span>STAR Polisher Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

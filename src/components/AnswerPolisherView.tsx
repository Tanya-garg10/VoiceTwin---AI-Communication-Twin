import React, { useState } from 'react';
import { Sparkles, Volume2, ArrowRight, CheckCircle2, RotateCcw, Award, Play, Pause, Zap, Target } from 'lucide-react';
import { SAMPLE_IMPROVED_ANSWER } from '../data/mockData';

interface AnswerPolisherViewProps {
  onNavigateToTwin: () => void;
  onNavigateToLive: () => void;
}

export const AnswerPolisherView: React.FC<AnswerPolisherViewProps> = ({
  onNavigateToTwin,
  onNavigateToLive
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const data = SAMPLE_IMPROVED_ANSWER;

  const playAiDelivery = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.improvedAnswer);
      utterance.rate = 0.98; // Steady executive pace (~135 WPM)
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Answer Transformation Engine
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {data.twinArchetypeProgress}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Before vs. After: AI Answer Polisher</h2>
          <p className="text-xs text-slate-400">
            Raw candidate transcript refined into an executive, high-impact Staff Engineer delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playAiDelivery}
            className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 ${
              isPlayingAudio
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlayingAudio ? 'Pause AI Delivery' : 'Listen to AI Executive Cadence'}</span>
          </button>

          <button
            onClick={onNavigateToTwin}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <span>View Communication Twin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Original Spoken Candidate Answer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Candidate Raw Delivery</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Score: {data.originalScore}/100
              </span>
            </div>

            <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2">
              <p>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">Um</span>, so <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">basically</span>, when Kafka does rebalancing, <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">like</span> when a consumer crashes or a new one joins, traditionally it uses eager rebalancing. And in eager rebalancing, <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">you know</span>, all consumers stop reading from their partitions at once, which causes this big stop-the-world delay. So, <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">like</span>, to fix that, you would use cooperative sticky rebalancing, which only revokes the partitions that actually need to move. Also, <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">I guess</span> you can tune session timeouts and heartbeat intervals, or <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/40">basically</span> use static group membership so pods restarting don't trigger rebalances every single time.
              </p>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Diagnostic Flaws</span>
              <ul className="text-slate-400 space-y-1 list-disc list-inside text-[11px]">
                <li>11 conversational crutches dilute technical authority</li>
                <li>Rambling sentence structure (48s answer duration)</li>
                <li>Hedged with "I guess" instead of stating protocol mechanics</li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            Candidate Cadence: 168 WPM • High Cognitive Friction
          </div>
        </div>

        {/* Right: VoiceTwin Polished Answer */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">VoiceTwin Polished Delivery</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                Score: {data.improvedScore}/100 (+25)
              </span>
            </div>

            <div className="mt-3 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm leading-relaxed text-indigo-100 font-medium space-y-2">
              <p>
                "{data.improvedAnswer}"
              </p>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
              <span className="text-[10px] text-indigo-300 uppercase font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Key Structural Upgrades
              </span>
              <div className="space-y-1">
                {data.keyImprovements.map((imp, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-cyan-300 font-mono">
              Delivery Pace: 135 WPM • Authoritative Staff Executive
            </span>

            <button
              onClick={onNavigateToLive}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again (Re-Drill)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

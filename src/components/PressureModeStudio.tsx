import React, { useState, useEffect, useRef } from 'react';
import { VoiceOrb } from './VoiceOrb';
import { LiveAudioWaveFooter } from './VoiceWaveSignal';
import { Clock, Play, RotateCcw, CheckCircle2, ArrowRight, ShieldAlert, Square } from 'lucide-react';

interface PressureModeStudioProps {
  onCompletePressure: () => void;
  onExit: () => void;
}

export const PressureModeStudio: React.FC<PressureModeStudioProps> = ({
  onCompletePressure,
  onExit,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [userTranscript, setUserTranscript] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinish();
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

  const handleFinish = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    onCompletePressure();
  };

  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  return (
    <div className="relative min-h-[82vh] flex flex-col justify-between items-center px-6 py-8 select-none transition-colors duration-700 text-stone-900 dark:text-stone-100">
      {/* Background becomes subtly warmer (warm terracotta/amber amber ambient glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#fbf8f2] dark:from-[#14100c] dark:via-[#19140f] dark:to-[#120e0a] -z-10 pointer-events-none" />

      {/* Top Pressure Header */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-extrabold tracking-[0.2em] uppercase text-xs">
            PRESSURE MODE • 30 SECONDS
          </span>
        </div>

        <button
          onClick={onExit}
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wider text-[11px]"
        >
          Exit Drill
        </button>
      </div>

      {/* Center Challenge Area */}
      <div className="flex flex-col items-center justify-center my-auto py-6 space-y-6 text-center max-w-xl">
        {/* Delicate Circular Countdown Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="46"
              className="text-stone-200/80 dark:text-stone-800"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
            />
            {/* Animated progress ring */}
            <circle
              cx="50"
              cy="50"
              r="46"
              className="text-amber-600 dark:text-amber-400 transition-all duration-1000 ease-linear"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
            />
          </svg>

          {/* Large Countdown Digit in center */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-mono font-black tracking-tight text-stone-900 dark:text-stone-100">
              {timeLeft}
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400">SEC</span>
          </div>
        </div>

        {/* Challenge prompt */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            “Convince me why your solution is better.”
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
            State your 2 key architectural justifications without filler words or conversational hedging.
          </p>
        </div>

        {/* Challenge Level Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-bold tracking-wider uppercase">
          <span>CHALLENGE LEVEL</span>
          <span className="text-amber-800 dark:text-amber-200">•</span>
          <span>HIGH</span>
        </div>
      </div>

      {/* Floating Bottom Hardware Finish Button */}
      <div className="w-full max-w-md flex flex-col items-center gap-3">
        <button
          onClick={handleFinish}
          className="px-8 py-3.5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white text-xs font-bold tracking-wider uppercase shadow-xl transition active:scale-95 flex items-center gap-2"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>FINISH DRILL & ANALYZE</span>
        </button>

        <LiveAudioWaveFooter isLive={isActive} />
      </div>
    </div>
  );
};

import React from 'react';

interface VoiceTwinLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const VoiceTwinLogo: React.FC<VoiceTwinLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract Symbol: Voice Waveform + Twin Symmetry + Conversation */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size === 'sm' ? 24 : size === 'lg' ? 36 : 28}
          height={size === 'sm' ? 24 : size === 'lg' ? 36 : 28}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Twin Symmetrical Waveform arcs */}
          {/* Left twin acoustic node */}
          <path
            d="M8 10C8 10 11 13 11 16C11 19 8 22 8 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-stone-800 dark:text-stone-200"
          />
          {/* Left inner bar */}
          <path
            d="M5 12.5C5 12.5 6.8 14 6.8 16C6.8 18 5 19.5 5 19.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="text-stone-400 dark:text-stone-500"
          />

          {/* Central symmetrical resonance axis */}
          <line
            x1="16"
            y1="7"
            x2="16"
            y2="25"
            stroke="url(#voiceTwinGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Right twin acoustic node (mirrored symmetry) */}
          <path
            d="M24 10C24 10 21 13 21 16C21 19 24 22 24 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-stone-800 dark:text-stone-200"
          />
          {/* Right inner bar */}
          <path
            d="M27 12.5C27 12.5 25.2 14 25.2 16C25.2 18 27 19.5 27 19.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="text-stone-400 dark:text-stone-500"
          />

          <defs>
            <linearGradient id="voiceTwinGradient" x1="16" y1="7" x2="16" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed" />
              <stop offset="0.5" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-black tracking-[0.16em] uppercase text-stone-900 dark:text-stone-100 ${
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'
          }`}
        >
          VOICETWIN
        </span>
        {showTagline && (
          <span className="text-[9px] font-mono tracking-[0.2em] text-stone-600 dark:text-stone-400 uppercase">
            AI COMMUNICATION STUDIO
          </span>
        )}
      </div>
    </div>
  );
};

import React from 'react';

interface VoiceWaveSignalProps {
  score?: number; // 0-100
  label?: string;
  active?: boolean;
  color?: string;
}

export const VoiceWaveSignal: React.FC<VoiceWaveSignalProps> = ({
  score = 80,
  label,
  active = false,
  color = '#7c3aed',
}) => {
  // Generate a thin waveform SVG line based on score
  const width = 280;
  const height = 18;
  const segments = 24;
  const filledSegments = Math.round((score / 100) * segments);

  return (
    <div className="flex items-center justify-between gap-4 py-2 group">
      {label && (
        <span className="text-xs font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 w-32 shrink-0">
          {label}
        </span>
      )}

      {/* Thin Waveform Spectrum line */}
      <div className="flex-1 flex items-center gap-[3px] h-5">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments;
          // Organic amplitude wave
          const baseHeight = 4;
          const variance = Math.sin((i / segments) * Math.PI * 3) * 6;
          const barHeight = isFilled ? Math.max(3, baseHeight + Math.abs(variance)) : 2;

          return (
            <span
              key={i}
              style={{
                height: `${barHeight}px`,
                backgroundColor: isFilled
                  ? i > filledSegments - 3
                    ? '#7c3aed'
                    : '#94a3b8'
                  : 'rgba(203, 213, 225, 0.4)',
              }}
              className={`flex-1 rounded-full transition-all duration-300 ${
                isFilled && active ? 'animate-pulse' : ''
              }`}
            />
          );
        })}
      </div>

      <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 w-8 text-right">
        {score}
      </span>
    </div>
  );
};

export const LiveAudioWaveFooter: React.FC<{ isLive?: boolean }> = ({ isLive = true }) => {
  return (
    <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
      <span className="uppercase tracking-widest text-[9px] text-stone-500">VOICE SIGNAL</span>
      <div className="flex items-center gap-1 h-3">
        {[4, 8, 14, 6, 12, 16, 9, 5, 11, 15, 7, 4, 10, 6].map((h, i) => (
          <span
            key={i}
            style={{ height: `${isLive ? h : 3}px` }}
            className={`w-[2px] rounded-full transition-all duration-200 ${
              isLive ? 'bg-violet-500/70 animate-pulse' : 'bg-stone-300 dark:bg-stone-700'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-stone-400">38ms • Low-Jitter</span>
    </div>
  );
};

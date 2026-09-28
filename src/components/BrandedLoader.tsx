import React, { useState, useEffect } from 'react';
import { VoiceTwinLogo } from './VoiceTwinLogo';

interface BrandedLoaderProps {
  onComplete: () => void;
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({ onComplete }) => {
  const words = ['Listening.', 'Thinking.', 'Understanding.', 'Personalizing.'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f5] dark:bg-[#0b0c10] text-stone-900 dark:text-stone-100 select-none transition-colors duration-500">
      <div className="space-y-6 text-center">
        <VoiceTwinLogo size="lg" showTagline={true} />

        <div className="h-8 flex items-center justify-center">
          <span className="font-mono text-sm tracking-[0.25em] text-violet-600 dark:text-violet-400 font-semibold animate-pulse">
            {words[wordIndex]}
          </span>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-36 h-[1.5px] bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-300 rounded-full"
            style={{ width: `${((wordIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

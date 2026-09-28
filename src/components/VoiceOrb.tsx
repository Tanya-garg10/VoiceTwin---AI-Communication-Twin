import React, { useEffect, useRef } from 'react';

interface VoiceOrbProps {
  state?: 'idle' | 'listening' | 'speaking' | 'thinking' | 'pressure';
  size?: number;
  showOrbitPhrases?: boolean;
  interactive?: boolean;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state = 'idle',
  size = 280,
  showOrbitPhrases = true,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = (size / 2) * 0.72;

      time += 0.02;

      // Determine palette & agitation by state
      let primaryColor = 'rgba(124, 58, 237, '; // Violet
      let secondaryColor = 'rgba(56, 189, 248, '; // Soft cyan
      let speed = 1.0;
      let waveCount = 7;
      let waveAmplitude = 8;

      if (state === 'listening') {
        primaryColor = 'rgba(16, 185, 129, '; // Mint
        secondaryColor = 'rgba(59, 130, 246, '; // Electric blue
        speed = 1.4;
        waveAmplitude = 14;
      } else if (state === 'speaking') {
        primaryColor = 'rgba(139, 92, 246, '; // Aurora violet
        secondaryColor = 'rgba(236, 72, 153, '; // Soft magenta
        speed = 1.8;
        waveAmplitude = 18;
      } else if (state === 'thinking') {
        primaryColor = 'rgba(99, 102, 241, '; // Indigo
        secondaryColor = 'rgba(168, 85, 247, '; // Purple
        speed = 2.2;
        waveAmplitude = 10;
      } else if (state === 'pressure') {
        primaryColor = 'rgba(245, 158, 11, '; // Amber
        secondaryColor = 'rgba(239, 68, 68, '; // Terracotta
        speed = 2.4;
        waveAmplitude = 20;
      }

      // 1. Soft inner glow
      const radialGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.1);
      radialGradient.addColorStop(0, primaryColor + '0.08)');
      radialGradient.addColorStop(0.6, secondaryColor + '0.03)');
      radialGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric layered fluid wave lines (The Waveform Sphere)
      for (let w = 0; w < waveCount; w++) {
        const ringProgress = w / waveCount;
        const currentRadius = baseRadius * (0.45 + ringProgress * 0.55);
        const ringAlpha = (0.2 + (1 - ringProgress) * 0.45).toFixed(2);

        ctx.beginPath();
        const numPoints = 120;
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          
          // Harmonic wave distortion
          const harmonic1 = Math.sin(angle * (3 + (w % 3)) + time * speed + w * 0.8);
          const harmonic2 = Math.cos(angle * (4 - (w % 2)) - time * (speed * 0.7));
          const offset = (harmonic1 + harmonic2 * 0.6) * (waveAmplitude * (0.4 + ringProgress * 0.6));

          const r = currentRadius + offset;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        // Stroke wave line
        ctx.strokeStyle = (w % 2 === 0 ? primaryColor : secondaryColor) + ringAlpha + ')';
        ctx.lineWidth = w === waveCount - 1 ? 1.5 : 1.0;
        ctx.stroke();
      }

      // 3. Delicate cross-latitude longitude geodesic ring lines
      for (let lat = -2; lat <= 2; lat++) {
        ctx.beginPath();
        const yOffset = lat * 26;
        const latRadius = Math.sqrt(Math.max(0, Math.pow(baseRadius * 0.9, 2) - Math.pow(yOffset, 2)));
        
        ctx.ellipse(
          cx,
          cy + yOffset + Math.sin(time + lat) * 2,
          latRadius,
          latRadius * 0.28,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = primaryColor + '0.12)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 4. Subtle central energy kernel
      ctx.beginPath();
      ctx.arc(cx, cy, 4 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '0.8)';
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [state, size]);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        width={size * 1.25}
        height={size * 1.25}
        style={{ width: size * 1.25, height: size * 1.25 }}
        className="pointer-events-none"
      />

      {/* Orbiting editorial speech cues */}
      {showOrbitPhrases && (
        <>
          {/* Phrase 1: Top Right */}
          <div
            className="absolute -top-3 right-0 sm:-right-4 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-sm transition-all duration-700 animate-subtle-float"
            style={{ animationDelay: '0s' }}
          >
            “Tell me more.”
          </div>

          {/* Phrase 2: Left Middle */}
          <div
            className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-sm transition-all duration-700 animate-subtle-float"
            style={{ animationDelay: '2s' }}
          >
            “Why this approach?”
          </div>

          {/* Phrase 3: Bottom Right */}
          <div
            className="absolute -bottom-2 right-2 sm:right-6 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-sm transition-all duration-700 animate-subtle-float"
            style={{ animationDelay: '4s' }}
          >
            “Can you explain that clearly?”
          </div>
        </>
      )}
    </div>
  );
};

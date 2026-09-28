import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  state: 'idle' | 'ai_speaking' | 'user_speaking' | 'pressure';
  barCount?: number;
  height?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  state,
  barCount = 36,
  height = 70
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const ch = canvas.height;
      const centerY = ch / 2;
      const barWidth = width / barCount - 3;

      phase += 0.08;

      for (let i = 0; i < barCount; i++) {
        let amplitude = 4; // base idle

        if (state === 'ai_speaking') {
          // Dynamic harmonic sound wave
          const wave1 = Math.sin(phase * 1.5 + i * 0.3);
          const wave2 = Math.cos(phase * 2.1 + i * 0.5);
          amplitude = Math.max(6, Math.abs(wave1 * wave2) * (ch * 0.42) + 8);
        } else if (state === 'user_speaking') {
          // Crisp reactive speech frequency
          const noise = Math.sin(phase * 2.8 + i * 0.4) * Math.sin(phase * 0.9);
          amplitude = Math.max(6, Math.abs(noise) * (ch * 0.45) + 10);
        } else if (state === 'pressure') {
          // High intensity sharp agitation
          const erratic = Math.sin(phase * 4.2 + i * 0.7) * Math.cos(phase * 3.1 + i * 0.2);
          amplitude = Math.max(8, Math.abs(erratic) * (ch * 0.48) + 12);
        }

        const x = i * (barWidth + 3);
        const y = centerY - amplitude / 2;

        // Gradient based on state
        const gradient = ctx.createLinearGradient(0, y, 0, y + amplitude);

        if (state === 'ai_speaking') {
          gradient.addColorStop(0, '#818cf8'); // Indigo 400
          gradient.addColorStop(0.5, '#c084fc'); // Purple 400
          gradient.addColorStop(1, '#6366f1'); // Indigo 500
        } else if (state === 'user_speaking') {
          gradient.addColorStop(0, '#2dd4bf'); // Teal 400
          gradient.addColorStop(0.5, '#38bdf8'); // Sky 400
          gradient.addColorStop(1, '#06b6d4'); // Cyan 500
        } else if (state === 'pressure') {
          gradient.addColorStop(0, '#f87171'); // Red 400
          gradient.addColorStop(0.5, '#fb923c'); // Orange 400
          gradient.addColorStop(1, '#ef4444'); // Red 500
        } else {
          gradient.addColorStop(0, 'rgba(148, 163, 184, 0.3)');
          gradient.addColorStop(1, 'rgba(100, 116, 139, 0.15)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, amplitude, [4, 4, 4, 4]);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, barCount]);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-1">
      <canvas
        ref={canvasRef}
        width={540}
        height={height}
        className="w-full max-w-lg h-auto"
      />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

const GLYPHS = [
  '0', '1', '{', '}', '<', '>', ';', 'C', '++', '#',
  'int', 'void', '->', '&&', '||', '::', 'λ', 'const', 'def', 'fn', 'bool', '0x1F', '*'
];

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  glyph: string;
  alpha: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const N = Math.min(65, Math.floor((w * h) / 25000));
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.2 + Math.random() * 0.45,
      size: 11 + Math.random() * 7,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      alpha: 0.08 + Math.random() * 0.16
    }));

    let animationFrameId: number;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = '12px JetBrains Mono, monospace';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(244, 244, 240, ${p.alpha})`;
        ctx.font = `${p.size}px JetBrains Mono, monospace`;
        ctx.fillText(p.glyph, p.x, p.y);
        p.y += p.speed;
        if (p.y > h + 25) {
          p.y = -25;
          p.x = Math.random() * w;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />;
};

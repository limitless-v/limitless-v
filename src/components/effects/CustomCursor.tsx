import React, { useEffect, useRef } from 'react';

const CLICK_WORDS = ['ack', '0x1F', 'exec', 'sent'];
const TRAIL_GLYPHS = ['0', '1', '·'];

interface TrailParticle {
  x: number;
  y: number;
  glyph: string;
  life: number;
}

export const CustomCursor: React.FC = () => {
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || reduceMotion) return;

    document.documentElement.classList.add('has-cursor');

    const dot = dotRef.current;
    const wrap = wrapRef.current;
    const label = labelRef.current;
    const coord = coordRef.current;
    const tcanvas = trailCanvasRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let vx = 0;
    let vy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
      }
      if (coord) {
        coord.textContent = `x:${String(Math.round(mx)).padStart(4, '0')} y:${String(Math.round(my)).padStart(4, '0')}`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cursor follow loop
    let animId: number;
    const loop = () => {
      const dx = mx - rx;
      const dy = my - ry;
      vx = (vx + dx * 0.22) * 0.72;
      vy = (vy + dy * 0.22) * 0.72;
      rx += vx;
      ry += vy;
      if (wrap) {
        wrap.style.left = `${rx}px`;
        wrap.style.top = `${ry}px`;
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    const handleMouseDown = (e: MouseEvent) => {
      wrap?.classList.add('press');

      // Click ripple effect
      const flash = document.createElement('div');
      flash.className = 'click-flash';
      flash.style.left = `${e.clientX}px`;
      flash.style.top = `${e.clientY}px`;
      const word = CLICK_WORDS[Math.floor(Math.random() * CLICK_WORDS.length)];
      flash.innerHTML = `<i></i><i></i><span>${word}</span>`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 650);
    };

    const handleMouseUp = () => {
      wrap?.classList.remove('press');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover triggers
    const hoverMap = [
      { sel: '.btn', text: 'go' },
      { sel: '.tab', text: 'view' },
      { sel: '.chip', text: '' }
    ];

    const setupHoverListeners = () => {
      hoverMap.forEach(({ sel, text }) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.addEventListener('mouseenter', () => {
            wrap?.classList.add('hover-link');
            if (label) label.textContent = text;
          });
          el.addEventListener('mouseleave', () => {
            wrap?.classList.remove('hover-link');
            if (label) label.textContent = '';
          });
        });
      });
    };

    setupHoverListeners();

    // Mouse leave / enter window
    const handleMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
      if (wrap) wrap.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      if (dot) dot.style.opacity = '1';
      if (wrap) wrap.style.opacity = '1';
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Particle Trail Canvas
    let trailAnimId: number;
    if (tcanvas) {
      const tctx = tcanvas.getContext('2d');
      let tw = (tcanvas.width = window.innerWidth);
      let th = (tcanvas.height = window.innerHeight);

      const handleTresize = () => {
        tw = tcanvas.width = window.innerWidth;
        th = tcanvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleTresize);

      const trail: TrailParticle[] = [];
      let lastSpawn = 0;

      const handleTrailMouseMove = (e: MouseEvent) => {
        const now = performance.now();
        if (now - lastSpawn > 45) {
          lastSpawn = now;
          trail.push({
            x: e.clientX,
            y: e.clientY,
            glyph: TRAIL_GLYPHS[Math.floor(Math.random() * TRAIL_GLYPHS.length)],
            life: 1
          });
          if (trail.length > 40) trail.shift();
        }
      };

      window.addEventListener('mousemove', handleTrailMouseMove, { passive: true });

      const trailTick = () => {
        if (!tctx) return;
        tctx.clearRect(0, 0, tw, th);
        tctx.font = '10px JetBrains Mono, monospace';

        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          p.life -= 0.035;
          if (p.life <= 0) {
            trail.splice(i, 1);
            continue;
          }
          tctx.fillStyle = `rgba(244, 244, 240, ${p.life * 0.5})`;
          tctx.fillText(p.glyph, p.x + 10, p.y - 10);
        }

        trailAnimId = requestAnimationFrame(trailTick);
      };

      trailTick();
    }

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
      if (trailAnimId) cancelAnimationFrame(trailAnimId);
    };
  }, []);

  return (
    <>
      <canvas id="cursor-trail-canvas" ref={trailCanvasRef} />
      <div id="cursor-wrap" ref={wrapRef}>
        <div id="cursor-ring">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <span id="cursor-label" ref={labelRef} />
        </div>
        <span id="cursor-coord" ref={coordRef} />
      </div>
      <div id="cursor-dot" ref={dotRef} />
    </>
  );
};

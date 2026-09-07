import React, { useRef, useState } from 'react';
import { HERO_DATA } from '../../data/portfolioData.ts';
import { useTypewriter, useRotatingTypewriter } from '../../hooks/useTypewriter.ts';
import heroGif from '../../assets/giphy.gif';

export const Hero: React.FC = () => {
  const [nameDone, setNameDone] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const reduceMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const { displayedText: nameText, isComplete } = useTypewriter({
    text: HERO_DATA.name,
    speed: 55,
    onComplete: () => setNameDone(true),
    reduceMotion
  });

  const rotatingSubText = useRotatingTypewriter({
    lines: HERO_DATA.buildLogs,
    typeSpeed: 32,
    deleteSpeed: 20,
    pauseTime: 1600,
    reduceMotion,
    enabled: nameDone || isComplete || reduceMotion
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0,0)';
    }
  };

  return (
    <section id="hero">
      {/* Background GIF media */}
      <div className="hero-bg-media" aria-hidden="true">
        <img src={heroGif} alt="" className="hero-bg-gif" />
      </div>

      <div className="hero-kicker reveal in">
        <span className="dot-live" /> STATUS: {HERO_DATA.status}
      </div>
      <h1 className="hero-title reveal in" id="heroTitle">
        {nameText}
        {isComplete && <span className="caret">&nbsp;</span>}
      </h1>
      <p className="hero-sub reveal in reveal-delay-1">
        <span id="heroTypeTarget" className="type-target">
          {rotatingSubText}
        </span>
      </p>
      <div className="hero-meta reveal in reveal-delay-2">
        {HERO_DATA.chips.map((chip) => (
          <div key={chip} className="chip">
            {chip}
          </div>
        ))}
      </div>
      <div className="hero-cta reveal in reveal-delay-3">
        <a
          href={HERO_DATA.ctaHref}
          className="btn"
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span>{HERO_DATA.ctaText}</span>
        </a>
      </div>
      <div className="scroll-cue">
        <div className="bar" />
        <span>scroll</span>
      </div>
    </section>
  );
};

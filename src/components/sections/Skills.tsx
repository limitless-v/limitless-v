import React, { useEffect, useRef, useState } from 'react';
import { SKILLS_DATA, BentoCard, BentoSkill } from '../../data/portfolioData.ts';

export const Skills: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="eyebrow reveal">{SKILLS_DATA.sectionNumber}</div>
      <h2 className="sec-title reveal">{SKILLS_DATA.title}</h2>
      <p className="sec-desc reveal">{SKILLS_DATA.description}</p>

      {/* Critical Evaluation Bento Grid */}
      <div className="bento-grid reveal reveal-delay-1" id="bentoSkillsGrid">
        {SKILLS_DATA.bentoCards.map((card: BentoCard) => (
          <div className={`bento-card ${card.colSpan}`} key={card.id}>
            <div className="bento-card-header">
              <div className="bento-card-title-group">
                <span className="bento-card-tag">{card.tag}</span>
                <h3 className="bento-card-title">{card.title}</h3>
              </div>
              <span className="bento-card-count">{card.skills.length} Areas</span>
            </div>

            <div className="bento-skills-list">
              {card.skills.map((skill: BentoSkill) => {
                const percentage = Math.round((skill.score / 10) * 100);
                const isHigh = skill.score >= 7.5;
                const isDeveloping = skill.score < 6.0;

                return (
                  <div className="bento-skill-item" key={skill.name}>
                    <div className="bento-skill-header">
                      <span className="bento-skill-name">{skill.name}</span>
                      <span className={`bento-score-pill ${isHigh ? 'high' : isDeveloping ? 'dev' : ''}`}>
                        <strong>{skill.score.toFixed(1)}</strong>
                        <span className="bento-score-denom">/10</span>
                      </span>
                    </div>

                    <div className="bento-progress-track">
                      <div
                        className="bento-progress-bar"
                        style={{
                          width: animated ? `${percentage}%` : '0%'
                        }}
                      />
                    </div>

                    <div className="bento-assessment-box">
                      <p className="bento-assessment-text">{skill.assessment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


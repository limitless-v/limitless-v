import React from 'react';
import { CONTACT_DATA } from '../../data/portfolioData.ts';

export const Contact: React.FC = () => {
  return (
    <section id="contact">
      <div className="eyebrow reveal">{CONTACT_DATA.sectionNumber}</div>
      <h2 className="sec-title reveal">{CONTACT_DATA.title}</h2>
      <p className="sec-desc reveal">{CONTACT_DATA.description}</p>

      <div className="terminal reveal">
        <div className="terminal-head">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="path">{CONTACT_DATA.terminalPath}</span>
        </div>
        <div className="terminal-body">
          {CONTACT_DATA.commands.map((cmd, idx) => (
            <React.Fragment key={idx}>
              <div>
                <span className="prompt">{cmd.prompt.slice(0, 1)}</span>
                {cmd.prompt.slice(1)}
              </div>
              <div>{cmd.output}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

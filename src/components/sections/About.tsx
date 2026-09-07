import React from 'react';
import { ABOUT_DATA } from '../../data/portfolioData.ts';

export const About: React.FC = () => {
  return (
    <section id="about">
      <div className="eyebrow reveal">{ABOUT_DATA.sectionNumber}</div>
      <h2 className="sec-title reveal">{ABOUT_DATA.title}</h2>
      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            I'm <strong>limitless-v</strong>, a Full Stack &amp; AI Developer.
          </p>
          <p>
            My interest started with <strong>C, C++, and Python</strong> — I've worked with them at
            an academic and self-study level, and I'm actively exploring <strong>embedded systems</strong> as
            I go deeper into low-level programming. That curiosity carries into everything I build
            day-to-day: React/TypeScript frontends, Node/Express and Flask backends, and AI tooling
            built on RAG pipelines and the OpenAI/Gemini APIs.
          </p>
          <p>
            I like working at the intersection of <strong>machine learning, AI tooling, and practical web applications</strong> — and
            I'm always learning, whether that's at work or getting closer to the hardware on my own time.
          </p>
        </div>
        <div className="about-code reveal reveal-delay-1">
          <div className="code-dots">
            <span />
            <span />
            <span />
          </div>
          <pre>
            <span className="c">// whoami.c</span>{'\n'}
            <span className="k">struct</span> Developer {'{\n'}
            {'  '}<span className="k">char</span>* name     = <span className="s">"limitless-v"</span>;{'\n'}
            {'  '}<span className="k">char</span>* role     = <span className="s">"Full Stack & AI Dev"</span>;{'\n'}
            {'  '}<span className="k">char</span>* roots[3]    = &#123;<span className="s">"C"</span>, <span className="s">"C++"</span>, <span className="s">"Python"</span>&#125;;{'\n'}
            {'  '}<span className="k">char</span>* exploring   = <span className="s">"Embedded Systems"</span>;{'\n'}
            {'  '}<span className="k">bool</span>  shipping    = <span className="s">true</span>;{'\n'}
            {'  '}<span className="k">bool</span>  stillLearning = <span className="s">true</span>;{'\n'}
            &#125;;
          </pre>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { BackgroundCanvas } from './components/effects/BackgroundCanvas.tsx';
import { Scanlines } from './components/effects/Scanlines.tsx';
import { CustomCursor } from './components/effects/CustomCursor.tsx';
import { TabBar } from './components/layout/TabBar.tsx';
import { Gutter } from './components/layout/Gutter.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { Hero } from './components/sections/Hero.tsx';
import { About } from './components/sections/About.tsx';
import { Skills } from './components/sections/Skills.tsx';
import { Contact } from './components/sections/Contact.tsx';
import { useScrollSpy } from './hooks/useScrollSpy.ts';
import { NAV_TABS } from './data/portfolioData.ts';

export const App: React.FC = () => {
  const sectionIds = NAV_TABS.map((tab) => tab.id);
  const activeTab = useScrollSpy(sectionIds, 0.4);

  // IntersectionObserver for scroll-reveal animations
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackgroundCanvas />
      <Scanlines />
      <CustomCursor />
      <Gutter />
      <TabBar activeTab={activeTab} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;

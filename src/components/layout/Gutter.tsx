import React, { useEffect, useRef } from 'react';

const TOTAL_LINES = 240;

export const Gutter: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${-window.scrollY * 0.98}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineNumbers = Array.from({ length: TOTAL_LINES }, (_, i) => i + 1).join('\n');

  return (
    <div className="gutter" aria-hidden="true">
      <div className="gutter-inner" ref={innerRef} style={{ whiteSpace: 'pre' }}>
        {lineNumbers}
      </div>
    </div>
  );
};

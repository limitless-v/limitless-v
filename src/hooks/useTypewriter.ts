import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  onComplete?: () => void;
  reduceMotion?: boolean;
}

export function useTypewriter({
  text,
  speed = 55,
  onComplete,
  reduceMotion = false
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState(reduceMotion ? text : '');
  const [isComplete, setIsComplete] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, reduceMotion]);

  return { displayedText, isComplete };
}

interface UseRotatingTypewriterOptions {
  lines: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  reduceMotion?: boolean;
  enabled?: boolean;
}

export function useRotatingTypewriter({
  lines,
  typeSpeed = 32,
  deleteSpeed = 20,
  pauseTime = 1600,
  reduceMotion = false,
  enabled = true
}: UseRotatingTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState(
    reduceMotion ? lines[lines.length - 1] : ''
  );

  useEffect(() => {
    if (!enabled || lines.length === 0) return;

    if (reduceMotion) {
      setDisplayedText(lines[lines.length - 1]);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    function step() {
      const currentLine = lines[lineIndex];

      if (!isDeleting) {
        charIndex++;
        setDisplayedText(currentLine.slice(0, charIndex));

        if (charIndex === currentLine.length) {
          const isLast = lineIndex === lines.length - 1;
          if (isLast) {
            return; // stay on final line
          }
          isDeleting = true;
          timeoutId = window.setTimeout(step, pauseTime);
          return;
        }
      } else {
        charIndex--;
        setDisplayedText(currentLine.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          lineIndex++;
        }
      }

      timeoutId = window.setTimeout(step, isDeleting ? deleteSpeed : typeSpeed);
    }

    step();

    return () => clearTimeout(timeoutId);
  }, [lines, typeSpeed, deleteSpeed, pauseTime, reduceMotion, enabled]);

  return displayedText;
}

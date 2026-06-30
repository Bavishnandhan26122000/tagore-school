'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a number up from zero when it scrolls into view. Preserves any
 * non-numeric prefix/suffix in `value` (e.g. the "+" in "7000+"). Plain years
 * (digits with no suffix) are rendered without thousands separators so "1986"
 * doesn't become "1,986"; counts like "7000+" get grouped to "7,000+".
 */
export default function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/[\d,]+/);
  const target = match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
  const prefix = match ? value.slice(0, match.index) : '';
  const suffix = match ? value.slice(match.index! + match[0].length) : value;
  const group = /,/.test(value) || suffix.trim().length > 0;

  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      observer.disconnect();

      if (reduce || target === 0) {
        setDisplay(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        setDisplay(Math.round(target * easeOutCubic(progress)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const formatted = group ? display.toLocaleString('en-US') : String(display);

  return (
    <div ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </div>
  );
}

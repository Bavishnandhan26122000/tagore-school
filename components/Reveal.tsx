'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
};

/**
 * Fades + slides a single block into view when it scrolls into the viewport.
 * The hidden state lives in CSS under a `prefers-reduced-motion: no-preference`
 * media query, so reduced-motion users always see content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Container whose direct children stagger into view in sequence. Renders as a
 * plain element (keep your grid/flex classes on `className`) so the DOM
 * structure is unchanged — the stagger delays come from CSS `:nth-child`.
 */
export function RevealGroup({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-group${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}

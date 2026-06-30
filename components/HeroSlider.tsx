'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_SLIDES } from '@/lib/data';

const SLIDE_INTERVAL = 6000;
const ANIM_MS = 600;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const paused = useRef(false);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // goTo has no reactive deps — it reads/writes state via the functional
  // updater and a ref, so its identity is stable for the lifetime of the
  // component. That keeps the auto-advance interval from being torn down
  // and recreated on every slide change.
  const goTo = useCallback((idx: number) => {
    setCurrent((prev) => {
      if (idx === prev) return prev;
      setAnimating(true);
      if (animTimer.current) clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => setAnimating(false), ANIM_MS);
      return idx;
    });
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => {
      setAnimating(true);
      if (animTimer.current) clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => setAnimating(false), ANIM_MS);
      return (prev + 1) % HERO_SLIDES.length;
    });
  }, []);

  useEffect(() => {
    // Respect users who prefer reduced motion: no auto-advance.
    const reduce = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timer = setInterval(() => {
      if (!paused.current) next();
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  // Clean up the in-flight animation timeout on unmount.
  useEffect(() => () => { if (animTimer.current) clearTimeout(animTimer.current); }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative h-[88vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-[#0D2144]"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      aria-roledescription="carousel"
    >
      {/* Real background images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/85 via-[#0D2144]/75 to-[#1B3A6B]/70" />

      {/* Gold diagonal accent */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-20"
        style={{ background: 'linear-gradient(135deg, transparent 40%, #D4AF37 100%)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight drop-shadow-lg">
          {slide.quote}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 font-sans mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
          {slide.subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={slide.ctaHref}
            className="px-8 py-3.5 bg-[#D4AF37] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#E8CC6A] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {slide.cta}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border-2 border-white text-white font-sans font-medium rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-8 h-2.5 bg-[#D4AF37]' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 text-white/40 font-sans text-xs tracking-widest uppercase flex-col items-center gap-1 hidden sm:flex">
        <span>Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

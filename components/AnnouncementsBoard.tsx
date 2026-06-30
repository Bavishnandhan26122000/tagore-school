'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { RevealGroup } from '@/components/Reveal';
import {
  ANNOUNCEMENTS,
  ANNOUNCEMENT_CATEGORIES,
  type Announcement,
  type AnnouncementCategory,
} from '@/lib/data';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const CATEGORY_BADGE: Record<AnnouncementCategory, string> = {
  Results: 'bg-emerald-100 text-emerald-700',
  Events: 'bg-blue-100 text-blue-700',
  Notices: 'bg-amber-100 text-amber-700',
  Rules: 'bg-violet-100 text-violet-700',
  Holidays: 'bg-rose-100 text-rose-700',
  Admissions: 'bg-teal-100 text-teal-700',
};

function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}

type Filter = 'All' | AnnouncementCategory;

function ClockIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-[#1B3A6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-[#1B3A6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.686 7-11a7 7 0 10-14 0c0 5.314 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function AnnouncementCard({ item }: { item: Announcement }) {
  const { day, month, year } = dateParts(item.date);
  return (
    <article
      className={`flex flex-col gap-5 rounded-2xl border bg-white p-5 card-lift sm:flex-row ${
        item.pinned ? 'border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/40' : 'border-gray-100'
      }`}
    >
      {/* Date block */}
      <div className="flex shrink-0 flex-row items-center gap-3 sm:w-20 sm:flex-col sm:gap-0 sm:justify-center sm:rounded-xl sm:bg-[#1B3A6B] sm:py-4 sm:text-center">
        <span className="text-3xl font-bold leading-none text-[#1B3A6B] sm:text-[#D4AF37]">{day}</span>
        <div className="flex items-baseline gap-1 sm:flex-col sm:items-center">
          <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#D4AF37] sm:mt-1 sm:text-white">
            {month}
          </span>
          <span className="text-xs font-sans text-gray-400 sm:text-gray-300">{year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold font-sans uppercase tracking-wide ${CATEGORY_BADGE[item.category]}`}
          >
            {item.category}
          </span>
          {item.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-2.5 py-0.5 text-[11px] font-bold font-sans uppercase tracking-wide text-[#1B3A6B]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
              </svg>
              Important
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold leading-snug text-[#1B3A6B]">{item.title}</h3>
        <p className="mt-1.5 font-sans text-sm leading-relaxed text-gray-600">{item.body}</p>

        {(item.time || item.location) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.time && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8F9FA] px-2.5 py-1 text-xs font-sans font-medium text-gray-700">
                <ClockIcon />
                {item.time}
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8F9FA] px-2.5 py-1 text-xs font-sans font-medium text-gray-700">
                <PinIcon />
                {item.location}
              </span>
            )}
          </div>
        )}

        {item.link && (
          <Link
            href={item.link.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#D4AF37] transition-all hover:gap-2.5"
          >
            {item.link.label}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function AnnouncementsBoard() {
  const [filter, setFilter] = useState<Filter>('All');

  // Pinned first, then newest first.
  const sorted = useMemo(
    () =>
      [...ANNOUNCEMENTS].sort((a, b) => {
        if (!!b.pinned !== !!a.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
        return b.date.localeCompare(a.date);
      }),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: sorted.length };
    for (const cat of ANNOUNCEMENT_CATEGORIES) c[cat] = sorted.filter((a) => a.category === cat).length;
    return c;
  }, [sorted]);

  const visible = filter === 'All' ? sorted : sorted.filter((a) => a.category === filter);
  const tabs: Filter[] = ['All', ...ANNOUNCEMENT_CATEGORIES];

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-4xl px-6">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-1.5 text-sm font-sans font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-[#F8F9FA] text-gray-600 hover:bg-[#1B3A6B]/[0.08] hover:text-[#1B3A6B]'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-xs ${active ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                  {counts[tab] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {visible.length > 0 ? (
          <RevealGroup className="space-y-4">
            {visible.map((item) => (
              <AnnouncementCard key={item.id} item={item} />
            ))}
          </RevealGroup>
        ) : (
          <p className="py-12 text-center font-sans text-gray-400">No announcements in this category yet.</p>
        )}
      </div>
    </section>
  );
}

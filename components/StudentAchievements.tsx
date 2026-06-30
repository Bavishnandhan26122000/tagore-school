'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/Reveal';
import { STUDENT_ACHIEVEMENTS, STANDARD_ORDER, type StudentAchievement } from '@/lib/data';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// Sort standards by STANDARD_ORDER, with any unknowns appended alphabetically.
function sortStandards(list: string[]) {
  return [...list].sort((a, b) => {
    const ia = STANDARD_ORDER.indexOf(a);
    const ib = STANDARD_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function AchievementCard({ item }: { item: StudentAchievement }) {
  return (
    <div
      className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#1B3A6B] card-lift ring-1 ${
        item.distinction ? 'ring-2 ring-[#D4AF37]' : 'ring-gray-200'
      }`}
    >
      {/* Photo / initials fallback */}
      {item.photo ? (
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes="(max-width: 360px) 92vw, (max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
          loading="lazy"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B3A6B] to-[#0D2144]">
          <span className="text-3xl font-bold text-[#D4AF37] sm:text-4xl">{initials(item.name)}</span>
        </div>
      )}

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2144] via-[#0D2144]/35 to-transparent" />

      {/* Top badges — flex row so the standard + distinction never overlap */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-1.5 p-2 sm:p-2.5">
        <span className="shrink-0 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold font-sans uppercase tracking-wide text-[#1B3A6B] shadow-sm sm:px-2.5 sm:text-[11px]">
          {item.standard}
        </span>
        {item.distinction && (
          <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-[#D4AF37] px-1.5 py-0.5 text-[9px] font-bold font-sans uppercase tracking-wide text-[#1B3A6B] shadow-sm sm:px-2 sm:text-[10px]">
            <svg className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </svg>
            <span className="truncate">{item.distinction}</span>
          </span>
        )}
      </div>

      {/* Details overlay */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
        {/* Marks block */}
        <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 sm:mb-2">
          <span className="whitespace-nowrap text-lg font-bold leading-none text-[#D4AF37] sm:text-2xl">{item.marks}</span>
          <span className="text-xs font-semibold font-sans text-white/90 sm:text-sm">{item.percentage}</span>
        </div>
        <h3 className="text-sm font-bold leading-tight text-white drop-shadow-sm sm:text-[15px]">{item.name}</h3>
        <p className="mt-0.5 font-sans text-[10px] leading-snug text-gray-300 sm:text-[11px]">{item.institution}</p>
        <p className="mt-1 font-sans text-[10px] font-medium leading-snug text-[#E8CC6A] sm:text-[11px]">{item.exam}</p>
      </div>
    </div>
  );
}

export default function StudentAchievements() {
  // Years present, newest first.
  const years = useMemo(
    () => [...new Set(STUDENT_ACHIEVEMENTS.map((s) => s.year))].sort((a, b) => b.localeCompare(a)),
    [],
  );

  const [year, setYear] = useState(years[0]);
  const [standard, setStandard] = useState<string>('All');

  const inYear = useMemo(
    () => STUDENT_ACHIEVEMENTS.filter((s) => s.year === year),
    [year],
  );

  // Standards available within the selected year, in display order.
  const standards = useMemo(
    () => sortStandards([...new Set(inYear.map((s) => s.standard))]),
    [inYear],
  );

  // Reset the standard filter if it isn't available in the newly selected year.
  const activeStandard = standard !== 'All' && !standards.includes(standard) ? 'All' : standard;

  // Groups to render: all standards (each a heading) or just the chosen one.
  const groups =
    activeStandard === 'All'
      ? standards.map((std) => ({ std, items: inYear.filter((s) => s.standard === std) }))
      : [{ std: activeStandard, items: inYear.filter((s) => s.standard === activeStandard) }];

  const showHeadings = activeStandard === 'All';

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Year filter */}
        <Reveal className="mb-6">
          <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">
            Academic Year
          </p>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => {
              const active = y === year;
              return (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y);
                    setStandard('All');
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm font-sans font-semibold transition-colors duration-150 ${
                    active
                      ? 'bg-[#1B3A6B] text-white'
                      : 'bg-[#F8F9FA] text-gray-600 hover:bg-[#1B3A6B]/[0.08] hover:text-[#1B3A6B]'
                  }`}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Standard filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {['All', ...standards].map((std) => {
            const active = activeStandard === std;
            return (
              <button
                key={std}
                onClick={() => setStandard(std)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-sans font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-[#D4AF37] text-[#1B3A6B]'
                    : 'bg-[#F8F9FA] text-gray-600 hover:bg-[#D4AF37]/20 hover:text-[#1B3A6B]'
                }`}
              >
                {std}
              </button>
            );
          })}
        </div>

        {/* Grouped cards */}
        {groups.some((g) => g.items.length > 0) ? (
          <div className="space-y-10 sm:space-y-12">
            {groups.map((group) => (
              <div key={group.std}>
                {showHeadings && (
                  <h2 className="mb-5 text-lg font-bold text-[#1B3A6B] gold-underline sm:text-xl">{group.std}</h2>
                )}
                <RevealGroup className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {group.items.map((item) => (
                    <AchievementCard key={item.id} item={item} />
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center font-sans text-gray-400">
            No achievements posted for this selection yet.
          </p>
        )}
      </div>
    </section>
  );
}

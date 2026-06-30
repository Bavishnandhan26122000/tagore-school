import Link from 'next/link';
import { Reveal, RevealGroup } from '@/components/Reveal';
import { ANNOUNCEMENTS, type AnnouncementCategory } from '@/lib/data';

const CATEGORY_BADGE: Record<AnnouncementCategory, string> = {
  Results: 'bg-emerald-100 text-emerald-700',
  Events: 'bg-blue-100 text-blue-700',
  Notices: 'bg-amber-100 text-amber-700',
  Rules: 'bg-violet-100 text-violet-700',
  Holidays: 'bg-rose-100 text-rose-700',
  Admissions: 'bg-teal-100 text-teal-700',
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Pinned first, then newest first — same order as the full board.
const LATEST = [...ANNOUNCEMENTS]
  .sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    return b.date.localeCompare(a.date);
  })
  .slice(0, 3);

export default function AnnouncementsPreview() {
  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              Stay Informed
            </p>
            <h2 className="section-heading gold-underline">Latest Announcements</h2>
          </div>
          <Link
            href="/announcements"
            className="inline-flex items-center gap-2 rounded font-sans text-sm font-semibold text-[#1B3A6B] transition-all hover:gap-3 hover:text-[#D4AF37]"
          >
            View All Announcements
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {LATEST.map((item) => (
            <Link
              key={item.id}
              href="/announcements"
              className={`group flex flex-col rounded-2xl border bg-white p-5 card-lift ${
                item.pinned ? 'border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/40' : 'border-gray-100'
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold font-sans uppercase tracking-wide ${CATEGORY_BADGE[item.category]}`}
                >
                  {item.category}
                </span>
                <span className="font-sans text-xs text-gray-400">{formatDate(item.date)}</span>
              </div>

              <h3 className="line-clamp-2 font-bold leading-snug text-[#1B3A6B] transition-colors group-hover:text-[#D4AF37]">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 font-sans text-sm leading-relaxed text-gray-500">
                {item.body}
              </p>

              <div className="mt-4 flex items-center gap-1.5 font-sans text-sm font-medium text-[#D4AF37]">
                Read more
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

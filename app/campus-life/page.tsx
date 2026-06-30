import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Campus Life',
  description: 'Explore academics, facilities, sports, achievements, and events across the Tagore campuses.',
};

const SECTIONS = [
  {
    href: '/campus-life/academics',
    title: 'Academics',
    icon: '📖',
    desc: 'Smart classrooms, modern laboratories, and a curriculum built for excellence across all five institutions.',
  },
  {
    href: '/campus-life/facilities',
    title: 'Facilities',
    icon: '🏛️',
    desc: 'Libraries, hostels, transport, labs, and green campuses designed for focused, comfortable learning.',
  },
  {
    href: '/campus-life/sports',
    title: 'Sports',
    icon: '⚽',
    desc: 'From cricket to athletics, sports are woven into student life — building discipline and teamwork.',
  },
  {
    href: '/campus-life/achievements',
    title: 'Achievements',
    icon: '🏆',
    desc: 'Board toppers, sports champions, and cultural award winners — decades of consistent excellence.',
  },
  {
    href: '/campus-life/events',
    title: 'Events',
    icon: '🎉',
    desc: 'Annual Day, science exhibitions, cultural festivals, and celebrations throughout the academic year.',
  },
];

export default function CampusLifePage() {
  return (
    <>
      <PageHeader title="Life at Tagore" />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            Education at Tagore goes far beyond the classroom. From rigorous academics and modern facilities
            to sports, cultural events, and a track record of achievement — explore everything that makes
            student life here vibrant and complete.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block bg-[#F8F9FA] rounded-xl p-7 border border-gray-100 card-lift"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h2 className="text-[#1B3A6B] font-bold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors duration-200">
                  {s.title}
                </h2>
                <p className="text-gray-500 font-sans text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#D4AF37] text-sm font-sans font-medium group-hover:gap-2 transition-all">
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

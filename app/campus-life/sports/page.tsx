import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Sports' };

const SPORTS = [
  'Cricket', 'Football', 'Volleyball', 'Basketball', 'Kabaddi',
  'Kho-Kho', 'Athletics (Track & Field)', 'Shuttle Badminton',
  'Table Tennis', 'Chess', 'Carrom',
];

export default function SportsPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">Campus Life</p>
          <h1 className="text-4xl font-bold text-white mb-3">Sports</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Sports</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 gold-underline">Sports at Tagore</h2>
              <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
                <p>
                  At Tagore Educational Institutions, sports are not an afterthought — they are an integral
                  part of a student&#39;s holistic development. Physical education is built into the timetable
                  at all levels, from primary school to postgraduate.
                </p>
                <p>
                  Our campuses include open grounds, courts, and indoor game halls to support a wide range of
                  sports. Students are encouraged to represent their institutions at district, state, and national
                  level competitions.
                </p>
                <p>
                  We believe athletic achievement builds discipline, teamwork, resilience, and leadership —
                  qualities that serve students for a lifetime.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1B3A6B] mb-5 font-sans">Sports Offered</h3>
              <div className="flex flex-wrap gap-2">
                {SPORTS.map((sport) => (
                  <span
                    key={sport}
                    className="px-4 py-2 bg-[#1B3A6B] text-white font-sans text-sm rounded-full"
                  >
                    {sport}
                  </span>
                ))}
              </div>

              <div className="mt-8 bg-[#D4AF37]/10 rounded-xl p-5 border border-[#D4AF37]/20">
                <h4 className="font-bold text-[#1B3A6B] mb-2 font-sans text-sm">Annual Sports Day</h4>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Every year, Tagore Institutions host an annual Sports Day where students compete across
                  events, receive recognition, and celebrate the spirit of athleticism and sportsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

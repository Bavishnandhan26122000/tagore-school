import type { Metadata } from 'next';
import Link from 'next/link';
import { INSTITUTIONS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Institutions',
  description: 'Explore all five Tagore Educational Institutions — from school to postgraduate.',
};

export default function InstitutionsPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">Institutions</p>
          <h1 className="text-4xl font-bold text-white mb-3">Our Institutions</h1>
          <p className="text-gray-300 font-sans max-w-xl">
            Five institutions, one mission — to provide exceptional education at every stage of life.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {INSTITUTIONS.map((inst, idx) => (
            <div
              key={inst.id}
              className={`flex flex-col md:flex-row gap-8 rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Color panel */}
              <div className="md:w-48 bg-[#1B3A6B] flex flex-col items-center justify-center py-10 px-6 text-center shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1B3A6B] font-bold text-2xl mb-3">
                  {inst.shortName.charAt(0)}
                </div>
                <div className="text-white font-bold text-xs font-sans uppercase tracking-wider">Est.</div>
                <div className="text-[#D4AF37] font-bold text-2xl">{inst.established}</div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-widest mb-1">
                  {inst.affiliation}
                </div>
                <h2 className="text-[#1B3A6B] font-bold text-xl mb-3">{inst.name}</h2>
                <p className="text-gray-600 font-sans leading-relaxed mb-5">{inst.description}</p>

                {/* Programs */}
                <div className="mb-5">
                  <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Programmes Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {inst.programs.map((p) => (
                      <span key={p} className="bg-[#1B3A6B]/8 text-[#1B3A6B] text-xs font-sans px-3 py-1 rounded-full border border-[#1B3A6B]/15">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6">
                  {inst.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600 font-sans">
                      <span className="text-[#D4AF37] mt-0.5 shrink-0">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href={inst.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] text-white font-sans text-sm font-medium rounded hover:bg-[#2451A0] transition-colors duration-200"
                >
                  View Institution
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

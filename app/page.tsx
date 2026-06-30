import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { Reveal, RevealGroup } from '@/components/Reveal';
import Counter from '@/components/Counter';
import AnnouncementsPreview from '@/components/AnnouncementsPreview';
import InstitutionsMarquee from '@/components/InstitutionsMarquee';
import { INSTITUTIONS, SITE, WHY_CHOOSE, TAGORE_ACRONYM } from '@/lib/data';

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <Counter value={value} className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-1" />
      <div className="text-sm font-sans text-gray-300 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function InstitutionCard({ inst }: { inst: typeof INSTITUTIONS[number] }) {
  return (
    <Link href={inst.href} className="group block bg-white rounded-xl overflow-hidden shadow-md card-lift border border-gray-100">
      {/* Real institution image */}
      {inst.image && (
        <div className="relative h-44 bg-gray-100 overflow-hidden">
          <Image
            src={inst.image}
            alt={inst.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/60 to-transparent" />
          <span className="absolute bottom-2 right-2 text-xs font-sans text-white bg-[#1B3A6B]/70 px-2 py-0.5 rounded">
            Est. {inst.established}
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center">
            <span className="text-[#1B3A6B] font-bold text-lg font-sans">
              {inst.shortName.charAt(0)}
            </span>
          </div>
        </div>
        <h3 className="text-[#1B3A6B] font-bold text-base leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors duration-200">
          {inst.name}
        </h3>
        <p className="text-gray-500 text-base font-sans leading-relaxed line-clamp-3 mb-4">
          {inst.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {inst.programs.slice(0, 2).map((p) => (
            <span key={p} className="text-sm font-sans bg-[#1B3A6B]/8 text-[#1B3A6B] px-3 py-1 rounded-full">
              {p}
            </span>
          ))}
        </div>
        <div className="flex items-center text-[#D4AF37] text-base font-sans font-medium group-hover:gap-2 transition-all gap-1">
          Learn More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Permanent Static Apply Banner */}
      <section className="bg-[#D4AF37] py-4 border-b-4 border-[#1B3A6B]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#1B3A6B] font-bold text-lg md:text-xl font-sans text-center sm:text-left flex items-center gap-2">
            <span className="text-2xl">🎓</span> Admissions Open for 2026-27
          </div>
          <Link
            href="/admissions"
            className="px-8 py-3 bg-[#1B3A6B] text-white font-bold font-sans rounded-lg shadow-md hover:bg-[#122852] transition-colors w-full sm:w-auto text-center text-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1B3A6B] py-10">
        <RevealGroup className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {SITE.stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </RevealGroup>
      </section>

      {/* Welcome / About snippet */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest font-semibold mb-3">
              About Us
            </p>
            <h2 className="section-heading gold-underline mb-8">
              Welcome to Tagore Educational Institutions
            </h2>
            <p className="text-gray-600 font-sans leading-relaxed mb-4">
              Established in <strong>1986</strong> at Deviyakurichi, near Attur, Salem, Tagore Educational Institutions
              is run by the <em>Southern Educational and Rural Development Society</em>. Over four decades, we have
              grown from a single school into a group of five premier institutions serving over 7,000 students.
            </p>
            <p className="text-gray-600 font-sans leading-relaxed mb-8">
              Our philosophy is simple: every child has infinite potential. We provide the environment, mentorship,
              and resources to help each student reach their fullest academic, personal, and professional potential.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] text-white font-sans font-medium rounded hover:bg-[#2451A0] transition-colors duration-200"
            >
              Our Story
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>

          {/* TAGORE acronym box */}
          <Reveal delay={120} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-[#1B3A6B] font-bold text-lg mb-6 font-sans uppercase tracking-wider text-center">
              What TAGORE Stands For
            </h3>
            <div className="space-y-3">
              {TAGORE_ACRONYM.map(({ letter, word }) => (
                <div key={letter} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1B3A6B] flex items-center justify-center text-[#D4AF37] font-bold text-lg shrink-0">
                    {letter}
                  </div>
                  <span className="text-gray-700 font-sans text-base font-medium">{word}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Institutions grid */}
      <section className="py-20 bg-white">
        <InstitutionsMarquee />
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <Reveal className="text-center mb-12">
            <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest font-semibold mb-3">
              Five Institutions
            </p>
            <h2 className="section-heading gold-underline inline-block">Our Institutions</h2>
            <p className="text-gray-500 font-sans mt-8 max-w-2xl mx-auto">
              From Pre-KG to Postgraduate, Tagore Group offers a complete educational journey under one trusted umbrella.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTITUTIONS.map((inst) => (
              <InstitutionCard key={inst.id} inst={inst} />
            ))}
            {/* View all card */}
            <Link
              href="/institutions"
              className="group flex flex-col items-center justify-center bg-[#1B3A6B] rounded-xl p-8 text-white card-lift text-center"
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors duration-200">
                <svg className="w-6 h-6 text-[#D4AF37] group-hover:text-[#1B3A6B] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">View All Institutions</h3>
              <p className="text-gray-300 font-sans text-base">Compare programmes, affiliations, and facilities across all five campuses.</p>
            </Link>
          </RevealGroup>
        </div>
      </section>

      {/* Latest Announcements preview */}
      <AnnouncementsPreview />

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1B3A6B]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest font-semibold mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Tagore?
            </h2>
            <p className="text-gray-300 font-sans max-w-xl mx-auto">
              Virtue of life, vital role of society, vision of victory — we mould your child to become a good citizen.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors duration-200"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-base mb-3">{item.title}</h3>
                <p className="text-gray-400 text-base font-sans leading-relaxed">{item.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#D4AF37]">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1B3A6B] mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-[#1B3A6B]/80 font-sans mb-8 max-w-xl mx-auto">
            Admissions are open. Explore our programmes and take the first step towards a brighter future with Tagore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="px-8 py-3.5 bg-[#1B3A6B] text-white font-bold font-sans rounded hover:bg-[#122852] transition-colors duration-200"
            >
              Apply for Admission
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-[#1B3A6B] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#1B3A6B] hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

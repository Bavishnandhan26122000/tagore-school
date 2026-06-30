import Image from 'next/image';
import Link from 'next/link';
import { INSTITUTIONS } from '@/lib/data';

type InstitutionDetailProps = {
  id: string;
};

export default function InstitutionDetail({ id }: InstitutionDetailProps) {
  const inst = INSTITUTIONS.find((i) => i.id === id);
  if (!inst) return null;

  const others = INSTITUTIONS.filter((i) => i.id !== id);

  return (
    <>
      {/* Header with real institution image */}
      <div className="relative bg-[#1B3A6B] py-16 overflow-hidden">
        {inst.image && (
          <Image
            src={inst.image}
            alt={inst.name}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">
            Est. {inst.established} · {inst.affiliation}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{inst.name}</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/institutions" className="hover:text-[#D4AF37]">Institutions</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">{inst.shortName}</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 gold-underline">About the Institution</h2>
            <p className="text-gray-600 font-sans leading-relaxed mb-8 text-lg">{inst.description}</p>

            {/* Highlights */}
            <h3 className="text-lg font-bold text-[#1B3A6B] mb-4">Key Highlights</h3>
            <ul className="space-y-3 mb-8">
              {inst.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-600 font-sans">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Programmes */}
            <h3 className="text-lg font-bold text-[#1B3A6B] mb-4">Programmes Offered</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {inst.programs.map((p) => (
                <div key={p} className="flex items-center gap-3 bg-[#F8F9FA] rounded-lg px-4 py-3 border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                  <span className="text-gray-700 font-sans text-sm">{p}</span>
                </div>
              ))}
            </div>

            {/* Affiliation */}
            <div className="bg-[#1B3A6B]/5 rounded-xl p-5 border border-[#1B3A6B]/10">
              <h3 className="text-sm font-bold font-sans text-[#1B3A6B] uppercase tracking-wider mb-2">
                Affiliation
              </h3>
              <p className="text-gray-700 font-sans">{inst.affiliation}</p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="px-6 py-3 bg-[#D4AF37] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors"
              >
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-[#1B3A6B] text-[#1B3A6B] font-sans font-medium rounded hover:bg-[#1B3A6B] hover:text-white transition-colors"
              >
                Enquire Now
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="bg-[#1B3A6B] rounded-xl p-6 text-white">
              <h3 className="text-[#D4AF37] font-bold font-sans uppercase text-xs tracking-widest mb-5">
                Quick Facts
              </h3>
              <dl className="space-y-3">
                {[
                  { label: 'Established', value: String(inst.established) },
                  { label: 'Affiliation', value: inst.affiliation },
                  { label: 'Programmes', value: `${inst.programs.length} courses` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-sans text-gray-400 uppercase tracking-wider">{label}</dt>
                    <dd className="text-white font-sans text-sm mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Other institutions */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#1B3A6B] text-sm font-sans uppercase tracking-wider mb-4">
                Other Institutions
              </h3>
              <ul className="space-y-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link
                      href={o.href}
                      className="flex items-center gap-2 text-sm font-sans text-gray-600 hover:text-[#1B3A6B] py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      {o.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact box */}
            <div className="bg-[#D4AF37] rounded-xl p-6">
              <h3 className="font-bold text-[#1B3A6B] text-sm font-sans uppercase tracking-wider mb-3">
                Need More Info?
              </h3>
              <p className="text-[#1B3A6B]/80 font-sans text-sm mb-4">
                Our admissions team is happy to answer any questions.
              </p>
              <Link
                href="/contact"
                className="block text-center px-4 py-2.5 bg-[#1B3A6B] text-white font-bold font-sans text-sm rounded hover:bg-[#122852] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

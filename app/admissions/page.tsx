import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { INSTITUTIONS, SITE } from '@/lib/data';

export const metadata: Metadata = { title: 'Admissions' };

const PROCESS_STEPS = [
  { step: '01', title: 'Choose Your Institution', desc: 'Browse our five institutions and select the one that matches your academic level and goals.' },
  { step: '02', title: 'Contact the Admissions Office', desc: 'Call or email us to understand the specific eligibility, intake dates, and fee structure for your chosen programme.' },
  { step: '03', title: 'Submit Your Application', desc: 'Fill out the application form and submit required documents including mark sheets, transfer certificate, and photographs.' },
  { step: '04', title: 'Interview / Counselling', desc: 'Attend an admission counselling session at the campus. For professional courses, this may include an entrance/aptitude assessment.' },
  { step: '05', title: 'Fee Payment & Enrolment', desc: 'Upon selection, complete fee payment and collect your enrolment confirmation to begin your journey at Tagore.' },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        title="Admissions Open"
        subtitle="Join the Tagore family. Admissions are open for the academic year across all five institutions."
      />

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-10 gold-underline">Admission Process</h2>
          <div className="space-y-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#1B3A6B] flex items-center justify-center text-[#D4AF37] font-bold text-sm font-sans">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-[#1B3A6B] font-bold text-base mb-1">{s.title}</h3>
                  <p className="text-gray-600 font-sans text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions grid */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-8 text-center">Admissions by Institution</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INSTITUTIONS.map((inst) => (
              <div key={inst.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-widest mb-1">
                  Est. {inst.established}
                </div>
                <h3 className="text-[#1B3A6B] font-bold text-sm mb-2">{inst.name}</h3>
                <p className="text-gray-500 font-sans text-xs mb-3">{inst.affiliation}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inst.programs.slice(0, 2).map((p) => (
                    <span key={p} className="text-xs font-sans bg-[#1B3A6B]/8 text-[#1B3A6B] px-2 py-0.5 rounded-full">
                      {p}
                    </span>
                  ))}
                </div>
                <Link
                  href={inst.href}
                  className="text-[#D4AF37] font-sans text-xs font-semibold hover:text-[#1B3A6B] transition-colors"
                >
                  View Institution →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship note */}
      <section className="py-12 bg-[#1B3A6B]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Scholarships Available</h2>
          <p className="text-gray-300 font-sans mb-4 max-w-xl mx-auto">
            We offer merit-based and need-based scholarships. We also implement the RTE Act 2009,
            reserving 25 seats per academic year for eligible students in our Matric School.
          </p>
          <p className="text-[#D4AF37] font-sans font-semibold">
            Contact us to learn more about financial assistance options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="px-6 py-3 bg-[#D4AF37] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors"
            >
              Call: {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-white text-white font-sans rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

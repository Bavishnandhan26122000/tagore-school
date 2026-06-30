import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Facilities' };

const FACILITIES = [
  { icon: '📚', title: 'Library & Resource Centre', desc: 'Thousands of volumes across subjects, digital catalogues, and a quiet reading environment.' },
  { icon: '🏪', title: 'Campus Store', desc: 'On-campus store providing stationery, books, and nutritionally balanced refreshments.' },
  { icon: '🍽️', title: 'Canteen', desc: 'Hygienic, affordable meals and snacks prepared fresh daily for students and staff.' },
  { icon: '🚌', title: 'Transport', desc: 'Bus routes covering major towns in the Salem district for safe, reliable student transport.' },
  { icon: '🏠', title: 'Hostel (Selected Campuses)', desc: 'Separate boys and girls hostels with 24/7 security, meals, and recreation facilities.' },
  { icon: '🌱', title: 'Green Campus', desc: 'Tree-lined campuses with natural gardens, particularly at the Nursing College, promoting wellness.' },
  { icon: '💊', title: 'Medical Room', desc: 'On-campus first-aid and nurse stations at every institution for student health emergencies.' },
  { icon: '🔒', title: 'Safety & Security', desc: 'CCTV surveillance, trained security personnel, and controlled campus access for student safety.' },
];

export default function FacilitiesPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">Campus Life</p>
          <h1 className="text-4xl font-bold text-white mb-3">Facilities</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Facilities</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            We believe the environment in which a student learns matters as much as the curriculum.
            Our campuses are equipped with modern facilities designed to support academic focus, physical wellbeing, and safety.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACILITIES.map((f) => (
              <div key={f.title} className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100 card-lift text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-[#1B3A6B] font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-gray-500 font-sans text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

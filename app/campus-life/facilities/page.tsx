import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Facilities',
  description: 'Libraries, laboratories, hostels, transport, and more across the Tagore campuses.',
};

// Cards with a real photo are shown larger; icon-only cards fill the rest.
const PHOTO_FACILITIES = [
  { img: '/images/facility/science-lab.jpg', title: 'Science Laboratories', desc: 'Fully equipped Physics, Chemistry, and Biology labs for hands-on, practical learning.' },
  { img: '/images/facility/computer.jpg', title: 'Computer Lab', desc: 'Modern computer labs with internet access and up-to-date software for digital literacy.' },
  { img: '/images/facility/language.jpg', title: 'Language Lab', desc: 'Dedicated language laboratory to build communication and English-speaking skills.' },
  { img: '/images/facility/audio.jpg', title: 'Audio-Visual Hall', desc: 'AV-equipped smart hall for seminars, presentations, and interactive learning sessions.' },
  { img: '/images/facility/boys-hostel.jpg', title: 'Boys Hostel', desc: 'Safe, comfortable residential facilities with 24/7 security, meals, and supervision.' },
  { img: '/images/facility/girls-hostel.jpg', title: 'Girls Hostel', desc: 'Separate, secure girls hostel with warden supervision, dining, and recreation.' },
  { img: '/images/facility/bus.jpg', title: 'Transport', desc: 'Bus routes covering major towns across the Salem district for reliable student transport.' },
];

const ICON_FACILITIES = [
  { icon: '📚', title: 'Library & Resource Centre', desc: 'Thousands of volumes, digital catalogues, and a quiet reading environment.' },
  { icon: '🍽️', title: 'Canteen', desc: 'Hygienic, affordable meals and snacks prepared fresh daily for students and staff.' },
  { icon: '🌱', title: 'Green Campus', desc: 'Tree-lined campuses with natural gardens, promoting student wellness.' },
  { icon: '💊', title: 'Medical Room', desc: 'On-campus first-aid and nurse stations for student health emergencies.' },
  { icon: '🔒', title: 'Safety & Security', desc: 'CCTV surveillance, trained personnel, and controlled campus access.' },
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
            <Link href="/campus-life" className="hover:text-[#D4AF37]">Campus Life</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Facilities</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            We believe the environment in which a student learns matters as much as the curriculum.
            Our campuses are equipped with modern facilities designed to support academic focus,
            physical wellbeing, and safety.
          </p>

          {/* Photo cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {PHOTO_FACILITIES.map((f) => (
              <div key={f.title} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm card-lift">
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[#1B3A6B] font-bold text-base mb-1.5">{f.title}</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Icon cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {ICON_FACILITIES.map((f) => (
              <div key={f.title} className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100 card-lift text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
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

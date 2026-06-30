import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BOARD_MEMBERS, DIRECTORS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Meet the 27 directors and 6 board members who guide the Tagore Educational Institutions.',
};

function PersonCard({
  name, title, image, isBoardMember = false,
}: {
  name: string; title: string; image: string | null; isBoardMember?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden border text-center card-lift ${isBoardMember ? 'border-[#D4AF37]/50 shadow-md' : 'border-gray-100 shadow-sm'}`}>
      <div className="relative w-full aspect-square bg-gray-100">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover object-top" sizes="200px" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isBoardMember ? 'bg-[#D4AF37]' : 'bg-[#1B3A6B]'}`}>
            <svg className="w-10 h-10 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )}
        {isBoardMember && (
          <div className="absolute top-2 right-2 bg-[#D4AF37] text-[#1B3A6B] text-xs font-bold font-sans px-2 py-0.5 rounded-full">
            Board
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-xs leading-snug text-gray-800 mb-0.5">{name}</h3>
        <p className={`text-xs font-sans ${isBoardMember ? 'text-[#D4AF37] font-semibold' : 'text-gray-500'}`}>
          {title}
        </p>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl font-bold text-white mb-3">Our Leadership</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[#D4AF37]">About</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Leadership</span>
          </div>
        </div>
      </div>

      <section className="py-12 bg-[#F8F9FA] border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600 font-sans leading-relaxed">
            Tagore Educational Institutions is guided by a distinguished leadership of{' '}
            <strong>27 directors</strong>, including <strong>6 board members</strong>, who bring decades
            of combined experience in education, administration, and community development.
          </p>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">Board of Directors</h2>
            <p className="text-gray-500 font-sans text-sm">
              The six-member board sets the strategic direction and governance of the institution group.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {BOARD_MEMBERS.map((member) => (
              <PersonCard key={member.name} name={member.name} title={member.title} image={member.image} isBoardMember />
            ))}
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">Directors</h2>
            <p className="text-gray-500 font-sans text-sm">
              Our 21 directors bring expertise across academia, industry, and public service.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {DIRECTORS.map((director) => (
              <PersonCard key={director.name} name={director.name} title={director.title} image={director.image} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

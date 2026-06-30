import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
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
    <div
      className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#1B3A6B] card-lift ring-1 ${isBoardMember ? 'ring-2 ring-[#D4AF37]' : 'ring-gray-200'
        }`}
    >
      {/* Photo / fallback */}
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="200px"
          loading="lazy"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${isBoardMember ? 'bg-[#D4AF37]' : 'bg-[#1B3A6B]'
            }`}
        >
          <svg className="h-12 w-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      )}

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2144] via-[#0D2144]/25 to-transparent" />

      {/* Board badge */}
      {isBoardMember && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-[#D4AF37] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1B3A6B] font-sans shadow-sm">
          Board
        </span>
      )}

      {/* Name / title overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <span className="mb-1.5 block h-0.5 w-6 rounded-full bg-[#D4AF37] transition-all duration-300 group-hover:w-10" />
        <h3 className="text-[13px] font-bold leading-tight text-white drop-shadow-sm">{name}</h3>
        <p
          className={`mt-0.5 text-[11px] font-sans leading-snug ${isBoardMember ? 'text-[#E8CC6A]' : 'text-gray-300'
            }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <PageHeader title="Our Leadership" />

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

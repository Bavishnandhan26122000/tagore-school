import Link from 'next/link';
import { INSTITUTIONS } from '@/lib/data';

export default function InstitutionsMarquee() {
  return (
    <div className="bg-[#122852] text-white py-3 overflow-hidden whitespace-nowrap flex items-center border-y border-[#2451A0]">
      <div className="flex animate-marquee w-max">
        {/* We render the list twice to create a seamless infinite loop */}
        {[...INSTITUTIONS, ...INSTITUTIONS].map((inst, i) => (
          <Link
            key={i}
            href={inst.href}
            className="flex items-center gap-4 mx-8 hover:text-[#D4AF37] transition-colors"
          >
            <span className="text-xl">🏫</span>
            <span className="text-base font-bold font-sans tracking-wide uppercase">{inst.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

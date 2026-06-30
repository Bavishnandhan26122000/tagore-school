import Link from 'next/link';
import { INSTITUTIONS } from '@/lib/data';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#1B3A6B] px-6 py-20">
      <div className="max-w-xl text-center">
        <div className="text-[#D4AF37] font-bold text-7xl sm:text-8xl mb-4">404</div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="h-px w-10 bg-[#D4AF37]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-300 font-sans mb-8 leading-relaxed">
          The page you&#39;re looking for doesn&#39;t exist or may have moved. Let&#39;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/"
            className="px-6 py-3 bg-[#D4AF37] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border-2 border-white text-white font-sans font-medium rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-gray-400 font-sans text-xs uppercase tracking-widest mb-3">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {INSTITUTIONS.map((inst) => (
              <Link
                key={inst.id}
                href={inst.href}
                className="text-gray-300 text-sm font-sans bg-white/5 hover:bg-[#D4AF37] hover:text-[#1B3A6B] px-3 py-1.5 rounded-full transition-colors"
              >
                {inst.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

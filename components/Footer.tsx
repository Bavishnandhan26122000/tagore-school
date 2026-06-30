import Image from 'next/image';
import Link from 'next/link';
import { SITE, INSTITUTIONS, NAV_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#0D2144] text-white">
      {/* Gold top bar */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8CC6A] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <Image
              src="/images/logo-textprimary.png"
              alt="Tagore Educational Institutions"
              width={347}
              height={112}
              className="h-12 w-auto"
              loading="lazy"
            />
          </div>
          <p className="text-gray-400 text-base font-sans leading-relaxed mb-4">
            Run by the {SITE.society}. Providing quality education since {SITE.founded}.
          </p>
          <p className="text-[#D4AF37] text-base font-sans italic">&ldquo;{SITE.tagline}&rdquo;</p>
        </div>

        {/* Institutions */}
        <div>
          <h4 className="text-[#D4AF37] font-bold font-sans uppercase text-xs tracking-widest mb-4">
            Our Institutions
          </h4>
          <ul className="space-y-2">
            {INSTITUTIONS.map((inst) => (
              <li key={inst.id}>
                <Link
                  href={inst.href}
                  className="text-gray-300 text-base font-sans hover:text-[#D4AF37] transition-colors duration-150"
                >
                  {inst.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[#D4AF37] font-bold font-sans uppercase text-xs tracking-widest mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-300 text-base font-sans hover:text-[#D4AF37] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#D4AF37] font-bold font-sans uppercase text-xs tracking-widest mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-base font-sans text-gray-300">
            <li className="flex gap-2">
              <span className="mt-0.5">📍</span>
              <span>{SITE.location}</span>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex gap-2 hover:text-[#D4AF37] transition-colors">
                <span>📞</span> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone2.replace(/\s/g, '')}`} className="flex gap-2 hover:text-[#D4AF37] transition-colors">
                <span>📞</span> {SITE.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex gap-2 hover:text-[#D4AF37] transition-colors break-all">
                <span>✉</span> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1B3A6B] py-5 text-center text-gray-500 text-sm font-sans">
        © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
      </div>
    </footer>
  );
}

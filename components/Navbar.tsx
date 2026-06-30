'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS, SITE } from '@/lib/data';

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1B3A6B] hover:text-white transition-colors duration-150"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#122852] text-white text-sm hidden md:flex items-center justify-between px-6 py-1.5">
        <span className="font-sans">Run by {SITE.society}</span>
        <div className="flex items-center gap-6 font-sans">
          <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-[#D4AF37] transition-colors">
            📞 {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:text-[#D4AF37] transition-colors">
            ✉ {SITE.email}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'shadow-lg bg-[#1B3A6B]' : 'bg-[#1B3A6B]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
              <Image
                src="/images/logo-textprimary.png"
                alt="Tagore Logo"
                fill
                className="object-contain p-0.5"
                sizes="40px"
              />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight">
                Tagore Educational
              </div>
              <div className="text-[#D4AF37] text-xs font-sans tracking-wide uppercase">
                Institutions
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {(NAV_LINKS as NavLink[]).map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-white text-sm font-sans font-medium rounded hover:text-[#D4AF37] transition-colors duration-150"
                >
                  {link.label}
                  {link.children && (
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.children && openDropdown === link.label && (
                  <DropdownMenu items={link.children} />
                )}
              </div>
            ))}
            <Link
              href="/admissions"
              className="ml-3 px-4 py-2 bg-[#D4AF37] text-[#1B3A6B] text-sm font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors duration-150"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#122852] border-t border-[#2451A0] px-4 py-3 space-y-1">
            {(NAV_LINKS as NavLink[]).map((link) => (
              <div key={link.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className="block py-2 text-white font-sans text-sm font-medium hover:text-[#D4AF37]"
                    onClick={() => !link.children && setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                      }
                      className="text-white p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d={mobileExpanded === link.label ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                      </svg>
                    </button>
                  )}
                </div>
                {link.children && mobileExpanded === link.label && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#D4AF37] pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1.5 text-gray-300 text-sm font-sans hover:text-[#D4AF37] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admissions"
              className="block mt-3 px-4 py-2.5 bg-[#D4AF37] text-[#1B3A6B] text-sm font-bold font-sans rounded text-center"
              onClick={() => setMobileOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

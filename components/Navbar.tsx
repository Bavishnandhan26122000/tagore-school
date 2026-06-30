'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { NAV_LINKS, SITE } from '@/lib/data';

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// A top-level nav item is active when the current path is, or is nested under,
// its href. Home ("/") only matches exactly so it isn't active everywhere.
function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    // pt-2 creates an invisible bridge so the mouse doesn't leave the parent
    // when moving from the trigger into the dropdown panel
    <div className="absolute top-full left-0 pt-2 w-56 z-50">
      <div className="bg-white border border-gray-100 rounded-lg shadow-xl py-2">
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
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Delay timer ref — prevents the dropdown from closing during the mouse
  // transition from the nav link into the dropdown panel
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const closeMenu = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }, []);

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

  // Clean up timer on unmount
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // Close the mobile menu and any open dropdown whenever the route changes,
  // so the menu doesn't stay open on top of the newly navigated page.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

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
          scrolled ? 'shadow-lg' : ''
        } bg-[#1B3A6B]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo — full white logo (portrait + name) at natural ratio on navy */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Tagore Educational Institutions — Home">
            <Image
              src="/images/logo-textprimary.png"
              alt="Tagore Educational Institutions"
              width={347}
              height={112}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {(NAV_LINKS as NavLink[]).map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children ? openMenu(link.label) : closeMenu()}
                onMouseLeave={closeMenu}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-sans font-medium rounded transition-colors duration-150 whitespace-nowrap ${
                    isActive(pathname, link.href)
                      ? 'text-[#D4AF37]'
                      : 'text-white hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <svg
                      className={`w-3 h-3 opacity-70 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.children && openDropdown === link.label && (
                  // Cancel close timer when mouse enters dropdown panel
                  <div onMouseEnter={() => openMenu(link.label)} onMouseLeave={closeMenu}>
                    <DropdownMenu items={link.children} />
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admissions"
              className="ml-3 px-4 py-2 bg-[#D4AF37] text-[#1B3A6B] text-sm font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors duration-150 whitespace-nowrap"
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
                    className={`block py-2 font-sans text-sm font-medium ${
                      isActive(pathname, link.href) ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                    }`}
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

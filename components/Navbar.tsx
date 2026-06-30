'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { NAV_LINKS, SITE, type NavLinkDef } from '@/lib/data';

type NavLink = NavLinkDef;

// A top-level nav item is active when the current path is, or is nested under,
// its href. Home ("/") only matches exactly so it isn't active everywhere.
function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DropdownMenu({
  items,
  pathname,
}: {
  items: { label: string; href: string }[];
  pathname: string;
}) {
  return (
    // pt-3 creates an invisible bridge so the mouse doesn't leave the parent
    // when moving from the trigger into the dropdown panel
    <div className="absolute top-full left-0 pt-3 w-64 z-50">
      <div className="dropdown-panel relative origin-top rounded-xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
        {/* Caret connecting the panel to the trigger */}
        <span className="absolute -top-1.5 left-7 h-3 w-3 rotate-45 rounded-tl-sm bg-white ring-1 ring-black/5" />
        <div className="relative">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group/item relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-sans font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-[#1B3A6B] text-white'
                    : 'text-gray-600 hover:bg-[#1B3A6B]/[0.06] hover:text-[#1B3A6B]'
                }`}
              >
                {/* Leading gold accent bar — appears on hover / active */}
                <span
                  className={`h-5 w-0.5 shrink-0 rounded-full transition-all duration-150 ${
                    active ? 'bg-[#D4AF37]' : 'bg-transparent group-hover/item:bg-[#D4AF37]'
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {/* Arrow slides in on hover / active */}
                <svg
                  className={`h-3.5 w-3.5 shrink-0 text-[#D4AF37] transition-all duration-150 ${
                    active
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-1 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
          } bg-[#1B3A6B]`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

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
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-sans font-medium rounded transition-colors duration-150 whitespace-nowrap ${isActive(pathname, link.href)
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
                    <DropdownMenu items={link.children} pathname={pathname} />
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
          <div className="lg:hidden bg-[#122852] border-t border-[#2451A0] px-4 py-4 space-y-3">
            
            {/* Extremely prominent mobile contact bar */}
            <div className="bg-white/10 rounded-lg p-4 mb-4 flex flex-col gap-2">
              <span className="text-gray-300 text-xs uppercase tracking-wider font-bold">Contact School</span>
              <a href={`tel:${SITE.phone.replace(/\\s/g, '')}`} className="text-[#D4AF37] font-bold text-lg flex items-center gap-2">
                📞 {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="text-white text-sm flex items-center gap-2">
                ✉ {SITE.email}
              </a>
            </div>

            {(NAV_LINKS as NavLink[]).map((link) => (
              <div key={link.href} className="border-b border-white/5 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 py-3 font-sans ${isActive(pathname, link.href) ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                      }`}
                    onClick={() => !link.children && setMobileOpen(false)}
                  >
                    {link.icon && <span className="text-xl">{link.icon}</span>}
                    <div>
                      <div className="text-base font-medium">{link.label}</div>
                      {link.subtitle && <div className="text-xs text-gray-400 font-normal">{link.subtitle}</div>}
                    </div>
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
                  <div className="ml-10 mt-1 space-y-1 border-l-2 border-[#D4AF37]/40 pl-3">
                    {link.children.map((child) => {
                      const active = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-md px-3 py-3 text-base font-sans transition-colors ${
                            active
                              ? 'bg-[#D4AF37] text-[#1B3A6B] font-bold'
                              : 'text-gray-300 hover:bg-white/10 hover:text-[#D4AF37]'
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admissions"
              className="block mt-4 px-4 py-4 bg-[#D4AF37] text-[#1B3A6B] text-base font-bold font-sans rounded-lg text-center"
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Human-readable label for each known route segment. Anything not listed falls
// back to title-casing the segment (e.g. "some-page" -> "Some Page").
const CRUMB_LABELS: Record<string, string> = {
  about: 'About',
  history: 'Our History',
  emblem: 'Our Emblem',
  leadership: 'Leadership',
  institutions: 'Institutions',
  'matric-school': 'Matric School',
  'cbse-school': 'CBSE School',
  engineering: 'Engineering College',
  education: 'College of Education',
  nursing: 'College of Nursing',
  'campus-life': 'Campus Life',
  academics: 'Academics',
  facilities: 'Facilities',
  sports: 'Sports',
  events: 'Events',
  achievements: 'Achievements',
  gallery: 'Gallery',
  contact: 'Contact',
  admissions: 'Admissions',
};

// The small uppercase "eyebrow" above the title is the section the page sits in.
const SECTION_EYEBROW: Record<string, string> = {
  about: 'About Us',
  'campus-life': 'Campus Life',
  institutions: 'Institutions',
  gallery: 'Gallery',
  contact: 'Contact',
  admissions: 'Admissions',
};

function titleCase(segment: string) {
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  image,
}: {
  title: string;
  /** Optional lead paragraph shown under the title. */
  subtitle?: string;
  /** Override the auto-derived section eyebrow. */
  eyebrow?: string;
  /** Optional background photo — switches the band to a photo-banner style. */
  image?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: CRUMB_LABELS[seg] ?? titleCase(seg),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));
  const resolvedEyebrow =
    eyebrow ??
    (segments[0] ? SECTION_EYEBROW[segments[0]] ?? titleCase(segments[0]) : undefined);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3A6B] via-[#122852] to-[#0D2144]">
      {/* Optional background photo */}
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      )}

      {/* Decorative gold glow + diagonal accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3"
        style={{ background: 'linear-gradient(135deg, transparent 55%, rgba(212,175,55,0.10) 100%)' }}
      />
      {image && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0D2144] via-[#0D2144]/70 to-[#0D2144]/40"
        />
      )}

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-8">
        {/* Auto breadcrumb */}
        {/* <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-sans text-sm text-gray-300">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-x-1.5">
                  <svg
                    className="h-3.5 w-3.5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {isLast ? (
                    <span className="font-medium text-[#D4AF37]" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="transition-colors hover:text-[#D4AF37]">
                      {c.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav> */}

        {resolvedEyebrow && (
          <p className="mb-3 flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-widest text-[#D4AF37]">
            <span className="h-px w-7 bg-[#D4AF37]" />
            {resolvedEyebrow}
          </p>
        )}

        <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl">{title}</h1>
        <div className="mt-4 h-1 w-16 rounded-full bg-[#D4AF37]" />

        {subtitle && (
          <p className="mt-5 max-w-2xl font-sans leading-relaxed text-gray-300">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

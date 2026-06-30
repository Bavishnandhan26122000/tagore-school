import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, TAGORE_ACRONYM } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Tagore Educational Institutions — our mission, values, and the society that drives us.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl font-bold text-white mb-3">About Tagore Educational Institutions</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">About Us</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 gold-underline">Our Story</h2>
            <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
              <p>
                Tagore Educational Institutions was founded in <strong>1986</strong> with a single school
                at Deviyakurichi, near Attur, in the Salem District of Tamil Nadu. From its inception, the
                institution was driven by a singular purpose: to make quality education accessible to every
                child, irrespective of their background.
              </p>
              <p>
                Run by the <strong>{SITE.society}</strong>, the group has grown steadily over four decades
                into a comprehensive educational ecosystem of five institutions — spanning from Pre-KG schooling
                to professional degree programmes in Engineering, Education, and Nursing.
              </p>
              <p>
                Today, Tagore serves over <strong>7,000 students</strong> with a faculty and staff strength
                of more than <strong>500 dedicated educators and administrators</strong>. Our leadership
                comprises <strong>27 directors</strong>, including six board members, whose collective
                vision and commitment have steered the group through decades of growth.
              </p>
              <p>
                The name &ldquo;Tagore&rdquo; carries immense significance — it is synonymous with knowledge,
                literary excellence, and humanistic values. We wear that name with pride and responsibility,
                ensuring our institutions live up to the ideals it represents.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#1B3A6B] mt-10 mb-6 gold-underline">Our Mission</h2>
            <p className="text-gray-600 font-sans leading-relaxed">
              To provide a transformative educational experience that develops intellectual curiosity, moral integrity,
              and professional excellence in every student — enabling them to contribute meaningfully to society
              and the nation.
            </p>

            <h2 className="text-2xl font-bold text-[#1B3A6B] mt-10 mb-6 gold-underline">Our Vision</h2>
            <p className="text-gray-600 font-sans leading-relaxed">
              To be the most trusted educational institution in Tamil Nadu, recognised for academic excellence,
              holistic development, and a commitment to rural empowerment through education.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick nav */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#1B3A6B] mb-4 font-sans text-sm uppercase tracking-wide">
                In This Section
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our History', href: '/about/history' },
                  { label: 'Our Emblem', href: '/about/emblem' },
                  { label: 'Leadership', href: '/about/leadership' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm font-sans text-gray-600 hover:text-[#1B3A6B] py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact box */}
            <div className="bg-[#1B3A6B] rounded-xl p-6 text-white">
              <h3 className="font-bold mb-3 font-sans text-sm uppercase tracking-wide text-[#D4AF37]">
                Get in Touch
              </h3>
              <p className="text-gray-300 text-sm font-sans mb-4">
                Have a question about our institutions? We&#39;re here to help.
              </p>
              <Link
                href="/contact"
                className="block text-center px-4 py-2.5 bg-[#D4AF37] text-[#1B3A6B] font-bold text-sm font-sans rounded hover:bg-[#E8CC6A] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TAGORE acronym */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2 text-center">What TAGORE Stands For</h2>
          <p className="text-gray-500 font-sans text-center mb-10">
            Every letter of our name reflects a value we uphold and embody every day.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TAGORE_ACRONYM.map(({ letter, word }) => (
              <div key={letter} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1B3A6B] flex items-center justify-center text-[#D4AF37] font-bold text-2xl shrink-0">
                  {letter}
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-sans uppercase tracking-wider">Letter {letter}</div>
                  <div className="text-[#1B3A6B] font-bold text-lg">{word}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-10 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Excellence', desc: 'We hold every student, teacher, and administrator to the highest standards of academic and personal excellence.' },
              { title: 'Integrity', desc: 'We operate with transparency, honesty, and ethical responsibility — in the classroom and in the boardroom.' },
              { title: 'Inclusivity', desc: 'We believe education is a universal right. Our RTE commitments and scholarship programmes reflect this conviction.' },
            ].map((v) => (
              <div key={v.title} className="border-l-4 border-[#D4AF37] pl-5">
                <h3 className="text-[#1B3A6B] font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

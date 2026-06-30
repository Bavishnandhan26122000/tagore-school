import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { SITE, INSTITUTIONS } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="We welcome enquiries from prospective students, parents, and partners."
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-8 gold-underline">Contact Information</h2>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center shrink-0 text-xl">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-sm mb-1">Address</h3>
                  <p className="text-gray-600 font-sans text-sm leading-relaxed">{SITE.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center shrink-0 text-xl">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-sm mb-1">Phone</h3>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-gray-600 font-sans text-sm block hover:text-[#1B3A6B]">
                    {SITE.phone}
                  </a>
                  <a href={`tel:${SITE.phone2.replace(/\s/g, '')}`} className="text-gray-600 font-sans text-sm block hover:text-[#1B3A6B]">
                    {SITE.phone2}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center shrink-0 text-xl">
                  ✉
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3A6B] text-sm mb-1">Email</h3>
                  <a href={`mailto:${SITE.email}`} className="text-gray-600 font-sans text-sm hover:text-[#1B3A6B]">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            {/* <div className="rounded-xl bg-[#F8F9FA] border border-gray-100 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-gray-400 font-sans text-sm">Map embed — add Google Maps iframe here</p>
              </div>
            </div> */}
            <div className="rounded-xl border border-gray-100 overflow-hidden h-48">
              <iframe
                className="w-full h-full"
                src="https://maps.google.com/maps?hl=en&q=Tagore%20Matric%20Higher%20Secondary%20School,%20Deviyakurichi,%20Attur%20(TK),%20Salem(DT).%20Pincode%20-%20636112.&ie=UTF8&t=roadmap&z=15&iwloc=B&output=embed"
                allowFullScreen={true}
                loading="lazy"
                title="Tagore Educational Institutions - Google Maps"
              />
            </div>

            {/* Institution contacts */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#1B3A6B] mb-5">Institution-Specific Contacts</h3>
              <div className="space-y-3">
                {INSTITUTIONS.map((inst) => (
                  <div key={inst.id} className="flex items-center justify-between bg-[#F8F9FA] rounded-lg px-4 py-3 border border-gray-100">
                    <span className="text-gray-700 font-sans text-sm">{inst.shortName}</span>
                    <Link href={inst.href} className="text-[#D4AF37] font-sans text-xs font-medium hover:text-[#1B3A6B]">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-8 gold-underline">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Gallery' };

const GALLERY_IMAGES = Array.from({ length: 33 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.jpg`,
  alt: `Tagore Campus Photo ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">Gallery</p>
          <h1 className="text-4xl font-bold text-white mb-3">Photo Gallery</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Gallery</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-500 font-sans text-center mb-10">
            A glimpse of life across the Tagore campuses — academics, events, sports, and culture.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 card-lift cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/40 transition-colors duration-200 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

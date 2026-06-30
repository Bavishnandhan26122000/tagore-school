import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos of campus life, events, sports, and culture across the Tagore Educational Institutions.',
};

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
            Click any photo to view it full size.
          </p>
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
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
      <PageHeader title="Photo Gallery" />

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

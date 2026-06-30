import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/Reveal';

const POSTERS = [
  {
    year: "2023-2024",
    images: [
      "/images/achievements/5.jpg",
      "/images/achievements/6.jpg"
    ]
  },
  {
    year: "2022-2023",
    images: [
      "/images/achievements/3.png",
      "/images/achievements/4.png"
    ]
  },
  {
    year: "2021-2022",
    images: [
      "/images/achievements/1.png",
      "/images/achievements/2.png"
    ]
  }
];

export default function StudentAchievements() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
        {POSTERS.map((group) => (
          <div key={group.year}>
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A6B] gold-underline pb-2 inline-block">
                Achievements {group.year}
              </h2>
            </Reveal>
            
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {group.images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 card-lift">
                  <Image
                    src={img}
                    alt={`Achievements ${group.year}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain bg-gray-50"
                  />
                </div>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}

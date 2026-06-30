import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Achievements' };

const ACHIEVEMENTS = [
  {
    category: 'Academic',
    items: [
      'Consistent 100% pass results in Board examinations across Matric and CBSE schools',
      'Multiple district and state rank holders in Tamil Nadu and CBSE board examinations',
      'NAAC Accreditation for Tagore College of Education',
      'Anna University affiliation for Tagore Institute of Engineering and Technology',
    ],
  },
  {
    category: 'Sports',
    items: [
      'District-level champions in Cricket, Football, and Kabaddi',
      'State-level participants in Athletics (Track & Field)',
      'Annual inter-school sports meet with 500+ participants',
    ],
  },
  {
    category: 'Cultural',
    items: [
      'Winners at district-level cultural competitions in music, dance, and drama',
      'Science exhibition awards at regional level',
      'Debate and elocution champions at multiple district competitions',
    ],
  },
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader title="Achievements" />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            Decades of dedication have produced countless achievements — from board toppers and national scholars
            to sports champions and cultural award winners. Here is a snapshot of what our community has accomplished.
          </p>

          <div className="space-y-10">
            {ACHIEVEMENTS.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-1 bg-[#D4AF37] rounded" />
                  <h2 className="text-xl font-bold text-[#1B3A6B]">{section.category} Achievements</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-[#F8F9FA] rounded-lg px-5 py-4 border border-gray-100">
                      <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">★</span>
                      <span className="text-gray-700 font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

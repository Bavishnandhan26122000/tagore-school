import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'School Events' };

const EVENTS = [
  { month: 'June', title: 'Welcome Day / Orientation', description: 'New students and parents are welcomed across all campuses with an orientation programme introducing them to faculty, facilities, and institutional values.' },
  { month: 'August', title: 'Independence Day Celebrations', description: 'Cultural performances, patriotic events, flag hoisting, and prize distribution to academic achievers.' },
  { month: 'September', title: 'Annual Science Exhibition', description: 'Students from Grades 6–12 and Engineering display innovative science and technology projects judged by expert panels.' },
  { month: 'October', title: 'Annual Sports Day', description: 'A full-day athletics and team sports event across campuses — celebrating physical fitness, teamwork, and healthy competition.' },
  { month: 'November', title: 'Cultural Festival', description: 'Inter-house music, dance, drama, and fine arts competitions. A highlight of the academic calendar.' },
  { month: 'January', title: 'Pongal & Republic Day', description: 'Harvest festival celebrations and Republic Day events with traditional performances and community engagement.' },
  { month: 'February', title: 'Annual Day & Prize Distribution', description: 'The flagship event of the academic year — felicitating top students, cultural performances, and addresses by distinguished guests.' },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader title="School Events" />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            Life at Tagore extends well beyond the classroom. Our academic calendar is enriched with events
            that develop creativity, leadership, patriotism, and community spirit.
          </p>

          <div className="space-y-5">
            {EVENTS.map((event) => (
              <div key={event.title} className="flex gap-6 bg-[#F8F9FA] rounded-xl p-6 border border-gray-100 card-lift">
                <div className="shrink-0 w-20 flex flex-col items-center justify-center bg-[#1B3A6B] rounded-lg text-center py-3 px-2">
                  <span className="text-[#D4AF37] font-bold text-xs font-sans uppercase tracking-wider">{event.month}</span>
                </div>
                <div>
                  <h3 className="text-[#1B3A6B] font-bold text-base mb-1">{event.title}</h3>
                  <p className="text-gray-600 font-sans text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

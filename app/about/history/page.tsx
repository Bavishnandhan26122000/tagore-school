import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our History',
  description: 'The story of Tagore Educational Institutions — from a single school in 1986 to five premier institutions.',
};

const TIMELINE = [
  {
    year: '1986',
    title: 'The Foundation',
    description:
      'Tagore Matriculation Higher Secondary School is established at Deviyakurichi, near Attur, Salem, by the Southern Educational and Rural Development Society. The founding vision: to bring quality education to the rural heartland of Tamil Nadu.',
  },
  {
    year: '2005',
    title: 'Tagore College of Education',
    description:
      'Responding to the critical need for trained teachers in the region, the Tagore College of Education is founded, offering the two-year B.Ed programme and affiliated to the Tamil Nadu Teachers Education University. The college later earns NAAC accreditation.',
  },
  {
    year: '2008',
    title: 'Tagore Institute of Engineering and Technology',
    description:
      'The group expands into professional education with the launch of TIET, affiliated to Anna University. The institution offers B.E., M.E., and MBA programmes in a serene, rural campus setting designed for focused learning.',
  },
  {
    year: '2012',
    title: 'Tagore Public Senior Secondary School (CBSE)',
    description:
      'To serve families seeking a nationally recognised curriculum, the group launches its CBSE-affiliated school, offering Pre-KG to Grade 12 with a focus on conceptual learning and competitive examination preparation.',
  },
  {
    year: '2022',
    title: 'Tagore College of Nursing',
    description:
      'The newest chapter in the Tagore story: a state-of-the-art nursing college affiliated to TN Dr. MGR Medical University, offering B.Sc Nursing and GNM programmes, nurturing the next generation of compassionate healthcare professionals.',
  },
];

export default function HistoryPage() {
  return (
    <>
      <div className="bg-[#1B3A6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#D4AF37] font-sans uppercase text-xs tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl font-bold text-white mb-3">Our History</h1>
          <div className="flex items-center gap-2 text-gray-300 font-sans text-sm">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Our History</span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed mb-14 text-center max-w-2xl mx-auto">
            What began as a single school in the rural heartland of Tamil Nadu has grown, over four decades,
            into a group of five institutions that touches the lives of over 7,000 students every year.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E5E7EB] hidden md:block" />

            <div className="space-y-12">
              {TIMELINE.map((event, idx) => (
                <div key={event.year} className="relative flex gap-8 md:ml-0">
                  {/* Year badge */}
                  <div className="shrink-0 w-16 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#1B3A6B] border-4 border-white shadow-md flex items-center justify-center z-10 relative">
                      <span className="text-[#D4AF37] font-bold text-sm font-sans">{event.year}</span>
                    </div>
                    {idx < TIMELINE.length - 1 && (
                      <div className="flex-1 w-0.5 bg-[#E5E7EB] mt-2 hidden md:block" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#F8F9FA] rounded-xl p-6 border border-gray-100 mb-2">
                    <div className="text-[#D4AF37] font-bold text-xs font-sans uppercase tracking-widest mb-1">
                      {event.year}
                    </div>
                    <h3 className="text-[#1B3A6B] font-bold text-xl mb-3">{event.title}</h3>
                    <p className="text-gray-600 font-sans leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">And the Journey Continues...</h2>
            <p className="text-gray-300 font-sans max-w-xl mx-auto mb-6">
              Our leadership is committed to expanding and elevating Tagore&#39;s impact — building new programmes,
              upgrading infrastructure, and extending our reach to more students across Tamil Nadu.
            </p>
            <Link
              href="/about/leadership"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-[#1B3A6B] font-bold font-sans rounded hover:bg-[#E8CC6A] transition-colors"
            >
              Meet Our Leadership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

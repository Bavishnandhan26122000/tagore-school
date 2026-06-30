import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { TAGORE_ACRONYM } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Emblem',
  description: 'Learn about the Tagore Educational Institutions emblem and the values it represents.',
};

export default function EmblemPage() {
  return (
    <>
      <PageHeader title="Our Emblem" />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Emblem placeholder */}
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 rounded-full bg-[#1B3A6B] border-8 border-[#D4AF37] flex flex-col items-center justify-center shadow-2xl">
              <div className="text-[#D4AF37] font-bold text-5xl mb-1">T</div>
              <div className="text-white font-sans text-xs tracking-widest uppercase">Tagore</div>
              <div className="mt-2 h-0.5 w-12 bg-[#D4AF37]" />
              <div className="text-gray-300 font-sans text-xs mt-2 text-center px-4 leading-tight">
                Knowledge is Power
              </div>
            </div>
            <p className="text-gray-400 font-sans text-xs mt-4 text-center">
              Official emblem of Tagore Educational Institutions
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 gold-underline">The Significance</h2>
            <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
              <p>
                Our emblem is a symbol of the values, aspirations, and commitments that define the Tagore
                Educational Institutions. Every element carries meaning — the deep blue represents knowledge
                and depth of thought; the gold represents excellence and achievement.
              </p>
              <p>
                The name &ldquo;Tagore&rdquo; invokes the legacy of Rabindranath Tagore, the poet-philosopher
                whose life was a testament to the transformative power of education, art, and human connection.
                Our institutions aspire to carry that spirit forward.
              </p>
              <p>
                Our motto, <strong>&ldquo;Knowledge is Power&rdquo;</strong>, is not merely a tagline — it is
                the conviction that drives every decision we make, every programme we design, and every student
                we nurture.
              </p>
            </div>
          </div>
        </div>

        {/* Acronym section */}
        <div className="max-w-4xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2 text-center">TAGORE — An Acronym of Values</h2>
          <p className="text-gray-500 font-sans text-center mb-10">
            Each letter of our name is a pillar of our institutional character.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {TAGORE_ACRONYM.map(({ letter, word }) => (
              <div
                key={letter}
                className="flex flex-col items-center bg-[#F8F9FA] rounded-xl px-6 py-5 border border-gray-100 w-32 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#1B3A6B] flex items-center justify-center text-[#D4AF37] font-bold text-xl mb-2">
                  {letter}
                </div>
                <div className="text-[#1B3A6B] font-bold text-sm">{word}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

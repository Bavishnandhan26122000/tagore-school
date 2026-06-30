import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Academics' };

const ACADEMIC_FEATURES = [
  {
    title: 'Smart Classrooms',
    description: 'Interactive digital boards and AV-equipped classrooms across all institutions for an engaging learning experience.',
    icon: '🖥️',
  },
  {
    title: 'Well-Equipped Laboratories',
    description: 'Physics, Chemistry, Biology, Computer, and Engineering labs with modern instruments and regular updates.',
    icon: '🔬',
  },
  {
    title: 'Curriculum Excellence',
    description: 'Syllabi aligned to state and national boards (Tamil Nadu Matriculation, CBSE, Anna University, NAAC-accredited B.Ed).',
    icon: '📖',
  },
  {
    title: 'Co-Curricular Integration',
    description: 'Debate, quiz, science exhibitions, and cultural programmes integrated into the academic calendar.',
    icon: '🏆',
  },
  {
    title: 'Exam Preparation',
    description: 'Dedicated coaching for NEET, JEE, CUET, and government competitive examinations.',
    icon: '📝',
  },
  {
    title: 'Online Learning Resources',
    description: 'Access to digital libraries, e-learning platforms, and recorded lectures for students.',
    icon: '💻',
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHeader title="Academics" />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gray-600 font-sans leading-relaxed text-lg mb-12 max-w-3xl">
            Academic excellence is at the heart of the Tagore experience. Across all five institutions,
            we maintain rigorous standards while ensuring each student is supported, challenged, and inspired to reach their potential.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_FEATURES.map((f) => (
              <div key={f.title} className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100 card-lift">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-[#1B3A6B] font-bold text-base mb-2">{f.title}</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

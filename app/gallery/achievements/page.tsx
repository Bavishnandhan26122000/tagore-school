import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import StudentAchievements from '@/components/StudentAchievements';

export const metadata: Metadata = {
  title: 'Student Achievements',
  description:
    'Celebrating our board-exam toppers and high achievers across all standards — name, marks, and distinctions, year by year.',
};

export default function StudentAchievementsPage() {
  return (
    <>
      <PageHeader
        title="Student Achievements"
        subtitle="Celebrating the hard work of our students — board-exam toppers and high achievers, standard by standard, year after year."
      />
      <StudentAchievements />
    </>
  );
}

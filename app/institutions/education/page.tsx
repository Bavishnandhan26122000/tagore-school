import type { Metadata } from 'next';
import InstitutionDetail from '@/components/InstitutionDetail';

export const metadata: Metadata = { title: 'Tagore College of Education' };

export default function EducationPage() {
  return <InstitutionDetail id="education" />;
}

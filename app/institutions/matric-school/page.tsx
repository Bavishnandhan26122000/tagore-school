import type { Metadata } from 'next';
import InstitutionDetail from '@/components/InstitutionDetail';

export const metadata: Metadata = { title: 'Tagore Matriculation Higher Secondary School' };

export default function MatricSchoolPage() {
  return <InstitutionDetail id="matric-school" />;
}

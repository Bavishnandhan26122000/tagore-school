import type { Metadata } from 'next';
import InstitutionDetail from '@/components/InstitutionDetail';

export const metadata: Metadata = { title: 'Tagore College of Nursing' };

export default function NursingPage() {
  return <InstitutionDetail id="nursing" />;
}

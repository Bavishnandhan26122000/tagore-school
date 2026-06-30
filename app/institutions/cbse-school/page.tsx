import type { Metadata } from 'next';
import InstitutionDetail from '@/components/InstitutionDetail';

export const metadata: Metadata = { title: 'Tagore Public Senior Secondary School (CBSE)' };

export default function CBSESchoolPage() {
  return <InstitutionDetail id="cbse-school" />;
}

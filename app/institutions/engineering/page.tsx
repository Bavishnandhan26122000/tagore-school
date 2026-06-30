import type { Metadata } from 'next';
import InstitutionDetail from '@/components/InstitutionDetail';

export const metadata: Metadata = { title: 'Tagore Institute of Engineering and Technology' };

export default function EngineeringPage() {
  return <InstitutionDetail id="engineering" />;
}

import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AnnouncementsBoard from '@/components/AnnouncementsBoard';

export const metadata: Metadata = {
  title: 'Announcements',
  description:
    'Latest updates from Tagore Educational Institutions — public exam results, events, notices, rules, holidays, and admission announcements.',
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Stay up to date with the latest results, events, notices, rules, and important dates across all Tagore campuses."
      />
      <AnnouncementsBoard />
    </>
  );
}

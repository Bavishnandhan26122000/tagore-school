import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Tagore Educational Institutions — run by the Southern Educational and Rural Development Society. Five world-class institutions offering Pre-KG to Postgraduate education in Salem, Tamil Nadu since 1986.',
  keywords: [
    'Tagore Educational Institutions',
    'Tagore Matric School',
    'Tagore CBSE School',
    'Tagore Engineering College',
    'Salem school',
    'Tamil Nadu education',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/data';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const DESCRIPTION =
  'Tagore Educational Institutions — run by the Southern Educational and Rural Development Society. Five world-class institutions offering Pre-KG to Postgraduate education in Salem, Tamil Nadu since 1986.';

export const metadata: Metadata = {
  metadataBase: new URL('https://tagoreeducationalinstitutions.com'),
  title: {
    default: `${SITE.name} | Salem, Tamil Nadu`,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Tagore Educational Institutions',
    'Tagore Matric School',
    'Tagore CBSE School',
    'Tagore Engineering College',
    'Tagore College of Nursing',
    'Tagore College of Education',
    'Salem school',
    'Tamil Nadu education',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: DESCRIPTION,
    locale: 'en_IN',
    images: [{ url: '/images/slider/1-1.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: DESCRIPTION,
    images: ['/images/slider/1-1.jpg'],
  },
  icons: { icon: '/images/favicon.png', shortcut: '/images/favicon.png', apple: '/images/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

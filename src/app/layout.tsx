import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ThemeProvider } from '@/components/ThemeProvider';
import JsonLd, { getOrganizationSchema } from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NexGen Tech Academy | Premier Commercial IT Training & Research Institute',
  description:
    'Master high-demand tech skills in Generative AI, Full Stack Development, Cyber Security, UI/UX Design, Cloud DevOps, and Data Analytics. 100% hands-on project labs with 94% job placement rate.',
  keywords: [
    'IT Training Institute',
    'Generative AI Course',
    'Full Stack Web Development',
    'Next.js 15 Bootcamp',
    'Cyber Security Certification',
    'UI UX Design Academy',
    'AWS DevOps Training',
    'Data Analytics Power BI',
    'Job Placement Guarantee',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  authors: [{ name: 'NexGen Tech Academy Academic Council' }],
  openGraph: {
    title: 'Build Your Tech Career at NexGen Tech Academy',
    description:
      'Learn Generative AI, Full Stack Next.js, Cyber Security & UI/UX from former Microsoft, Amazon & Adobe industry leaders.',
    url: 'https://nexgentechacademy.com',
    siteName: 'NexGen Tech Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NexGen Tech Academy Modern Computer Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGen Tech Academy | Professional IT Training Institute',
    description: 'Premier Tech Training in AI, Full Stack, Cyber Security & DevOps.',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#0b0f19] light:bg-[#f8fafc] text-slate-100 light:text-slate-900 transition-colors duration-200 selection:bg-blue-600 selection:text-white">
        <ThemeProvider>
          <JsonLd data={getOrganizationSchema()} />
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
            <Breadcrumbs />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

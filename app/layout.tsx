import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolwools.com'),
  title: {
    default: 'ToolWools — Every tool your workflow will ever need.',
    template: '%s | ToolWools',
  },
  description:
    'A luxury-minimal suite of 100+ free online tools — SEO, image, PDF, text, and developer utilities. No signup. Instant. Beautifully crafted.',
  openGraph: {
    title: 'ToolWools — Every tool your workflow will ever need.',
    description:
      '100+ free online tools, crafted like luxury software. SEO, image, PDF, text, developer.',
    url: 'https://toolwools.com',
    siteName: 'ToolWools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@toolwools',
  },
  alternates: { canonical: 'https://toolwools.com' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

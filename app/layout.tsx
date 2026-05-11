import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-bricolage',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolstack.io'),
  title: 'ToolStack — Free Online SEO, PDF, Image & AI Tools | No Signup Needed',
  description:
    'ToolStack gives you 100+ free online tools for SEO analysis, image compression, PDF editing, word counting, JSON formatting, and more. No account. No limits. Works in every browser.',
  keywords:
    'free online tools, SEO tools, image compressor, PDF compressor, word counter, meta tag generator, JSON formatter, domain authority checker, free tools no signup',
  openGraph: {
    title: 'ToolStack — Every Tool Your Workflow Will Ever Need',
    description:
      '100+ free SEO, image, PDF, text, AI and developer tools. No signup. No paywalls. Just fast, reliable tools that work.',
    url: 'https://toolstack.io',
    siteName: 'ToolStack',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@toolstack',
  },
  alternates: { canonical: 'https://toolstack.io' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ToolStack',
              url: 'https://toolstack.io',
              description: 'Free online tools for SEO, images, PDFs, text, AI and developers.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://toolstack.io/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is the best free image compressor online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "ToolStack's Image Compressor reduces JPG, PNG, and WEBP files by up to 72% with no quality loss. No signup needed. Works directly in your browser.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I check my domain authority for free?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Use ToolStack's Domain Authority Checker. Paste your URL and get your DA score, backlink count, and SEO health report in seconds.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is ToolStack free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, 100% free. All 100+ tools require no account, no subscription, and have no usage limits.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the best free PDF compressor?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "ToolStack's PDF Compressor reduces file sizes without degrading text or image quality. Upload, compress, download. Nothing is stored on our servers.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What free SEO tools are available online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ToolStack includes a Meta Tag Generator, Keyword Density Checker, SERP Analyzer, Backlink Checker, Site Audit tool, and Domain Authority Checker — all free.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-body bg-bg text-body antialiased">
        {children}
      </body>
    </html>
  );
}

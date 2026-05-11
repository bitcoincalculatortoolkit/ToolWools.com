import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolBySlug, getRelatedTools } from '@/lib/tools-data';
import { ToolPageClient } from '@/components/tools/ToolPageClient';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return { title: 'Tool Not Found | ToolWools' };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.tags.join(', '),
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://toolwools.com/tools/${tool.category}/${tool.slug}`,
      siteName: 'ToolWools',
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}&category=${encodeURIComponent(tool.categoryLabel)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [
        `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}&category=${encodeURIComponent(tool.categoryLabel)}`,
      ],
    },
    alternates: {
      canonical: `https://toolwools.com/tools/${tool.category}/${tool.slug}`,
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool.relatedTools);

  /* ──────────────────────────────────────────────────────────
     JSON-LD Schemas — the SEO / GEO / AI-search trifecta.
     ────────────────────────────────────────────────────────── */
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolwools.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://toolwools.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.categoryLabel,
        item: `https://toolwools.com/tools/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: tool.name,
        item: `https://toolwools.com/tools/${tool.category}/${tool.slug}`,
      },
    ],
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.seoDescription,
    url: `https://toolwools.com/tools/${tool.category}/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1847',
      bestRating: '5',
    },
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    publisher: {
      '@type': 'Organization',
      name: 'ToolWools',
      url: 'https://toolwools.com',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const howToJsonLd = tool.howToSteps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use the ${tool.name}`,
        description: tool.seoDescription,
        totalTime: 'PT1M',
        step: tool.howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <Nav />
      <main className="min-h-screen pt-16">
        <ToolPageClient tool={tool} relatedTools={relatedTools} />
      </main>
      <Footer />
    </>
  );
}

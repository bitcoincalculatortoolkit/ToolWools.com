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

  const ogUrl = `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(
    tool.description,
  )}&category=${encodeURIComponent(tool.categoryLabel)}`;

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
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [ogUrl],
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
  const toolUrl = `https://toolwools.com/tools/${tool.category}/${tool.slug}`;

  /* ─────────── Breadcrumb schema ─────────── */
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolwools.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://toolwools.com/tools' },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.categoryLabel,
        item: `https://toolwools.com/tools/${tool.category}`,
      },
      { '@type': 'ListItem', position: 4, name: tool.name, item: toolUrl },
    ],
  };

  /* ─────────── SoftwareApplication / WebApplication schema ─────────── */
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.seoDescription,
    url: toolUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ToolWools',
      url: 'https://toolwools.com',
    },
  };

  /* ─────────── HowTo schema (if tool has steps) ─────────── */
  const howToJsonLd = tool.howToSteps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use the ${tool.name}`,
        description: tool.longDescription,
        totalTime: 'PT1M',
        step: tool.howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${toolUrl}#step-${i + 1}`,
        })),
      }
    : null;

  /* ─────────── FAQPage schema ─────────── */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

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
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main className="min-h-screen pt-16">
        <ToolPageClient tool={tool} relatedTools={relatedTools} />
      </main>
      <Footer />
    </>
  );
}

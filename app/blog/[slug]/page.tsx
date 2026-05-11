import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBlogPostBySlug,
  getAllBlogPosts,
  getRelatedBlogPosts,
} from '@/lib/blog-data';
import ArticleLayout from '@/components/blog/ArticleLayout';
import ArticleCard from '@/components/blog/ArticleCard';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import CompressImagesArticle from './articles/CompressImagesArticle';
import BestSeoToolsArticle from './articles/BestSeoToolsArticle';
import JsonFormattingArticle from './articles/JsonFormattingArticle';
import ReducePdfArticle from './articles/ReducePdfArticle';

const articleComponents: Record<string, React.ComponentType> = {
  'how-to-compress-images-for-web': CompressImagesArticle,
  'best-free-seo-tools-2025': BestSeoToolsArticle,
  'json-formatting-guide-for-developers': JsonFormattingArticle,
  'reduce-pdf-file-size-guide': ReducePdfArticle,
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://toolstack.io/blog/${post.slug}`,
      siteName: 'ToolStack',
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
    alternates: {
      canonical: `https://toolstack.io/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const ArticleContent = articleComponents[params.slug];
  if (!ArticleContent) notFound();

  const relatedPosts = getRelatedBlogPosts(params.slug, 2);

  return (
    <>
      <Nav />
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Organization',
              name: 'ToolStack',
              url: 'https://toolstack.io',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ToolStack',
              url: 'https://toolstack.io',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://toolstack.io/blog/${post.slug}`,
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />

      <ArticleLayout post={post}>
        <ArticleContent />
      </ArticleLayout>

      {/* Related Articles */}
      <section className="bg-white border-t border-border">
        <div className="max-w-page mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl text-dark mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <ArticleCard key={related.slug} post={related} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

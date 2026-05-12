import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog-data';
import ArticleCard from '@/components/blog/ArticleCard';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog — Free Tools Tips & Guides | ToolWools',
  description:
    'Tips, guides, and insights on image compression, SEO, PDF optimization, JSON formatting, and getting more done with free online tools.',
  openGraph: {
    title: 'Blog — Free Tools Tips & Guides | ToolWools',
    description:
      'Tips, guides, and insights for getting more done with free online tools.',
    url: 'https://toolwools.com/blog',
    siteName: 'ToolWools',
    type: 'website',
  },
  alternates: { canonical: 'https://toolwools.com/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg pt-20">
        {/* Header */}
        <section className="bg-white border-b border-border">
          <div className="max-w-page mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Tips, guides, and insights for getting more done with free tools
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-page mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

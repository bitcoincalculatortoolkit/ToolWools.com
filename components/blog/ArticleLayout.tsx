import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';
import { getToolBySlug } from '@/lib/tools-data';

interface ArticleLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export default function ArticleLayout({ post, children }: ArticleLayoutProps) {
  const relatedTools = post.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-page mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dark font-medium truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-page mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="flex-1 lg:max-w-[70%]">
            <div className="bg-white rounded-card border border-border shadow-card p-6 sm:p-8 lg:p-10">
              {/* Article prose */}
              <div className="prose-article">{children}</div>
            </div>

            {/* Share buttons */}
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-muted">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://toolstack.io/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://toolstack.io/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
              >
                LinkedIn
              </a>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Copy link"
              >
                Copy Link
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-[30%] space-y-6">
            {/* Related Tools */}
            <div className="bg-white rounded-card border border-border shadow-card p-5">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wide mb-4">
                Related Tools
              </h3>
              <div className="space-y-3">
                {relatedTools.map((tool) =>
                  tool ? (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.category}/${tool.slug}`}
                      className="block p-3 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <div className="font-medium text-sm text-dark group-hover:text-primary transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-xs text-muted mt-1 line-clamp-1">
                        {tool.description}
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-card border border-primary-200 p-5">
              <h3 className="text-sm font-bold text-dark mb-2">
                Get Tool Tips Weekly
              </h3>
              <p className="text-xs text-muted mb-4">
                Free tips on productivity, SEO, and web development delivered
                every Thursday.
              </p>
              <form className="space-y-2" action="#">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Table of Contents (stub) */}
            <div className="bg-white rounded-card border border-border shadow-card p-5 hidden lg:block">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wide mb-3">
                On This Page
              </h3>
              <p className="text-xs text-muted">
                Scroll through the article to explore each section. Use headings
                as waypoints.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

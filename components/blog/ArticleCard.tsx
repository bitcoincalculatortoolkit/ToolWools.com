import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';

const categoryGradients: Record<string, string> = {
  'Image Tools': 'from-orange-400 to-rose-500',
  SEO: 'from-blue-500 to-indigo-600',
  Developer: 'from-emerald-400 to-teal-600',
  PDF: 'from-purple-500 to-pink-600',
};

const categoryColors: Record<string, string> = {
  'Image Tools': 'bg-orange-100 text-orange-700',
  SEO: 'bg-blue-100 text-blue-700',
  Developer: 'bg-emerald-100 text-emerald-700',
  PDF: 'bg-purple-100 text-purple-700',
};

export default function ArticleCard({ post }: { post: BlogPost }) {
  const gradient = categoryGradients[post.category] || 'from-gray-400 to-gray-600';
  const badgeColor = categoryColors[post.category] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-card border border-gray-100/60 overflow-hidden shadow-card transition-all duration-300 group-hover:shadow-hover group-hover:-translate-y-1">
        {/* Image area */}
        <div
          className={`h-52 bg-gradient-to-br ${gradient} relative overflow-hidden`}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          {/* Category badge bottom-left */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
            >
              {post.category}
            </span>
          </div>
          {/* Reading time badge top-right */}
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-dark leading-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read More &rarr;
          </div>
        </div>
      </article>
    </Link>
  );
}

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
      <article className="bg-white rounded-card border border-border overflow-hidden shadow-card transition-all duration-300 group-hover:shadow-hover group-hover:-translate-y-1">
        {/* Image placeholder */}
        <div
          className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-dark leading-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
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

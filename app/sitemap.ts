import { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools-data';
import { getAllBlogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const blogPosts = getAllBlogPosts();

  const toolPages = tools.map((tool) => ({
    url: `https://toolstack.io/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `https://toolstack.io/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: 'https://toolstack.io', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://toolstack.io/tools', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: 'https://toolstack.io/blog', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    ...toolPages,
    ...blogPages,
  ];
}

import { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();

  const toolPages = tools.map((tool) => ({
    url: `https://toolstack.io/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: 'https://toolstack.io', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://toolstack.io/tools', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...toolPages,
  ];
}

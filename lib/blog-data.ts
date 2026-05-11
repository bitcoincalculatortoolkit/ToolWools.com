export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  relatedTools: string[]; // slugs that link to tool pages
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-compress-images-for-web',
    title: 'How to Compress Images for Web Without Losing Quality',
    excerpt:
      'Learn the best techniques to compress images for faster web performance while maintaining visual quality. Covers formats, tools, and optimization strategies.',
    category: 'Image Tools',
    date: '2025-01-15',
    readingTime: '6 min read',
    seoTitle: 'How to Compress Images for Web Without Losing Quality | ToolStack Blog',
    seoDescription:
      'Learn proven techniques to compress images for web without losing quality. Covers JPG, PNG, WEBP optimization, lazy loading, and free tools to speed up your website.',
    tags: ['image compression', 'web performance', 'image optimization', 'page speed'],
    relatedTools: ['image-compressor', 'pdf-compressor'],
  },
  {
    slug: 'best-free-seo-tools-2025',
    title: '10 Best Free SEO Tools in 2025 (No Signup Required)',
    excerpt:
      'Discover the top free SEO tools that require no account creation. From domain authority checkers to meta tag generators — everything you need for better rankings.',
    category: 'SEO',
    date: '2025-01-10',
    readingTime: '8 min read',
    seoTitle: '10 Best Free SEO Tools in 2025 (No Signup Required) | ToolStack Blog',
    seoDescription:
      'Discover the 10 best free SEO tools in 2025 that require no signup. Domain authority checkers, meta tag generators, keyword tools and more — all completely free.',
    tags: ['SEO tools', 'free tools', 'domain authority', 'meta tags', 'keyword research'],
    relatedTools: ['domain-authority-checker', 'meta-tag-generator'],
  },
  {
    slug: 'json-formatting-guide-for-developers',
    title: 'The Complete Guide to JSON Formatting & Validation',
    excerpt:
      'Master JSON formatting, validation, and debugging. Learn best practices for working with JSON data, common errors, and how to fix them quickly.',
    category: 'Developer',
    date: '2025-01-05',
    readingTime: '7 min read',
    seoTitle: 'The Complete Guide to JSON Formatting & Validation | ToolStack Blog',
    seoDescription:
      'Master JSON formatting and validation with this complete guide. Learn JSON syntax, common errors, debugging tips, and the best free tools for developers.',
    tags: ['JSON', 'formatting', 'validation', 'developer tools', 'API'],
    relatedTools: ['json-formatter', 'word-counter'],
  },
  {
    slug: 'reduce-pdf-file-size-guide',
    title: 'How to Reduce PDF File Size: 5 Methods That Actually Work',
    excerpt:
      'Struggling with large PDF files? Learn 5 proven methods to reduce PDF file size without compromising readability or print quality.',
    category: 'PDF',
    date: '2024-12-28',
    readingTime: '5 min read',
    seoTitle: 'How to Reduce PDF File Size: 5 Methods That Actually Work | ToolStack Blog',
    seoDescription:
      'Learn 5 proven methods to reduce PDF file size without losing quality. Free online tools, compression techniques, and optimization tips for smaller PDFs.',
    tags: ['PDF compression', 'file size', 'PDF optimization', 'document management'],
    relatedTools: ['pdf-compressor', 'image-compressor'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

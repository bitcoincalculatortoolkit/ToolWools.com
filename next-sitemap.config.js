/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolstack.io',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: ['https://toolstack.io/sitemap-tools.xml'],
  },
  additionalPaths: async (config) => {
    const tools = [
      { category: 'image-tools', slug: 'image-compressor' },
      { category: 'text-tools', slug: 'word-counter' },
      { category: 'developer-tools', slug: 'json-formatter' },
      { category: 'seo-tools', slug: 'meta-tag-generator' },
      { category: 'pdf-tools', slug: 'pdf-compressor' },
      { category: 'seo-tools', slug: 'domain-authority-checker' },
    ];
    return tools.map((tool) => ({
      loc: `/tools/${tool.category}/${tool.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};

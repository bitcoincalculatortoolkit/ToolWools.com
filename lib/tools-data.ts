export interface ToolData {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  relatedTools: string[];
  faqs: Array<{ q: string; a: string }>;
}

const toolsRegistry: ToolData[] = [
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image-tools',
    categoryLabel: 'Image Tools',
    description: 'Compress JPG, PNG & WEBP images without losing quality. Reduce file sizes up to 80%.',
    longDescription:
      'Our free online Image Compressor reduces your image file sizes by up to 80% with minimal quality loss. Supports JPG, PNG, and WEBP formats. All processing happens in your browser — your images are never uploaded to any server. Compress multiple images at once with adjustable quality settings.',
    seoTitle: 'Free Image Compressor — Compress JPG, PNG, WEBP Online | ToolStack',
    seoDescription:
      'Compress images up to 80% smaller without quality loss. Free online JPG, PNG, WEBP compressor. No signup, no limits, works in your browser.',
    tags: ['image', 'compress', 'jpg', 'png', 'webp', 'resize', 'optimize'],
    relatedTools: ['word-counter', 'json-formatter', 'pdf-compressor'],
    faqs: [
      {
        q: 'How much can I compress my images?',
        a: 'Typically you can reduce file sizes by 40-80% depending on the image content and quality setting. Photos with lots of detail compress more than simple graphics.',
      },
      {
        q: 'Does compression reduce image quality?',
        a: 'Our compressor uses smart algorithms to minimize visible quality loss. At 75% quality, most images look identical to the original while being significantly smaller.',
      },
      {
        q: 'What image formats are supported?',
        a: 'We support JPG/JPEG, PNG, and WEBP formats. You can upload any of these and download the compressed version in the same format.',
      },
      {
        q: 'Are my images uploaded to a server?',
        a: 'No! All compression happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy.',
      },
      {
        q: 'How many images can I compress at once?',
        a: 'You can compress up to 10 images at a time. Each image is processed independently with its own quality settings and download button.',
      },
    ],
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text-tools',
    categoryLabel: 'Text Tools',
    description: 'Count words, characters, sentences & paragraphs instantly. Get reading time estimates.',
    longDescription:
      'The Word Counter tool provides real-time text analysis as you type. Get instant counts for words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Perfect for writers, students, and content creators who need to hit specific word counts.',
    seoTitle: 'Free Word Counter — Count Words, Characters, Sentences Online | ToolStack',
    seoDescription:
      'Count words, characters, sentences, and paragraphs in real-time. Free online word counter with reading time estimate. No signup needed.',
    tags: ['text', 'word count', 'character count', 'writing', 'content'],
    relatedTools: ['json-formatter', 'image-compressor', 'meta-tag-generator'],
    faqs: [
      {
        q: 'How is reading time calculated?',
        a: 'Reading time is estimated based on an average reading speed of 200 words per minute, which is the standard for adult readers consuming online content.',
      },
      {
        q: 'Does the counter work in real-time?',
        a: 'Yes! All statistics update instantly as you type or paste text. There is no delay or need to click a button to get your counts.',
      },
      {
        q: 'What counts as a sentence?',
        a: 'A sentence is counted each time a period (.), exclamation mark (!), or question mark (?) is followed by a space or end of text.',
      },
      {
        q: 'Can I set a character or word limit?',
        a: 'Yes! You can set an optional character limit to track how close you are to your target. A progress indicator shows your current usage.',
      },
      {
        q: 'What are the top keywords?',
        a: 'The top keywords section shows the 5 most frequently used words in your text, excluding common stop words like "the", "and", "is", etc.',
      },
    ],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer-tools',
    categoryLabel: 'Developer Tools',
    description: 'Format, validate & minify JSON data with syntax highlighting and tree view.',
    longDescription:
      'The JSON Formatter tool lets you paste raw JSON and instantly format it with proper indentation, validate its structure, minify it for production, or explore it in a collapsible tree view. Features syntax highlighting and detailed error messages with line numbers.',
    seoTitle: 'Free JSON Formatter & Validator — Format, Minify, Tree View | ToolStack',
    seoDescription:
      'Format, validate, and minify JSON online. Free JSON formatter with syntax highlighting, tree view, and error detection. No signup required.',
    tags: ['json', 'format', 'validate', 'minify', 'developer', 'api'],
    relatedTools: ['word-counter', 'image-compressor', 'domain-authority-checker'],
    faqs: [
      {
        q: 'Can this tool fix invalid JSON?',
        a: 'The tool will identify exactly where your JSON is invalid with line and position information. While it cannot auto-fix all issues, it helps you quickly locate and correct errors.',
      },
      {
        q: 'What is the difference between Format and Minify?',
        a: 'Format adds indentation and line breaks to make JSON readable. Minify removes all unnecessary whitespace to reduce file size — useful for production APIs.',
      },
      {
        q: 'Does the tree view support large JSON files?',
        a: 'Yes, the tree view uses collapsible nodes so you can navigate even very large JSON structures efficiently by expanding only the sections you need.',
      },
      {
        q: 'What does the syntax highlighting show?',
        a: 'Keys are displayed in dark text, strings in green, numbers in blue, booleans in purple, and null values in red — making it easy to scan complex JSON.',
      },
      {
        q: 'Is there a size limit for JSON input?',
        a: 'The tool works entirely in your browser, so it can handle JSON files up to several megabytes. Very large files may take a moment to parse and render.',
      },
    ],
  },
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Generate perfect meta tags for SEO. Live Google SERP & social media previews.',
    longDescription:
      'Create optimized meta tags for your web pages with our free Meta Tag Generator. See live previews of how your page will appear in Google search results and social media shares. Includes Open Graph and Twitter Card tags with character limit indicators and one-click copy.',
    seoTitle: 'Free Meta Tag Generator — SEO Meta Tags with SERP Preview | ToolStack',
    seoDescription:
      'Generate perfect meta tags for SEO with live Google SERP and social media previews. Free Open Graph and Twitter Card generator. Copy-ready HTML output.',
    tags: ['seo', 'meta tags', 'open graph', 'twitter card', 'serp', 'html'],
    relatedTools: ['domain-authority-checker', 'word-counter', 'json-formatter'],
    faqs: [
      {
        q: 'What are meta tags and why are they important?',
        a: 'Meta tags are HTML elements that provide metadata about your web page to search engines and social media platforms. They influence how your page appears in search results and when shared on social media.',
      },
      {
        q: 'What is the ideal length for a meta title?',
        a: 'Google typically displays the first 50-60 characters of a title tag. We recommend keeping your title under 60 characters to ensure it displays fully in search results without being truncated.',
      },
      {
        q: 'What is the ideal meta description length?',
        a: 'Meta descriptions should be between 120-155 characters. Google may display up to 155 characters, so keeping within this limit ensures your full description is visible in search results.',
      },
      {
        q: 'What are Open Graph tags?',
        a: 'Open Graph (OG) tags control how your page appears when shared on social media platforms like Facebook, LinkedIn, and Twitter. They define the title, description, image, and URL shown in the social card.',
      },
      {
        q: 'Do meta tags directly affect search rankings?',
        a: 'While meta descriptions do not directly impact rankings, well-written meta tags improve click-through rates from search results, which can indirectly boost your SEO performance. The title tag is a confirmed ranking factor.',
      },
    ],
  },
  {
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Compress PDF files to reduce size. Choose from multiple compression levels.',
    longDescription:
      'Reduce your PDF file sizes with our free PDF Compressor. Choose from low, medium, or high compression levels to balance quality and file size. Drag and drop up to 5 files at once. All processing happens in your browser for complete privacy.',
    seoTitle: 'Free PDF Compressor — Reduce PDF Size Online | ToolStack',
    seoDescription:
      'Compress PDF files up to 70% smaller. Free online PDF compressor with multiple compression levels. No signup, drag & drop, works in your browser.',
    tags: ['pdf', 'compress', 'reduce size', 'optimize', 'document'],
    relatedTools: ['image-compressor', 'meta-tag-generator', 'json-formatter'],
    faqs: [
      {
        q: 'How much can I reduce my PDF file size?',
        a: 'Depending on the compression level you choose, you can reduce PDF sizes by 10-70%. High compression offers the most reduction while low compression preserves more quality.',
      },
      {
        q: 'Does PDF compression reduce quality?',
        a: 'Low and medium compression levels maintain excellent quality for most documents. High compression may reduce image quality within the PDF but text remains sharp and readable.',
      },
      {
        q: 'How many PDFs can I compress at once?',
        a: 'You can compress up to 5 PDF files simultaneously. Each file is processed independently and you can download them individually once compression is complete.',
      },
      {
        q: 'Are my PDF files uploaded to a server?',
        a: 'No. Currently, the compression preview runs entirely in your browser. Your files never leave your device. Full server-side compression for maximum reduction is coming soon.',
      },
      {
        q: 'What is the maximum file size supported?',
        a: 'The browser-based tool works best with PDFs under 50MB. For larger files, our upcoming server-side compression will handle files up to 500MB.',
      },
    ],
  },
  {
    slug: 'domain-authority-checker',
    name: 'Domain Authority Checker',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Check domain authority, page authority, spam score & backlink metrics instantly.',
    longDescription:
      'Analyze any website\'s SEO strength with our Domain Authority Checker. Get instant metrics including Domain Authority (DA), Page Authority (PA), Spam Score, backlink count, referring domains, and domain age. Beautiful gauge charts and detailed health analysis help you understand your SEO standing.',
    seoTitle: 'Free Domain Authority Checker — DA, PA, Spam Score & Backlinks | ToolStack',
    seoDescription:
      'Check domain authority, page authority, and spam score for any website. Free DA checker with backlink analysis, referring domains, and SEO health score.',
    tags: ['seo', 'domain authority', 'backlinks', 'spam score', 'page authority', 'da checker'],
    relatedTools: ['meta-tag-generator', 'word-counter', 'image-compressor'],
    faqs: [
      {
        q: 'What is Domain Authority (DA)?',
        a: 'Domain Authority is a score from 0-100 developed by Moz that predicts how likely a website is to rank in search engine results. Higher scores indicate greater ranking potential.',
      },
      {
        q: 'What is a good Domain Authority score?',
        a: 'DA scores vary by niche, but generally: 60+ is excellent, 40-60 is good, 20-40 is average, and below 20 indicates a newer or less established site. Focus on improvement over time rather than absolute numbers.',
      },
      {
        q: 'What is Spam Score?',
        a: 'Spam Score indicates the percentage of sites with similar features that have been penalized or banned by search engines. A lower spam score (under 30%) is ideal. High scores suggest reviewing your backlink profile.',
      },
      {
        q: 'How often should I check my Domain Authority?',
        a: 'Domain Authority changes gradually. Checking monthly is sufficient for most sites. Focus on long-term trends rather than day-to-day fluctuations.',
      },
      {
        q: 'How can I improve my Domain Authority?',
        a: 'Improve DA by earning high-quality backlinks from authoritative sites, creating valuable content, fixing technical SEO issues, and removing toxic backlinks. It is a long-term metric that grows with consistent effort.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolData | undefined {
  return toolsRegistry.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slugs: string[]): ToolData[] {
  return toolsRegistry.filter((tool) => slugs.includes(tool.slug));
}

export function getAllTools(): ToolData[] {
  return toolsRegistry;
}

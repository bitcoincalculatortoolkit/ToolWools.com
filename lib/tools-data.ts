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
    relatedTools: ['word-counter', 'json-formatter'],
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
    relatedTools: ['json-formatter', 'image-compressor'],
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
    relatedTools: ['word-counter', 'image-compressor'],
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

export interface ToolData {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  /** 1-line card / meta description */
  description: string;
  /** Longer 2-3 sentence intro used in sidebar + OG */
  longDescription: string;
  /** Hero subheadline — friendly, benefit-oriented, 1-3 sentences */
  heroSubheadline?: string;
  /** Short highlight chips shown in the hero */
  heroHighlights?: string[];
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  relatedTools: string[];
  faqs: Array<{ q: string; a: string }>;
  /** Optional HowTo schema steps for GEO / AI search optimization */
  howToSteps?: Array<{ name: string; text: string }>;
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
    seoTitle: 'Free Image Compressor — Compress JPG, PNG, WEBP Online | ToolWools',
    seoDescription:
      'Compress images up to 80% smaller without quality loss. Free online JPG, PNG, WEBP compressor. No signup, no limits, works in your browser.',
    tags: ['image', 'compress', 'jpg', 'png', 'webp', 'resize', 'optimize'],
    relatedTools: ['word-counter', 'json-formatter', 'pdf-compressor'],
    faqs: [
      { q: 'How much can I compress my images?', a: 'Typically you can reduce file sizes by 40-80% depending on the image content and quality setting. Photos with lots of detail compress more than simple graphics.' },
      { q: 'Does compression reduce image quality?', a: 'Our compressor uses smart algorithms to minimize visible quality loss. At 75% quality, most images look identical to the original while being significantly smaller.' },
      { q: 'What image formats are supported?', a: 'We support JPG/JPEG, PNG, and WEBP formats. You can upload any of these and download the compressed version in the same format.' },
      { q: 'Are my images uploaded to a server?', a: 'No! All compression happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy.' },
      { q: 'How many images can I compress at once?', a: 'You can compress up to 10 images at a time. Each image is processed independently with its own quality settings and download button.' },
    ],
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text-tools',
    categoryLabel: 'Text Tools',
    description: 'Count words, characters, sentences, reading time, and keyword density in real time.',
    longDescription:
      'ToolWools&apos; free Word Counter is a complete writing-analytics dashboard. It counts words, characters, sentences, paragraphs, and syllables in real time, calculates Flesch-Kincaid readability scores, estimates reading and speaking time, surfaces the top recurring keywords with density percentages, and visualizes sentence-length distribution — all privately in your browser.',
    heroSubheadline:
      'A real-time word counter, character counter, readability analyzer, and keyword-density checker in one clean interface. Perfect for writers, students, SEO teams, and social media managers — no signup, no tracking, works entirely in your browser.',
    heroHighlights: [
      'Flesch-Kincaid readability',
      'Live SEO keyword density',
      'X / SMS / SEO presets',
    ],
    seoTitle:
      'Free Word Counter — Character Count, Reading Time & Keyword Density | ToolWools',
    seoDescription:
      'Free online word counter with real-time character count, sentence and paragraph stats, Flesch-Kincaid readability, reading time, and keyword density. No signup.',
    tags: [
      'word counter',
      'character counter',
      'reading time',
      'keyword density',
      'readability',
      'flesch kincaid',
      'writing tool',
    ],
    relatedTools: ['json-formatter', 'meta-tag-generator', 'image-compressor'],
    howToSteps: [
      { name: 'Paste or type your text', text: 'Open the editor and paste content from your document, or start typing directly. You can also upload a .txt or .md file.' },
      { name: 'Choose a target limit (optional)', text: 'Select a preset — X/Twitter, SMS, SEO title, meta description, LinkedIn headline, YouTube title — or enter a custom character limit.' },
      { name: 'Review the live statistics', text: 'Watch words, characters, sentences, paragraphs, reading time, and readability update as you type. Check keyword density for SEO optimization.' },
      { name: 'Export or copy the report', text: 'Copy your text back to the clipboard, listen to it with built-in text-to-speech, or copy a full analysis report to share with your team.' },
    ],
    faqs: [
      { q: 'How accurate is this word counter?', a: 'ToolWools counts every whitespace-separated token as a word, matching the behavior of Microsoft Word and Google Docs. Sentences are detected by terminal punctuation (. ! ?) with handling for ellipses and abbreviations. Syllables use a well-tested heuristic that powers the Flesch-Kincaid readability calculation.' },
      { q: 'How is reading time calculated?', a: 'Reading time uses 225 words per minute — the median pace for adult readers consuming online content, based on research by Nielsen Norman Group. Speaking time uses 130 WPM, the industry standard for broadcast and podcast delivery.' },
      { q: 'What is a good Flesch Reading Ease score?', a: 'For most web content, aim for a Flesch score of 60-70 — roughly an 8th-to-9th grade reading level. This matches how Google, major news outlets, and top-performing blogs write. Technical documentation can sit at 50-60; legal and academic content often falls below 30.' },
      { q: 'What is the ideal keyword density for SEO?', a: 'Most SEO experts recommend 1-3% density for your primary keyword. Below 1% is usually under-optimized for that term; above 5% can trigger over-optimization penalties from Google. Our Word Counter shows both raw count and percentage for the top 8 keywords.' },
      { q: 'Does the word counter work offline?', a: 'Yes. Once the page loads, every calculation runs in your browser. You can disconnect your internet connection and keep analyzing text. Nothing is sent to our servers.' },
      { q: 'Can I count words in languages other than English?', a: 'Word, character, sentence, and paragraph counts work for any Unicode text. However, readability scores and keyword density are tuned for English syllable patterns and stop words, so their scores are most meaningful for English content.' },
      { q: 'Is there a character limit on the input?', a: 'No hard limit. The tool has been tested with texts over 500,000 characters (about a short novel). Browser performance may slow with extremely long input, but all metrics remain accurate.' },
      { q: 'How are sentences counted?', a: 'A sentence ends at a period, exclamation mark, or question mark followed by whitespace or the end of text. Multiple consecutive punctuation marks (like "Wait!!!") count as one sentence boundary, and abbreviations are handled via context.' },
      { q: 'Can I upload a document directly?', a: 'Yes. Use the "Upload" button to load any plain-text (.txt) or markdown (.md) file. Word documents (.docx) and PDFs aren\'t supported directly — paste the text instead, or use our PDF Compressor to extract text first.' },
      { q: 'Is the Word Counter really 100% free?', a: 'Yes. No signup, no trial, no hidden paywall. ToolWools is supported by non-intrusive display ads on tool pages and optional affiliate recommendations. The full feature set is always available to everyone.' },
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
    seoTitle: 'Free JSON Formatter & Validator — Format, Minify, Tree View | ToolWools',
    seoDescription:
      'Format, validate, and minify JSON online. Free JSON formatter with syntax highlighting, tree view, and error detection. No signup required.',
    tags: ['json', 'format', 'validate', 'minify', 'developer', 'api'],
    relatedTools: ['word-counter', 'image-compressor', 'domain-authority-checker'],
    faqs: [
      { q: 'Can this tool fix invalid JSON?', a: 'The tool will identify exactly where your JSON is invalid with line and position information. While it cannot auto-fix all issues, it helps you quickly locate and correct errors.' },
      { q: 'What is the difference between Format and Minify?', a: 'Format adds indentation and line breaks to make JSON readable. Minify removes all unnecessary whitespace to reduce file size — useful for production APIs.' },
      { q: 'Does the tree view support large JSON files?', a: 'Yes, the tree view uses collapsible nodes so you can navigate even very large JSON structures efficiently by expanding only the sections you need.' },
      { q: 'What does the syntax highlighting show?', a: 'Keys are displayed in dark text, strings in green, numbers in blue, booleans in purple, and null values in red — making it easy to scan complex JSON.' },
      { q: 'Is there a size limit for JSON input?', a: 'The tool works entirely in your browser, so it can handle JSON files up to several megabytes. Very large files may take a moment to parse and render.' },
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
    seoTitle: 'Free Meta Tag Generator — SEO Meta Tags with SERP Preview | ToolWools',
    seoDescription:
      'Generate perfect meta tags for SEO with live Google SERP and social media previews. Free Open Graph and Twitter Card generator. Copy-ready HTML output.',
    tags: ['seo', 'meta tags', 'open graph', 'twitter card', 'serp', 'html'],
    relatedTools: ['domain-authority-checker', 'word-counter', 'json-formatter'],
    faqs: [
      { q: 'What are meta tags and why are they important?', a: 'Meta tags are HTML elements that provide metadata about your web page to search engines and social media platforms. They influence how your page appears in search results and when shared on social media.' },
      { q: 'What is the ideal length for a meta title?', a: 'Google typically displays the first 50-60 characters of a title tag. We recommend keeping your title under 60 characters to ensure it displays fully in search results without being truncated.' },
      { q: 'What is the ideal meta description length?', a: 'Meta descriptions should be between 120-155 characters. Google may display up to 155 characters, so keeping within this limit ensures your full description is visible in search results.' },
      { q: 'What are Open Graph tags?', a: 'Open Graph (OG) tags control how your page appears when shared on social media platforms like Facebook, LinkedIn, and Twitter. They define the title, description, image, and URL shown in the social card.' },
      { q: 'Do meta tags directly affect search rankings?', a: 'While meta descriptions do not directly impact rankings, well-written meta tags improve click-through rates from search results, which can indirectly boost your SEO performance. The title tag is a confirmed ranking factor.' },
    ],
  },
  {
    slug: 'sign-pdf',
    name: 'PDF Signer',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description:
      'Sign PDFs online free. Draw, type, or upload your signature, drop it on any page, download the signed PDF — all in your browser.',
    longDescription:
      'ToolWools&apos; free PDF Signer is a complete electronic-signature toolkit that runs entirely in your browser. Draw, type, or upload your signature, drag it onto any page, add date stamps and text labels, then download a flat signed PDF. Nothing uploads to any server.',
    heroSubheadline:
      'A free, private electronic signature tool. Draw your signature with a finger or mouse, type it in a handwriting font, or upload a PNG. Drag onto any page, resize, duplicate, add dates and stamps. Download a flattened PDF ready to email. No signup, no watermark, no upload — your document never leaves your device.',
    heroHighlights: [
      'Draw, type, or upload',
      'Multi-page & multi-stamp',
      '100% browser-based',
    ],
    seoTitle:
      'Free PDF Signer — Sign PDF Online, Draw or Type Signature | ToolWools',
    seoDescription:
      'Sign PDFs online free. Draw your signature, type it in a handwriting font, or upload a PNG. Drag onto any page and download. No signup, no upload, no watermark.',
    tags: [
      'sign pdf',
      'pdf signer',
      'electronic signature',
      'esign pdf',
      'pdf signature',
      'free pdf signer',
      'draw signature pdf',
    ],
    relatedTools: ['pdf-compressor', 'image-compressor', 'meta-tag-generator'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop your PDF onto the upload zone or click to browse. The tool renders each page locally in your browser.' },
      { name: 'Create your signature', text: 'Choose Draw to sign with your mouse or finger, Type to render your name in a handwriting font, or Upload to use a signature image.' },
      { name: 'Place it on the page', text: 'Click the Signature button to add it to the active page, then drag it to the right location. Resize using the corner handle, or duplicate with one click.' },
      { name: 'Add date and text stamps', text: 'Optionally add today&apos;s date or a custom text label like Approved or your title. Stamps can be moved and resized just like signatures.' },
      { name: 'Download the signed PDF', text: 'Choose a filename and click download. The output is a flat standard PDF ready to email back or file.' },
    ],
    faqs: [
      { q: 'Is signing a PDF with ToolWools legally binding?', a: 'In most countries, yes. The US ESIGN Act and EU eIDAS Regulation recognize electronic signatures as legally valid for ordinary business contracts, provided the signer shows intent, the signature is associated with the document, and both parties consent to electronic business. ToolWools satisfies all three conditions for everyday use — NDAs, invoices, client agreements, offer letters. A few document classes (wills, some property deeds) still require physical signatures.' },
      { q: 'Does my PDF upload to a server?', a: 'No. The entire tool runs in your browser using Mozilla\'s open-source pdf.js (rendering) and pdf-lib (modification). Your document is never transmitted. You can verify this by disconnecting your internet after the page loads — every feature still works.' },
      { q: 'What is the difference between Draw, Type, and Upload?', a: 'Draw lets you write your signature with a mouse, trackpad, or touchscreen directly on a signature pad. Type converts your name into a handwriting-style font (four styles available). Upload lets you supply an existing signature as a PNG or JPG. All three produce the same final result on the PDF — a flattened image embedded on the page.' },
      { q: 'Can I sign a PDF on my phone or tablet?', a: 'Yes. The signature pad supports touch input with full pressure awareness, and the page editor is fully responsive. iOS, Android, and tablet browsers all work. Draw mode on a touchscreen is typically the fastest way to sign.' },
      { q: 'Can I place multiple signatures on one PDF?', a: 'Yes. Place the same signature on every page, or use different signatures for co-signers. Click an existing stamp and use the floating toolbar to duplicate or delete. Each page can hold an unlimited number of signatures, dates, or text labels.' },
      { q: 'How do I add my initials to specific pages?', a: 'Switch to Type mode, enter just your initials (e.g. "JD"), choose a font, then click Signature on each page where initials are required. For frequent reuse, save a clean PNG of your initials and use Upload mode.' },
      { q: 'Does the signed PDF work in Adobe Acrobat and Preview?', a: 'Yes. The output is a standard flattened PDF that opens correctly in Adobe Acrobat, macOS Preview, Google Drive, Dropbox preview, email clients, and all modern PDF viewers. Signatures are embedded as images at the exact position you placed them.' },
      { q: 'Can I remove or edit the signature after downloading?', a: 'The downloaded PDF is flattened — signatures are baked in. That is intentional: it prevents recipients from tampering with the signed layout. To change a signature, re-open the original in ToolWools, edit, and re-download.' },
      { q: 'Are there any file-size limits?', a: 'The tool is tested with PDFs up to 100 MB. Very large documents (500+ pages) may take a few extra seconds to render on modest hardware, but every feature still works. There is no page-count cap.' },
      { q: 'Is this really free? What\'s the catch?', a: 'Genuinely free. ToolWools is supported by optional affiliate recommendations and non-intrusive display ads on tool pages. The PDF Signer has no trial expiration, no watermark, no signup, and no monthly signature quota. The entire feature set is available to every visitor, always.' },
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
    seoTitle: 'Free PDF Compressor — Reduce PDF Size Online | ToolWools',
    seoDescription:
      'Compress PDF files up to 70% smaller. Free online PDF compressor with multiple compression levels. No signup, drag & drop, works in your browser.',
    tags: ['pdf', 'compress', 'reduce size', 'optimize', 'document'],
    relatedTools: ['image-compressor', 'meta-tag-generator', 'json-formatter'],
    faqs: [
      { q: 'How much can I reduce my PDF file size?', a: 'Depending on the compression level you choose, you can reduce PDF sizes by 10-70%. High compression offers the most reduction while low compression preserves more quality.' },
      { q: 'Does PDF compression reduce quality?', a: 'Low and medium compression levels maintain excellent quality for most documents. High compression may reduce image quality within the PDF but text remains sharp and readable.' },
      { q: 'How many PDFs can I compress at once?', a: 'You can compress up to 5 PDF files simultaneously. Each file is processed independently and you can download them individually once compression is complete.' },
      { q: 'Are my PDF files uploaded to a server?', a: 'No. Currently, the compression preview runs entirely in your browser. Your files never leave your device. Full server-side compression for maximum reduction is coming soon.' },
      { q: 'What is the maximum file size supported?', a: 'The browser-based tool works best with PDFs under 50MB. For larger files, our upcoming server-side compression will handle files up to 500MB.' },
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
    seoTitle: 'Free Domain Authority Checker — DA, PA, Spam Score & Backlinks | ToolWools',
    seoDescription:
      'Check domain authority, page authority, and spam score for any website. Free DA checker with backlink analysis, referring domains, and SEO health score.',
    tags: ['seo', 'domain authority', 'backlinks', 'spam score', 'page authority', 'da checker'],
    relatedTools: ['meta-tag-generator', 'word-counter', 'image-compressor'],
    faqs: [
      { q: 'What is Domain Authority (DA)?', a: 'Domain Authority is a score from 0-100 developed by Moz that predicts how likely a website is to rank in search engine results. Higher scores indicate greater ranking potential.' },
      { q: 'What is a good Domain Authority score?', a: 'DA scores vary by niche, but generally: 60+ is excellent, 40-60 is good, 20-40 is average, and below 20 indicates a newer or less established site. Focus on improvement over time rather than absolute numbers.' },
      { q: 'What is Spam Score?', a: 'Spam Score indicates the percentage of sites with similar features that have been penalized or banned by search engines. A lower spam score (under 30%) is ideal. High scores suggest reviewing your backlink profile.' },
      { q: 'How often should I check my Domain Authority?', a: 'Domain Authority changes gradually. Checking monthly is sufficient for most sites. Focus on long-term trends rather than day-to-day fluctuations.' },
      { q: 'How can I improve my Domain Authority?', a: 'Improve DA by earning high-quality backlinks from authoritative sites, creating valuable content, fixing technical SEO issues, and removing toxic backlinks. It is a long-term metric that grows with consistent effort.' },
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

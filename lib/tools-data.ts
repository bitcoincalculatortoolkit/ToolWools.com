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
    description: 'Compress PDF files up to 80% smaller. Real image re-encoding with adjustable DPI and quality.',
    longDescription:
      'ToolWools\' free PDF Compressor genuinely reduces file size by re-rendering each page at your chosen DPI and JPEG quality level. Drag and drop up to 5 files, pick Low / Medium / High compression, fine-tune with advanced options, and download the smaller PDF — all privately in your browser. No signup, no upload, no limits.',
    heroSubheadline:
      'Compress any PDF up to 80% smaller — right in your browser. Real compression that re-encodes images at your chosen quality level. Multi-file support, privacy-first, no signup.',
    heroHighlights: ['Real image re-encoding', 'Up to 80% smaller', 'Multi-file batch'],
    seoTitle: 'Free PDF Compressor — Reduce PDF File Size Online | ToolWools',
    seoDescription:
      'Compress PDF files up to 80% smaller with real image re-encoding. Free online PDF compressor with adjustable DPI, JPEG quality, grayscale mode. No signup, no upload.',
    tags: ['pdf', 'compress', 'reduce size', 'optimize', 'document', 'pdf compressor', 'make pdf smaller'],
    relatedTools: ['sign-pdf', 'image-compressor', 'meta-tag-generator'],
    howToSteps: [
      { name: 'Upload your PDF files', text: 'Drag and drop up to 5 PDF files onto the upload zone or click to browse. There is no file-size limit — all processing happens locally in your browser.' },
      { name: 'Choose a compression level', text: 'Select Low (~20-40% reduction), Medium (~40-60%), or High (~60-80%). Open Advanced Options to fine-tune DPI, JPEG quality, grayscale, and metadata stripping.' },
      { name: 'Compress and watch the progress', text: 'Click Compress All and watch the real-time progress bar update page by page. Cancel any file mid-compression if needed.' },
      { name: 'Download the smaller PDF', text: 'Once complete, review the original size, compressed size, and savings percentage. Click Download on each file or use Download All for batch retrieval.' },
    ],
    faqs: [
      { q: 'How much can this tool reduce my PDF file size?', a: 'Depending on the content and compression level, reductions range from 20% (Low) to 80% (High). Image-heavy PDFs like scans and presentations see the largest savings. Text-only PDFs typically compress 20-40%.' },
      { q: 'Does PDF compression reduce quality?', a: 'Yes, there is a quality trade-off. Low compression (150 DPI, 85% JPEG quality) is nearly indistinguishable from the original. Medium is excellent for screen viewing and email. High compression is visible on close inspection but ideal for archiving and quick sharing.' },
      { q: 'How does the compression actually work?', a: 'Each page is rendered to an off-screen canvas at the selected DPI using Mozilla\'s open-source pdf.js library, exported as a JPEG at your chosen quality, then assembled into a new PDF with pdf-lib. This re-encoding approach genuinely reduces file size — it is not a simulation.' },
      { q: 'Are my PDF files uploaded to a server?', a: 'No. The entire compression engine runs in your browser using client-side JavaScript. Your files never leave your device. You can disconnect your internet after the page loads and the tool still works — that is the proof.' },
      { q: 'Will compressed PDFs still have searchable text?', a: 'Because pages are rasterized to images, the output PDF will not have selectable or searchable text. If you need copy-paste or Ctrl+F functionality, use Low compression and keep the original for reference. This trade-off is what makes dramatic file-size reduction possible.' },
      { q: 'What is the maximum file size supported?', a: 'There is no hard limit. The tool has been tested with PDFs up to 100 MB. Very large documents (500+ pages) will take longer to process since each page is rendered individually, but the progress bar keeps you informed throughout.' },
      { q: 'Can I adjust the compression settings beyond Low/Medium/High?', a: 'Yes. Open the Advanced Options panel to set a custom DPI (72–300), JPEG quality (0.10–1.00), enable grayscale conversion for extra savings, and toggle metadata stripping. This gives you full control over the quality-vs-size trade-off.' },
      { q: 'Is the PDF Compressor really 100% free?', a: 'Yes. No signup, no trial period, no watermarks, no file limits. ToolWools is supported by non-intrusive display ads and optional affiliate recommendations. The complete feature set — including batch compression and advanced options — is always available to everyone.' },
    ],
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Merge multiple PDF files into one document. Drag to reorder pages before combining.',
    longDescription:
      'ToolWools\' free Merge PDF tool combines multiple PDF files into a single document right in your browser. Upload up to 10 files, drag to reorder, preview page counts and thumbnails, then download the merged result instantly. No signup, no upload to any server — everything happens locally.',
    heroSubheadline:
      'Combine multiple PDF files into a single document in seconds. Drag to reorder, preview page counts, and download the merged result. 100% private — files never leave your browser.',
    heroHighlights: ['Drag to reorder', 'Up to 10 files', 'Preview thumbnails'],
    seoTitle: 'Free Merge PDF — Combine PDF Files Online | ToolWools',
    seoDescription:
      'Merge multiple PDF files into one document for free. Drag to reorder, preview thumbnails, download instantly. No signup, no upload, 100% browser-based.',
    tags: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge documents'],
    relatedTools: ['split-pdf', 'sign-pdf', 'pdf-compressor'],
    howToSteps: [
      { name: 'Upload your PDF files', text: 'Drag and drop up to 10 PDF files onto the upload zone or click to browse. Each file is previewed with a thumbnail of its first page.' },
      { name: 'Reorder files by dragging', text: 'Drag files up or down using the grip handle to set the order they appear in the final merged document.' },
      { name: 'Set output filename', text: 'Customize the output filename or keep the default "merged.pdf". Review the total page count across all files.' },
      { name: 'Merge and download', text: 'Click the Merge button and watch the progress bar. Once complete, the merged PDF downloads automatically to your device.' },
    ],
    faqs: [
      { q: 'How many PDFs can I merge at once?', a: 'You can merge up to 10 PDF files in a single operation. Each file can be any size — the tool processes everything locally in your browser with no upload limits.' },
      { q: 'Can I reorder the files before merging?', a: 'Yes. After uploading, drag files up or down using the grip handle on the left side of each item. The final merged PDF follows the order shown in the list from top to bottom.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The entire merge operation runs in your browser using pdf-lib, an open-source JavaScript library. Your files never leave your device. You can verify by disconnecting your internet — the tool still works.' },
      { q: 'Will the merged PDF preserve formatting and links?', a: 'Yes. The merge copies pages exactly as they are — all text, images, formatting, annotations, bookmarks, and hyperlinks are preserved in the output document.' },
      { q: 'Is there a file size limit?', a: 'There is no hard limit. The tool has been tested with PDFs up to 100 MB each. Very large documents may take longer to process depending on your device, but a progress bar keeps you informed throughout.' },
    ],
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Split PDF into separate files. Extract specific pages or split by page ranges.',
    longDescription:
      'ToolWools\' free Split PDF tool lets you extract specific pages from any PDF or split it into multiple smaller files. Select pages visually with thumbnail previews, define custom ranges like "1-3, 5, 7-10", or split every N pages into separate documents. All processing happens locally in your browser.',
    heroSubheadline:
      'Extract specific pages from any PDF or split it into multiple smaller files. Select pages visually, define custom ranges, or split every N pages. Free, private, instant.',
    heroHighlights: ['Visual page selection', 'Custom ranges', 'Split every N pages'],
    seoTitle: 'Free Split PDF — Extract Pages, Split by Range Online | ToolWools',
    seoDescription:
      'Split PDF files for free. Extract specific pages, split by custom ranges, or divide every N pages. Visual page selection, instant download. No signup needed.',
    tags: ['split pdf', 'extract pdf pages', 'pdf splitter', 'separate pdf', 'remove pdf pages'],
    relatedTools: ['merge-pdf', 'sign-pdf', 'pdf-compressor'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop a PDF onto the upload zone or click to browse. Every page renders as a visual thumbnail for easy selection.' },
      { name: 'Choose a split mode', text: 'Select Extract Pages to pick individual pages, Split by Range to type ranges like "1-3, 5, 7-10", or Split Every N to divide into equal chunks.' },
      { name: 'Select your pages', text: 'Click thumbnails to select pages (hold Shift for range selection), or type your custom page ranges. Use Select All, Deselect All, or Invert buttons for quick selection.' },
      { name: 'Split and download', text: 'Click the Split/Extract button. The resulting PDF(s) are generated instantly and ready to download individually.' },
    ],
    faqs: [
      { q: 'What split modes are available?', a: 'Three modes: Extract Pages lets you click to select specific pages visually. Split by Range lets you type custom ranges like "1-3, 5, 7-10". Split Every N pages divides the PDF into multiple equal-sized documents.' },
      { q: 'Can I select multiple non-consecutive pages?', a: 'Yes. In Extract Pages mode, click individual thumbnails to toggle selection. Hold Shift and click to select a range. Use the Invert Selection button to quickly flip your selection.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The entire split operation runs locally in your browser using pdf-lib. Your PDF never leaves your device — no server, no upload, complete privacy.' },
      { q: 'Does splitting preserve formatting?', a: 'Yes. Pages are copied exactly as they are from the original document. All text, images, formatting, annotations, and links are preserved in the output files.' },
      { q: 'Is there a page limit?', a: 'There is no hard page limit. The tool renders thumbnails for every page, so very large documents (500+ pages) may take a moment to render, but splitting itself is fast regardless of page count.' },
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
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Rotate PDF pages 90°, 180°, or 270°. Rotate individual pages or all pages at once.',
    longDescription:
      'ToolWools\' free Rotate PDF tool lets you rotate individual pages or all pages at once. Preview every page as a thumbnail, click to select pages, then apply 90° CW, 90° CCW, or 180° rotation. Visual preview shows the rotation before you download. Everything happens in your browser — no upload, no server.',
    heroSubheadline:
      'Rotate PDF pages in any direction — 90° clockwise, 90° counter-clockwise, or 180°. Select individual pages or rotate all at once. Visual preview with thumbnails, instant download.',
    heroHighlights: ['Rotate individual pages', 'Bulk rotate all', 'Visual preview'],
    seoTitle: 'Free Rotate PDF — Rotate Pages 90°, 180° Online | ToolWools',
    seoDescription:
      'Rotate PDF pages online for free. Rotate 90° CW, 90° CCW, or 180°. Select individual pages or rotate all at once. No signup, no upload, instant download.',
    tags: ['rotate pdf', 'pdf rotation', 'turn pdf pages', 'flip pdf', 'rotate pages', 'pdf page orientation'],
    relatedTools: ['split-pdf', 'merge-pdf', 'delete-pages'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop a PDF onto the upload zone or click to browse. Every page renders as a visual thumbnail.' },
      { name: 'Select pages to rotate', text: 'Click thumbnails to select individual pages, or use Select All to target every page. The selection is highlighted in blue.' },
      { name: 'Apply rotation', text: 'Use the per-page rotation buttons (CW/CCW), or use Rotate All / Rotate Selected to apply 90°, -90°, or 180° rotation in bulk.' },
      { name: 'Download rotated PDF', text: 'Click Apply & Download. The rotated PDF is generated instantly using pdf-lib and downloads to your device.' },
    ],
    faqs: [
      { q: 'Can I rotate just one page in a multi-page PDF?', a: 'Yes. Each page has individual rotation controls. Click the CW or CCW button on any page thumbnail to rotate just that page without affecting others.' },
      { q: 'What rotation angles are supported?', a: 'You can rotate pages 90° clockwise, 90° counter-clockwise, or 180°. Multiple rotations stack, so clicking 90° CW twice gives you 180°.' },
      { q: 'Does the rotation preview show the actual result?', a: 'Yes. The thumbnail rotates in real-time using CSS transforms so you can see exactly how each page will look before downloading.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The entire rotation operation runs in your browser using pdf-lib. Your PDF never leaves your device — no server, no upload, complete privacy.' },
      { q: 'Is there a page limit?', a: 'There is no hard page limit. The tool renders thumbnails for every page and applies rotation to any number of pages. Very large documents may take a moment to render thumbnails.' },
    ],
  },
  {
    slug: 'delete-pages',
    name: 'Delete PDF Pages',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Remove unwanted pages from any PDF. Click to mark pages for deletion, download the trimmed result.',
    longDescription:
      'ToolWools\' free Delete PDF Pages tool lets you visually select and remove unwanted pages from any PDF document. Upload your file, click pages to mark them for deletion (shown with a red X overlay), then download the trimmed PDF with only the pages you want to keep. All processing happens locally in your browser.',
    heroSubheadline:
      'Remove unwanted pages from any PDF in seconds. Visual page selector with thumbnails — click pages to mark for deletion, see a live counter of kept pages, download instantly.',
    heroHighlights: ['Visual page selector', 'Red X deletion markers', 'Keep counter'],
    seoTitle: 'Free Delete PDF Pages — Remove Pages from PDF Online | ToolWools',
    seoDescription:
      'Delete pages from PDF files online for free. Click to mark unwanted pages, download trimmed PDF. Visual thumbnails, no signup, no upload needed.',
    tags: ['delete pdf pages', 'remove pdf pages', 'pdf page remover', 'trim pdf', 'cut pdf pages'],
    relatedTools: ['split-pdf', 'rotate-pdf', 'merge-pdf'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop a PDF onto the upload zone or click to browse. Every page renders as a clickable thumbnail.' },
      { name: 'Mark pages for deletion', text: 'Click any page thumbnail to mark it for deletion — it shows a red X overlay and dims. Use Select All, Deselect All, or Invert for quick selection.' },
      { name: 'Review the keep counter', text: 'The counter shows "Keeping X of Y pages" so you always know what the final PDF will contain. At least one page must remain.' },
      { name: 'Delete and download', text: 'Click Delete Pages & Download. Pages are removed in reverse order to preserve indices, and the trimmed PDF downloads instantly.' },
    ],
    faqs: [
      { q: 'Can I delete multiple pages at once?', a: 'Yes. Click as many pages as you want to mark them for deletion. You can also use Select All to mark everything, then click back the pages you want to keep. The Invert button flips your selection.' },
      { q: 'Is there a minimum number of pages I must keep?', a: 'Yes. You must keep at least one page — a PDF cannot have zero pages. The tool prevents you from marking all pages for deletion.' },
      { q: 'Does deleting pages affect the remaining page formatting?', a: 'No. Pages are removed cleanly using pdf-lib. All remaining pages keep their original formatting, text, images, annotations, and links intact.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The entire operation runs locally in your browser. Your PDF never leaves your device — complete privacy guaranteed.' },
      { q: 'Can I undo the deletion after downloading?', a: 'The downloaded PDF only contains the kept pages — deletion is permanent in the output. Keep your original file if you might need those pages later.' },
    ],
  },
  {
    slug: 'watermark-pdf',
    name: 'Watermark PDF',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Add text or image watermarks to PDF pages. Customize font, color, opacity, position, and rotation.',
    longDescription:
      'ToolWools\' free Watermark PDF tool adds text or image watermarks to your PDF documents. Choose from text watermarks (custom text, font size, color, opacity, rotation) or image watermarks (PNG/JPG with scale and positioning). Live preview shows exactly how your watermark will look. Apply to all pages or specific pages only.',
    heroSubheadline:
      'Add professional watermarks to any PDF — text or image. Customize font size, color, opacity, rotation, and position. Live preview, apply to all or specific pages. Free, private, instant.',
    heroHighlights: ['Text & image watermarks', 'Live preview', 'Custom positioning'],
    seoTitle: 'Free Watermark PDF — Add Text or Image Watermarks Online | ToolWools',
    seoDescription:
      'Add watermarks to PDF files for free. Text or image watermarks with custom opacity, rotation, position. Live preview, no signup, works in your browser.',
    tags: ['watermark pdf', 'add watermark', 'pdf stamp', 'confidential pdf', 'draft watermark', 'pdf branding'],
    relatedTools: ['protect-pdf', 'sign-pdf', 'rotate-pdf'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop a PDF onto the upload zone or click to browse. The first page renders as a live preview.' },
      { name: 'Choose watermark type', text: 'Select Text to type custom watermark text (e.g. CONFIDENTIAL, DRAFT), or Image to upload a PNG/JPG logo or stamp.' },
      { name: 'Configure appearance', text: 'Adjust font size, color, opacity, rotation angle, and position. For image watermarks, set the scale percentage. Preview updates live.' },
      { name: 'Apply and download', text: 'Choose to apply to all pages or specific pages, then click Apply Watermark & Download. The watermarked PDF downloads instantly.' },
    ],
    faqs: [
      { q: 'What types of watermarks can I add?', a: 'Two types: Text watermarks let you type any text (CONFIDENTIAL, DRAFT, your company name) with customizable font size, color, opacity, and rotation. Image watermarks let you upload a PNG or JPG image as a watermark with adjustable scale and opacity.' },
      { q: 'Can I control where the watermark appears?', a: 'Yes. Choose from 5 positions: center, top-left, top-right, bottom-left, or bottom-right. For text watermarks, you can also control the rotation angle from -90° to 90°.' },
      { q: 'Can I watermark only specific pages?', a: 'Yes. Switch from "All Pages" to "Specific Pages" and enter page numbers separated by commas (e.g. 1-3, 5, 7-10). Only those pages will receive the watermark.' },
      { q: 'Are my files uploaded to a server?', a: 'No. All watermarking happens locally in your browser using pdf-lib. Your documents and watermark images never leave your device.' },
      { q: 'Can I remove a watermark after downloading?', a: 'The watermark is embedded directly into the PDF. To get the original without watermark, keep your source file. This tool is designed to permanently stamp documents.' },
    ],
  },
  {
    slug: 'protect-pdf',
    name: 'Password Protect PDF',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Encrypt PDFs with a password or remove existing password protection. Set document permissions.',
    longDescription:
      'ToolWools\' free Password Protect PDF tool lets you encrypt PDFs with a user password and owner password, controlling permissions like printing, copying, and modifying. You can also remove existing password protection by entering the current password. Everything runs locally in your browser.',
    heroSubheadline:
      'Encrypt PDFs with a password or unlock password-protected PDFs. Set granular permissions for printing, copying, modifying, and annotating. Two modes: protect or unlock. Free, private, instant.',
    heroHighlights: ['Encrypt & decrypt', 'Granular permissions', 'User & owner passwords'],
    seoTitle: 'Free Password Protect PDF — Encrypt or Unlock PDF Online | ToolWools',
    seoDescription:
      'Password protect PDF files for free or remove existing passwords. Set permissions for printing, copying, modifying. No signup, works in your browser.',
    tags: ['protect pdf', 'password pdf', 'encrypt pdf', 'lock pdf', 'unlock pdf', 'remove pdf password', 'pdf security'],
    relatedTools: ['watermark-pdf', 'sign-pdf', 'merge-pdf'],
    howToSteps: [
      { name: 'Upload your PDF', text: 'Drag and drop a PDF onto the upload zone or click to browse. The file is loaded locally — never uploaded to any server.' },
      { name: 'Choose encrypt or decrypt mode', text: 'Select Encrypt to add password protection, or Remove Password to unlock an existing protected PDF.' },
      { name: 'Configure passwords and permissions', text: 'For encryption: set a user password (required to open) and optionally an owner password. Choose which actions to allow: printing, copying, modifying, annotating.' },
      { name: 'Process and download', text: 'Click the action button. For encryption, download the protected PDF. For decryption, enter the current password and download the unlocked version.' },
    ],
    faqs: [
      { q: 'What is the difference between user password and owner password?', a: 'The user password is required to open the PDF. The owner password controls permissions — with it, someone can change print/copy/modify settings. If you only set a user password, it doubles as the owner password.' },
      { q: 'Can I control what people do with the protected PDF?', a: 'Yes. You can toggle permissions for printing, copying text, modifying content, and adding annotations. These restrictions are enforced by PDF viewers that respect the owner password permissions.' },
      { q: 'Can I remove a password from a protected PDF?', a: 'Yes. Switch to Remove Password mode, enter the current password, and the tool saves a new copy without any encryption. You must know the password — the tool cannot crack unknown passwords.' },
      { q: 'Are my files and passwords uploaded to a server?', a: 'No. Everything runs locally in your browser using pdf-lib. Your files and passwords never leave your device. This is the safest way to encrypt sensitive documents.' },
      { q: 'What encryption standard is used?', a: 'pdf-lib uses AES-128 encryption, which is the standard encryption for PDF documents. It is supported by all modern PDF readers including Adobe Acrobat, Preview, and Chrome\'s built-in viewer.' },
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

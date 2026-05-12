import Link from 'next/link';

export default function ReducePdfArticle() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-dark leading-tight mb-4">
        How to Reduce PDF File Size: 5 Methods That Actually Work
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-8 pb-6 border-b border-border">
        <span>May 1, 2026</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span>5 min read</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          PDF
        </span>
      </div>

      {/* TL;DR */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
        <p className="text-sm font-semibold text-dark mb-1">Quick Summary</p>
        <p className="text-sm text-body leading-relaxed">
          Large PDF files create email bounce-backs, slow downloads, and eat up storage. The five
          most effective ways to reduce PDF size are: compressing embedded images, removing unused
          fonts, flattening form fields, removing metadata, and using dedicated compression tools
          like the{' '}
          <Link href="/tools/pdf-tools/pdf-compressor" className="text-primary font-medium hover:underline">
            ToolWools PDF Compressor
          </Link>. Most PDFs can be reduced by 40-70% without visible quality loss.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Why PDF Files Get So Large
        </h2>
        <p className="text-body leading-relaxed mb-4">
          PDFs become bloated for several reasons. High-resolution images embedded at print quality
          (300 DPI) are the biggest culprit — a single uncompressed photo can add 5-10MB to a
          document. Multiple embedded fonts, especially full font families, add significant weight.
          Layer information, form fields, annotations, and document metadata all contribute too.
        </p>
        <p className="text-body leading-relaxed">
          Understanding what makes your PDF large helps you choose the right compression strategy.
          A photo-heavy presentation needs image compression. A text-heavy contract benefits from
          font subsetting. Below are five methods that cover all common scenarios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Method 1: Compress Embedded Images
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Images inside PDFs are often stored at their original resolution — far higher than needed
          for on-screen viewing or even standard printing. Recompressing these images to 150 DPI
          (sufficient for most screens and printers) can reduce file size by 50-70%.
        </p>
        <p className="text-body leading-relaxed mb-4">
          Before embedding images in a PDF, compress them individually using an{' '}
          <Link href="/tools/image-tools/image-compressor" className="text-primary font-medium hover:underline">
            Image Compressor
          </Link>. Reduce JPGs to 75-80% quality and resize to the actual dimensions needed in the
          document. This proactive approach prevents bloated PDFs from being created in the first place.
        </p>
        <p className="text-body leading-relaxed">
          For existing PDFs with large images, use the{' '}
          <Link href="/tools/pdf-tools/pdf-compressor" className="text-primary font-medium hover:underline">
            PDF Compressor
          </Link>{' '}
          to batch-downsize embedded images without manually extracting and re-inserting them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Method 2: Remove Unused Fonts and Subset Remaining Fonts
        </h2>
        <p className="text-body leading-relaxed mb-4">
          PDFs often embed entire font files even when only a few characters are used. A full font
          file can be 200-500KB. Font subsetting removes unused glyphs, keeping only the characters
          that actually appear in the document. This can reduce font data from 500KB to under 50KB.
        </p>
        <p className="text-body leading-relaxed">
          When creating PDFs from design tools (InDesign, Illustrator, Figma), always enable font
          subsetting in export options. For existing PDFs, compression tools can strip and re-embed
          subsetted fonts automatically.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Method 3: Flatten Form Fields and Annotations
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Interactive form fields, comments, markup layers, and annotations all add hidden weight to
          PDFs. Once a form has been filled out or annotations are finalized, flattening them converts
          interactive elements to static content, typically saving 10-30% file size.
        </p>
        <p className="text-body leading-relaxed">
          This is especially impactful for documents that have gone through multiple rounds of review
          with tracked changes. Flattening removes the revision history while keeping the final
          content intact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Method 4: Remove Hidden Metadata and Layers
        </h2>
        <p className="text-body leading-relaxed mb-4">
          PDFs can contain surprising amounts of hidden data: document properties, creation software
          information, edit history, hidden layers, embedded thumbnails, and attached files. Stripping
          this metadata reduces file size and also improves privacy — you may not want recipients to
          see your editing software, creation dates, or author information.
        </p>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li>Remove XMP metadata (author, creation date, software used)</li>
          <li>Delete embedded thumbnails (modern PDF readers generate their own)</li>
          <li>Flatten or remove hidden layers from design exports</li>
          <li>Remove file attachments if they are not needed</li>
          <li>Clear document-level JavaScript (security risk anyway)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Method 5: Use a Dedicated PDF Compression Tool
        </h2>
        <p className="text-body leading-relaxed mb-4">
          The fastest and most reliable approach is using a dedicated compression tool that applies
          all the above techniques automatically. The{' '}
          <Link href="/tools/pdf-tools/pdf-compressor" className="text-primary font-medium hover:underline">
            ToolWools PDF Compressor
          </Link>{' '}
          offers multiple compression levels:
        </p>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li><strong>Low compression (10-25% reduction):</strong> Maximum quality preservation. Best for documents going to print.</li>
          <li><strong>Medium compression (25-50% reduction):</strong> Excellent balance of quality and size. Good for email attachments and web uploads.</li>
          <li><strong>High compression (50-70% reduction):</strong> Maximum size reduction. Best for archival and web-only documents where file size matters most.</li>
        </ul>
        <p className="text-body leading-relaxed">
          The key advantage of browser-based tools is privacy — your PDFs are processed locally and
          never uploaded to a server. This is critical for sensitive documents like contracts,
          financial statements, or medical records.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          When to Use Each Method
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Choose your approach based on the document type and your quality requirements:
        </p>
        <ul className="space-y-3 text-body mb-4 ml-2">
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">Photo-heavy PDFs:</span>
            <span>Image compression yields the biggest gains. Use Method 1 + Method 5.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">Text documents:</span>
            <span>Font subsetting and metadata removal are most effective. Use Methods 2 + 4.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">Reviewed/signed docs:</span>
            <span>Flatten annotations and forms. Use Method 3 + Method 5.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">Email attachments:</span>
            <span>Apply all methods for maximum reduction. Most email providers limit attachments to 25MB.</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Best Practices for Smaller PDFs from the Start
        </h2>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li>Compress images before embedding them in documents</li>
          <li>Use vector graphics (SVG) instead of raster images where possible</li>
          <li>Enable font subsetting when exporting from design tools</li>
          <li>Export at &ldquo;Smallest File Size&rdquo; preset when print quality is not needed</li>
          <li>Avoid copy-pasting from PowerPoint (embeds unnecessary formatting data)</li>
          <li>Use the{' '}
            <Link href="/tools/text-tools/word-counter" className="text-primary font-medium hover:underline">
              Word Counter
            </Link>{' '}
            to keep content concise — shorter documents mean smaller PDFs
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mt-10">
        <h3 className="text-lg font-display text-dark mb-2">
          Compress Your PDFs Right Now
        </h3>
        <p className="text-sm text-body mb-4">
          Drop your PDF into our free compressor and choose your compression level. No signup, no
          file uploads to servers, works entirely in your browser for complete privacy.
        </p>
        <Link
          href="/tools/pdf-tools/pdf-compressor"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-btn hover:bg-purple-700 transition-colors"
        >
          Compress PDF Free &rarr;
        </Link>
      </div>
    </>
  );
}

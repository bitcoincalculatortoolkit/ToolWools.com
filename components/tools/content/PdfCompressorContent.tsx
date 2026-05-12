import Link from 'next/link';
import {
  AlertTriangle,
  FileDown,
  Gauge,
  Globe,
  Image as ImageIcon,
  Lightbulb,
  Lock,
  Zap,
} from 'lucide-react';

/**
 * Long-form SEO content for the PDF Compressor tool page.
 * ~900 words. Targets:
 *   - "compress PDF online free"
 *   - "reduce PDF file size"
 *   - "PDF compressor"
 *   - "make PDF smaller"
 *
 * Structured with H2s matching People-Also-Ask queries
 * for featured-snippet + AI-search ranking (Perplexity, ChatGPT, Google AI).
 */
export function PdfCompressorContent() {
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
      {/* ─────────── Main article ─────────── */}
      <article className="seo-prose min-w-0">
        {/* 1. What is PDF compression */}
        <section aria-labelledby="what-is">
          <h2 id="what-is" className="heading-lg text-[26px] md:text-[30px] text-dark">
            What is PDF compression and why it matters
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            PDF compression reduces the file size of a PDF document while
            retaining as much visual quality as possible. Large PDFs are a
            daily headache — email providers cap attachments at 25 MB, upload
            forms timeout on big files, cloud storage fills up faster, and
            mobile users wait forever for heavy downloads.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Whether you&apos;re sending a scanned contract, a slide deck with
            embedded photos, or a design portfolio, a good PDF compressor can
            shrink your file by <strong className="text-dark">40–80%</strong> — turning
            a 12 MB attachment into a 3 MB one that slides through every inbox
            and portal without complaint.
          </p>
        </section>

        {/* 2. How it works */}
        <section aria-labelledby="how-it-works" className="mt-10">
          <h2 id="how-it-works" className="heading-lg text-[26px] md:text-[30px] text-dark">
            How our PDF compressor actually reduces file size
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Unlike server-based tools that upload your file to a remote
            machine, ToolWools compresses PDFs entirely inside your browser.
            Here is what happens under the hood:
          </p>
          <ol className="mt-5 space-y-3 not-prose">
            <li className="flex gap-3 text-[14.5px] leading-[1.7] text-body">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-white text-[12px] font-bold">
                1
              </span>
              <span>
                Each page of your PDF is rendered to an off-screen canvas at
                the DPI you selected (lower DPI = smaller output).
              </span>
            </li>
            <li className="flex gap-3 text-[14.5px] leading-[1.7] text-body">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-white text-[12px] font-bold">
                2
              </span>
              <span>
                The canvas image is exported as a <strong className="text-dark">JPEG</strong> at
                the chosen quality level — lower quality means more compression.
              </span>
            </li>
            <li className="flex gap-3 text-[14.5px] leading-[1.7] text-body">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-white text-[12px] font-bold">
                3
              </span>
              <span>
                A brand-new PDF is assembled with one JPEG per page, using the
                open-source <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">pdf-lib</code> library.
                The result strips out duplicated fonts, unused objects, and uncompressed streams.
              </span>
            </li>
            <li className="flex gap-3 text-[14.5px] leading-[1.7] text-body">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-white text-[12px] font-bold">
                4
              </span>
              <span>
                You download the new, smaller PDF. The original file is never
                modified and never leaves your device.
              </span>
            </li>
          </ol>
          <p className="mt-5 text-[15px] leading-[1.7] text-body">
            This &ldquo;re-render and re-encode&rdquo; approach works
            especially well for <strong className="text-dark">image-heavy PDFs</strong> (scans,
            photos, presentations) because those embedded images are
            re-compressed at a lower bitrate. Text-only PDFs see less
            dramatic savings.
          </p>
        </section>

        {/* 3. Compression levels guide */}
        <section aria-labelledby="levels" className="mt-10">
          <h2 id="levels" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Low vs Medium vs High compression — which to choose
          </h2>
          <div className="mt-5 space-y-3 not-prose">
            <LevelCard
              icon={Gauge}
              level="Low"
              reduction="~20-40%"
              desc="150 DPI, 85% JPEG quality. Preserves most visual detail. Best for PDFs you'll print or where readability of fine text matters."
              useCase="Contracts, reports, brochures for print"
            />
            <LevelCard
              icon={Zap}
              level="Medium"
              reduction="~40-60%"
              desc="120 DPI, 65% JPEG quality. The sweet spot between size and quality. Perfect for email attachments and online sharing."
              useCase="Email attachments, slide decks, portfolios"
            />
            <LevelCard
              icon={FileDown}
              level="High"
              reduction="~60-80%"
              desc="96 DPI, 45% JPEG quality. Maximum compression. Some visible quality loss on close inspection but great for archiving or quick sharing."
              useCase="Archiving, quick previews, form submissions"
            />
          </div>
          <p className="mt-5 text-[14.5px] leading-[1.7] text-body">
            Use the Advanced Options panel to fine-tune DPI and JPEG quality
            beyond the presets. Enable grayscale for additional savings on
            documents where color is not essential.
          </p>
        </section>

        {/* 4. Step by step */}
        <section aria-labelledby="how-to" className="mt-10">
          <h2 id="how-to" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Step-by-step: how to compress a PDF
          </h2>
          <ol className="mt-5 space-y-4 not-prose">
            <Step num={1} title="Upload your PDF files">
              Drag and drop up to 5 PDF files onto the upload zone, or click
              to browse your device. There is no file-size limit — the tool
              processes everything locally.
            </Step>
            <Step num={2} title="Choose a compression level">
              Select Low, Medium, or High. Or open Advanced Options to dial in
              a custom DPI and JPEG quality. Enable grayscale or metadata
              stripping for extra savings.
            </Step>
            <Step num={3} title="Compress and watch the progress">
              Click &ldquo;Compress All&rdquo; and watch the real-time
              progress bar update page by page. You can cancel any file
              mid-compression if needed.
            </Step>
            <Step num={4} title="Download the smaller PDF">
              Once done, the file list shows the original size, new size, and
              percentage saved. Click Download on each file, or use
              &ldquo;Download All&rdquo; to grab everything at once.
            </Step>
          </ol>
        </section>

        {/* 5. Honest limitations */}
        <section aria-labelledby="limitations" className="mt-10">
          <h2 id="limitations" className="heading-lg text-[26px] md:text-[30px] text-dark">
            When NOT to use high compression
          </h2>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/50 p-5 not-prose">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-3 text-[14.5px] leading-[1.65] text-body">
                <p>
                  <strong className="text-dark">Text-heavy documents:</strong> Because each
                  page is rasterized to an image, selectable/searchable text
                  becomes a flat picture. If you need copy-paste or Ctrl+F
                  functionality in the output, use Low compression or keep the
                  original.
                </p>
                <p>
                  <strong className="text-dark">Vector graphics and diagrams:</strong> Charts,
                  CAD drawings, and vector illustrations will be rasterized at
                  the chosen DPI. At 96 DPI (High), fine lines may appear
                  slightly blurry. Use 150+ DPI for technical diagrams.
                </p>
                <p>
                  <strong className="text-dark">Archival documents:</strong> If long-term
                  fidelity matters (legal filings, signed contracts), keep the
                  original alongside the compressed version for reference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Privacy */}
        <section aria-labelledby="privacy" className="mt-10">
          <h2 id="privacy" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Privacy-first: your files stay on your device
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Most online PDF compressors upload your document to their cloud,
            process it on remote servers, and may retain copies for
            &ldquo;service improvement.&rdquo; If your PDF contains financial
            data, health records, client contracts, or personal information,
            that is a real exposure risk.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            ToolWools is built differently. The compression engine runs 100%
            in your browser using open-source libraries (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">pdfjs-dist</code> for
            rendering and{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">pdf-lib</code> for
            assembly). No bytes leave your machine. Disconnect your internet
            after the page loads and everything still works — that is the
            proof.
          </p>
        </section>

        {/* 7. Related tools */}
        <section aria-labelledby="related" className="mt-10">
          <h2 id="related" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Pair with other ToolWools PDF tools
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The PDF Compressor is part of our growing privacy-first PDF
            toolkit. Combine it with:
          </p>
          <div className="mt-5 flex flex-wrap gap-3 not-prose">
            <Link
              href="/tools/pdf-tools/sign-pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-dark px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-dark/90 transition-colors"
            >
              PDF Signer
            </Link>
            <Link
              href="/tools/image-tools/image-compressor"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-border px-4 py-2.5 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors"
            >
              Image Compressor
            </Link>
            <Link
              href="/tools/text-tools/word-counter"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-border px-4 py-2.5 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors"
            >
              Word Counter
            </Link>
          </div>
          <p className="mt-4 text-[14.5px] leading-[1.7] text-body">
            Compress a PDF after signing to shrink the output, or use the
            Image Compressor for standalone JPG/PNG/WEBP files. All tools are
            100% free, require no signup, and never upload your files.
          </p>
        </section>
      </article>

      {/* ─────────── Sticky TOC sidebar ─────────── */}
      <aside className="hidden lg:block">
        <nav
          aria-label="Article contents"
          className="sticky top-6 rounded-xl border border-border/60 bg-white p-5 shadow-card"
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
            On this page
          </p>
          <ul className="mt-3 space-y-2 text-[13px]">
            {[
              ['what-is', 'What is PDF compression'],
              ['how-it-works', 'How it reduces file size'],
              ['levels', 'Low vs Medium vs High'],
              ['how-to', 'Step-by-step guide'],
              ['limitations', 'When NOT to use high'],
              ['privacy', 'Privacy-first design'],
              ['related', 'Related PDF tools'],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block rounded-md px-2 py-1.5 text-body hover:text-primary hover:bg-primary-bg/50 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

/* ───── Presentational helpers ───── */
function LevelCard({
  icon: Icon,
  level,
  reduction,
  desc,
  useCase,
}: {
  icon: typeof Gauge;
  level: string;
  reduction: string;
  desc: string;
  useCase: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-white p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-bg shadow-sm">
          <Icon size={15} className="text-primary" strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-[14px] font-bold text-dark">
            {level}{' '}
            <span className="text-[12px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded ml-1">
              {reduction}
            </span>
          </h3>
        </div>
      </div>
      <p className="mt-2 text-[13px] text-muted leading-[1.6]">{desc}</p>
      <p className="mt-1.5 text-[12px] text-body">
        <strong className="text-dark">Best for:</strong> {useCase}
      </p>
    </div>
  );
}

function Step({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-primary text-white text-[13px] font-bold shadow-sm">
        {num}
      </span>
      <div className="pt-0.5">
        <p className="text-[15px] font-bold text-dark">{title}</p>
        <p className="mt-1 text-[14.5px] leading-[1.7] text-body">{children}</p>
      </div>
    </li>
  );
}

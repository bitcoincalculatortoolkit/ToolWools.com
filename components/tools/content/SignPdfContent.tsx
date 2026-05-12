import Link from 'next/link';
import {
  CheckCircle2,
  FileSignature,
  Fingerprint,
  Globe,
  Lightbulb,
  Lock,
  PenLine,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
} from 'lucide-react';

/**
 * Long-form SEO content for the PDF Signer tool page.
 * ~1,200 words. Targets:
 *   - "sign PDF online free"
 *   - "electronic signature PDF"
 *   - "eSign PDF no signup"
 *   - "add signature to PDF"
 *   - "draw signature on PDF"
 *
 * Structured with H2s that map to People-Also-Ask queries for
 * featured-snippet + AI-search ranking.
 */
export function SignPdfContent() {
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
      <article className="seo-prose min-w-0">
        {/* Intro */}
        <section aria-labelledby="intro">
          <h2 id="intro" className="heading-lg text-[26px] md:text-[30px] text-dark">
            What is a PDF signer, and why sign in the browser
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            A PDF signer lets you add a legally-recognized{' '}
            <strong className="text-dark">electronic signature</strong> — also called an
            eSignature — to a PDF document without printing, scanning, or
            mailing it back. ToolWools&apos; free PDF Signer goes one step further:{' '}
            <strong className="text-dark">every byte of your document stays on your device</strong>. The
            signing, the preview, the final save — all of it runs inside your
            browser. No account, no cloud upload, no paid tier.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            If you&apos;ve been asked to &ldquo;sign and return&rdquo; a contract,
            NDA, offer letter, invoice, or waiver, this is the fastest honest
            way to do it. The tool gives you three ways to create your
            signature — <em>draw</em>, <em>type</em>, or <em>upload</em> — then drag
            it anywhere on any page. Add a date stamp, your initials, or a
            custom text label like &ldquo;Approved&rdquo; and download the final,
            flattened PDF. The whole flow takes about 30 seconds.
          </p>
        </section>

        {/* Features */}
        <section aria-labelledby="features" className="mt-10">
          <h2 id="features" className="heading-lg text-[26px] md:text-[30px] text-dark">
            What the PDF Signer can do
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            This is a full-featured electronic signature tool — the same
            features the big cloud platforms charge $10-$30 a month for,
            delivered privately and free.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <FeatureRow
              icon={PenLine}
              title="Draw your signature"
              desc="A high-resolution pressure-aware signature pad. Works with mouse, trackpad, and touch — perfect for tablets and phones."
            />
            <FeatureRow
              icon={FileSignature}
              title="Type it in a handwriting font"
              desc="Pick from four handwriting styles — Signature Script, Handwritten, Formal Italic, Modern Sans — then choose any color."
            />
            <FeatureRow
              icon={Sparkles}
              title="Upload a signature image"
              desc="Already have a transparent-PNG signature? Drop it in. The tool treats it like any other signature stamp."
            />
            <FeatureRow
              icon={Fingerprint}
              title="Multi-page, multi-signature"
              desc="Drag one signature onto every page, or place different signatures / initials per signer. Duplicate with one click."
            />
            <FeatureRow
              icon={Timer}
              title="Automatic date stamp"
              desc="Tap Date stamp to insert today's date in legible type. Click it again to change format or move it."
            />
            <FeatureRow
              icon={Lock}
              title="Flat PDF on download"
              desc="The output is a standard, flat PDF that opens correctly in Acrobat, Preview, Google Drive, and every email client."
            />
          </div>
        </section>

        {/* How to */}
        <section aria-labelledby="how-to-use" className="mt-10">
          <h2 id="how-to-use" className="heading-lg text-[26px] md:text-[30px] text-dark">
            How to sign a PDF online — step by step
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The whole workflow is designed to feel effortless. Here is exactly
            what you&apos;ll do:
          </p>
          <ol className="mt-5 space-y-4 not-prose">
            <Step num={1} title="Upload your PDF">
              Drop the file onto the upload zone or click to browse. The tool
              renders every page as a high-resolution preview — no matter how many
              pages, no size limit up to 100 MB.
            </Step>
            <Step num={2} title="Create your signature">
              Choose <strong>Draw</strong> to write it with your mouse or finger,{' '}
              <strong>Type</strong> to convert your name to a handwriting font, or{' '}
              <strong>Upload</strong> to use an existing signature image.
            </Step>
            <Step num={3} title="Place it on the page">
              Click <em>Signature</em> in the side panel and a placement
              appears on the current page. Drag it to the exact spot. Resize
              with the corner handle. Duplicate or delete from the floating
              toolbar.
            </Step>
            <Step num={4} title="Add date and labels (optional)">
              Tap <em>Date stamp</em> to insert today&apos;s date, or{' '}
              <em>Text label</em> for anything else — &ldquo;Approved&rdquo;,
              your title, a reference number.
            </Step>
            <Step num={5} title="Download the signed PDF">
              Rename the file if you like, then click the download button. Your
              signed PDF is flattened, locked, and saved to your device — ready
              to email back.
            </Step>
          </ol>
        </section>

        {/* Legal validity */}
        <section aria-labelledby="legal" className="mt-10">
          <h2 id="legal" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Are electronic signatures legally binding?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            In most countries, yes. The{' '}
            <strong className="text-dark">US ESIGN Act (2000)</strong> and the{' '}
            <strong className="text-dark">EU eIDAS Regulation (2016)</strong> both
            recognize electronic signatures as legally valid for most
            contracts, provided three conditions are met:
          </p>
          <ul className="mt-4 space-y-2 not-prose">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-green mt-0.5 flex-shrink-0" />
              <span className="text-[15px] leading-[1.6] text-body">
                <strong className="text-dark">Intent to sign</strong> — the signer clearly
                means to adopt the signature as their own.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-green mt-0.5 flex-shrink-0" />
              <span className="text-[15px] leading-[1.6] text-body">
                <strong className="text-dark">Association with the document</strong> — the
                signature is attached to the specific PDF being signed.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-green mt-0.5 flex-shrink-0" />
              <span className="text-[15px] leading-[1.6] text-body">
                <strong className="text-dark">Consent to electronic business</strong> — both
                parties agree the transaction is happening electronically.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-[16px] leading-[1.75] text-body">
            The signatures produced by ToolWools satisfy all three conditions
            for ordinary business use (contracts, NDAs, invoices, authorization
            forms, waivers). A handful of document classes — wills, adoption
            papers, property deeds in some jurisdictions — still require ink
            signatures or notarized digital certificates. When in doubt,
            confirm with a local attorney.
          </p>
        </section>

        {/* Privacy */}
        <section aria-labelledby="privacy" className="mt-10">
          <h2 id="privacy" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Privacy: the files never leave your browser
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Most free online PDF signers are loss-leaders for paid cloud
            services. They upload your document to their servers, process it
            there, and often retain the file for &ldquo;improving the
            service&rdquo;. If the document contains SSN, banking details,
            health info, salary data, client PII, or trade secrets, that is a
            real data-exposure risk.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            ToolWools&apos; PDF Signer is engineered differently. The PDF is
            loaded into memory by your browser, rendered locally with Mozilla&apos;s
            open-source <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">pdf.js</code>,
            and modified with the equally open{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">pdf-lib</code>. No
            part of it is transmitted. You can disconnect your internet after
            the page loads and every feature still works — definitive proof of
            local-only processing.
          </p>
        </section>

        {/* Use cases */}
        <section aria-labelledby="use-cases" className="mt-10">
          <h2 id="use-cases" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Who signs PDFs — and when this tool fits
          </h2>
          <div className="mt-5 space-y-3 not-prose">
            <UseCase
              icon={Users}
              label="Freelancers and agencies"
              body={
                <>
                  Client agreements, NDAs, statements of work, invoices.
                  Drop the PDF, sign it, send it back — one tab, no logins.
                </>
              }
            />
            <UseCase
              icon={Globe}
              label="Remote teams"
              body={
                <>
                  Internal approvals, HR documents, expense reports. Sign and
                  forward without waiting for an admin to provision a DocuSign
                  seat.
                </>
              }
            />
            <UseCase
              icon={ShieldCheck}
              label="Privacy-sensitive industries"
              body={
                <>
                  Legal, healthcare, finance — anywhere the document should never
                  touch a third-party server. Processing stays on the device.
                </>
              }
            />
            <UseCase
              icon={FileSignature}
              label="Students and individuals"
              body={
                <>
                  Lease agreements, financial-aid forms, permission slips,
                  offer letters. No signup barrier between you and a signed document.
                </>
              }
            />
          </div>
        </section>

        {/* Tips */}
        <section aria-labelledby="tips" className="mt-10">
          <h2 id="tips" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Pro tips for better PDF signatures
          </h2>
          <ul className="mt-5 space-y-3 not-prose">
            <Tip>
              <strong className="text-dark">Use Draw for legal documents.</strong> Hand-drawn
              signatures are the most recognizable and carry the strongest
              legal weight in most jurisdictions.
            </Tip>
            <Tip>
              <strong className="text-dark">Use Type for bulk approvals.</strong> When signing
              several documents in a row, a typed signature is faster and
              visually consistent.
            </Tip>
            <Tip>
              <strong className="text-dark">Resize before you place.</strong> Most
              signature fields are 150-200 pt wide. The resize handle lets you
              match that width exactly.
            </Tip>
            <Tip>
              <strong className="text-dark">Always add a date stamp.</strong> Even when the
              form has its own date field, a visible signed-on date
              strengthens the record.
            </Tip>
            <Tip>
              <strong className="text-dark">Save a clean signature PNG.</strong> Draw your
              signature once, screenshot it, and reuse it via Upload for a
              pixel-perfect consistent look across documents.
            </Tip>
          </ul>
        </section>

        {/* Related tools */}
        <section aria-labelledby="related" className="mt-10">
          <h2 id="related" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Pair with other ToolWools PDF utilities
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The PDF Signer is the first tool in our privacy-first PDF suite.
            Use it with:
          </p>
          <div className="mt-5 flex flex-wrap gap-3 not-prose">
            <Link
              href="/tools/pdf-tools/pdf-compressor"
              className="inline-flex items-center gap-1.5 rounded-lg bg-dark px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-dark/90 transition-colors"
            >
              PDF Compressor
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
        </section>

        {/* Conclusion */}
        <section aria-labelledby="conclusion" className="mt-10">
          <h2 id="conclusion" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Sign with confidence — free, private, legally valid
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The ToolWools PDF Signer gives you the signing experience of
            premium tools — Draw, Type, Upload, multi-page, flat-PDF output —
            without ever handing your document to a third party. No trial
            expiration, no watermark, no &ldquo;3 signatures remaining this
            month&rdquo; nonsense. Bookmark this page for the next contract
            that lands in your inbox.
          </p>
        </section>
      </article>

      {/* Sticky TOC */}
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
              ['intro', 'Why sign in the browser'],
              ['features', 'What the signer can do'],
              ['how-to-use', 'How to sign a PDF'],
              ['legal', 'Legal validity'],
              ['privacy', 'Privacy by design'],
              ['use-cases', 'Who uses it'],
              ['tips', 'Pro tips'],
              ['related', 'Related tools'],
              ['conclusion', 'Sign with confidence'],
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
function FeatureRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof FileSignature;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-gray-50/40 p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white shadow-sm">
          <Icon size={15} className="text-primary" strokeWidth={2} />
        </span>
        <h3 className="text-[14px] font-bold text-dark">{title}</h3>
      </div>
      <p className="mt-2 text-[13px] text-muted leading-[1.6]">{desc}</p>
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

function UseCase({
  icon: Icon,
  label,
  body,
}: {
  icon: typeof Users;
  label: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-blue" strokeWidth={2} />
        <p className="text-[14px] font-bold text-dark">{label}</p>
      </div>
      <p className="mt-1.5 text-[14px] leading-[1.65] text-body">{body}</p>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl border border-border/50 bg-amber-50/40 p-4">
      <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
      <p className="text-[14.5px] leading-[1.65] text-body">{children}</p>
    </li>
  );
}

import Link from 'next/link';
import {
  BookOpen,
  Code2,
  FileText,
  Gauge,
  Lightbulb,
  List,
  Search,
  Share2,
  Target,
  Users,
  Zap,
} from 'lucide-react';

/**
 * Long-form SEO content for the Word Counter tool page.
 * ~1,100 words, optimized for "word counter", "character counter",
 * "reading time calculator", and "keyword density checker" searches.
 * Structured with H2s that answer direct user intent for featured snippets.
 */
export function WordCounterContent() {
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
      {/* ─────────── Main article ─────────── */}
      <article className="seo-prose min-w-0">
        {/* Intro */}
        <section aria-labelledby="intro">
          <h2 id="intro" className="heading-lg text-[26px] md:text-[30px] text-dark">
            What is a word counter, and why accuracy matters
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            A word counter is a text-analysis tool that measures the length and
            structure of your writing in real time. ToolWools&apos; free online Word
            Counter goes beyond a raw word tally — it calculates{' '}
            <strong className="text-dark">characters, sentences, paragraphs, syllables, reading time, speaking time,
            readability, and keyword density</strong> in a single, privacy-first
            interface. Nothing you paste ever leaves your browser.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Writers, students, marketers, and SEO teams all rely on word counters
            to hit platform limits and quality benchmarks. A{' '}
            <em>280-character tweet</em>, a <em>60-character SEO title</em>, a{' '}
            <em>500-word college essay</em>, or a <em>1,500-word pillar article</em> — every
            piece of content has a target. A good word counter tells you exactly
            where you stand against that target and what to trim or expand to get
            there.
          </p>
        </section>

        {/* Core features */}
        <section aria-labelledby="features" className="mt-10">
          <h2 id="features" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Every metric our word counter calculates
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Unlike basic counters that stop at words and characters, ToolWools
            gives you a full writing-analytics dashboard. Every statistic
            updates live as you type — no clicking, no waiting.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <FeatureRow
              icon={Target}
              title="Words & characters"
              desc="Total words, characters with spaces, and characters without spaces — essential for every platform limit."
            />
            <FeatureRow
              icon={List}
              title="Sentences & paragraphs"
              desc="Accurate sentence detection handles multiple punctuation, ellipses, and abbreviations correctly."
            />
            <FeatureRow
              icon={Gauge}
              title="Readability scores"
              desc="Flesch Reading Ease (0–100) and Flesch-Kincaid Grade Level, the industry-standard readability metrics."
            />
            <FeatureRow
              icon={BookOpen}
              title="Reading & speaking time"
              desc="Reading at 225 WPM and speaking at 130 WPM — perfect for blog posts, podcasts, and presentations."
            />
            <FeatureRow
              icon={Search}
              title="Keyword density"
              desc="Top 8 keywords with frequency and density %. Ideal SEO range is 1–3% for your primary keyword."
            />
            <FeatureRow
              icon={Code2}
              title="Sentence distribution"
              desc="Visualize how long your sentences run. Mixing short and long sentences improves rhythm and retention."
            />
          </div>
        </section>

        {/* How to use */}
        <section aria-labelledby="how-to-use" className="mt-10">
          <h2 id="how-to-use" className="heading-lg text-[26px] md:text-[30px] text-dark">
            How to use the word counter
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The tool is designed to work the moment you land on the page. No
            signup, no file upload queue, no paywalls. Here is the full workflow:
          </p>
          <ol className="mt-5 space-y-4 not-prose">
            <Step num={1} title="Paste or type your text">
              Use the editor above. You can paste a draft, upload a{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">.txt</code> or{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">.md</code>{' '}
              file, or type directly. The counts start updating on the first keystroke.
            </Step>
            <Step num={2} title="Pick a target limit (optional)">
              Tap a preset — X (Twitter), SMS, SEO title, meta description,
              LinkedIn headline, YouTube title — or enter a custom number. A progress
              bar turns amber at 85% and red once you go over.
            </Step>
            <Step num={3} title="Read your stats">
              Review words, characters, sentences, paragraphs, reading time, and
              readability. The sentence-length chart and keyword-density panel
              surface structural issues most counters miss.
            </Step>
            <Step num={4} title="Export or share">
              Copy the text back to your clipboard, play it back with the built-in
              text-to-speech button, or copy a full analysis report to share with
              an editor or team.
            </Step>
          </ol>
        </section>

        {/* Use cases */}
        <section aria-labelledby="use-cases" className="mt-10">
          <h2 id="use-cases" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Who uses a word counter (and for what)
          </h2>
          <div className="mt-5 space-y-3 not-prose">
            <UseCase
              icon={Users}
              label="Content writers & bloggers"
              body={
                <>
                  Long-form articles that rank on Google typically run 1,500–2,500
                  words. Our counter tracks your progress and, with the readability
                  score, keeps your prose at an 8th-grade level — the sweet spot for
                  most B2C audiences.
                </>
              }
            />
            <UseCase
              icon={Target}
              label="SEO teams"
              body={
                <>
                  Check keyword density before you publish. Natural density of 1–3%
                  for your primary keyword avoids over-optimization penalties. Pair
                  with our{' '}
                  <Link href="/tools/seo-tools/meta-tag-generator" className="text-primary font-semibold hover:underline">
                    Meta Tag Generator
                  </Link>{' '}
                  to finalize your on-page SEO.
                </>
              }
            />
            <UseCase
              icon={FileText}
              label="Students & academics"
              body={
                <>
                  Essays, dissertations, and journal submissions all come with word
                  limits. Set a custom target (2,500, 5,000, 10,000 words) and watch
                  your progress in real time — no more frantic last-minute cuts.
                </>
              }
            />
            <UseCase
              icon={Share2}
              label="Social media managers"
              body={
                <>
                  Presets for X (280 chars), LinkedIn headlines (220), YouTube
                  titles (100), and SMS (160) mean you never ship a truncated post
                  again.
                </>
              }
            />
            <UseCase
              icon={Zap}
              label="Speakers & podcasters"
              body={
                <>
                  The speaking-time estimate at 130 WPM (professional broadcast
                  pace) helps you trim scripts to exact slot lengths.
                </>
              }
            />
          </div>
        </section>

        {/* Readability explained */}
        <section aria-labelledby="readability" className="mt-10">
          <h2 id="readability" className="heading-lg text-[26px] md:text-[30px] text-dark">
            How readability scores work
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            The <strong className="text-dark">Flesch Reading Ease</strong> score (0–100)
            measures how easy your text is to read. Higher is easier. The{' '}
            <strong className="text-dark">Flesch-Kincaid Grade Level</strong> estimates the
            US school grade required to understand the text.
          </p>
          <div className="mt-5 rounded-xl border border-border/60 bg-gray-50/60 p-5 not-prose">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left border-b border-border/60">
                  <th className="pb-2 font-semibold text-dark">Score</th>
                  <th className="pb-2 font-semibold text-dark">Level</th>
                  <th className="pb-2 font-semibold text-dark">Audience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="py-2 tabular-nums text-green font-semibold">90–100</td>
                  <td className="py-2">Very Easy</td>
                  <td className="py-2 text-muted">5th grade — children&apos;s books</td>
                </tr>
                <tr>
                  <td className="py-2 tabular-nums text-green font-semibold">70–90</td>
                  <td className="py-2">Easy</td>
                  <td className="py-2 text-muted">6–7th grade — consumer blogs</td>
                </tr>
                <tr>
                  <td className="py-2 tabular-nums text-blue font-semibold">60–70</td>
                  <td className="py-2">Standard</td>
                  <td className="py-2 text-muted">8–9th grade — most online content</td>
                </tr>
                <tr>
                  <td className="py-2 tabular-nums text-amber-600 font-semibold">30–60</td>
                  <td className="py-2">Difficult</td>
                  <td className="py-2 text-muted">College — technical articles</td>
                </tr>
                <tr>
                  <td className="py-2 tabular-nums text-red-500 font-semibold">0–30</td>
                  <td className="py-2">Very Difficult</td>
                  <td className="py-2 text-muted">Graduate — academic, legal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[16px] leading-[1.75] text-body">
            For most marketing and editorial content, aim for a Flesch Reading
            Ease score of <strong className="text-dark">60–70</strong> (roughly 8th–9th grade). This
            matches how Google, The New York Times, and most Fortune 500 blogs
            write.
          </p>
        </section>

        {/* Tips & best practices */}
        <section aria-labelledby="tips" className="mt-10">
          <h2 id="tips" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Writing tips powered by the stats you see
          </h2>
          <ul className="mt-5 space-y-3 not-prose">
            <Tip>
              <strong className="text-dark">Vary your sentence length.</strong> If the distribution chart is lopsided
              toward one bucket, your prose will feel monotonous. Aim for a mix of short (under 10), medium (10–20), and occasional long sentences.
            </Tip>
            <Tip>
              <strong className="text-dark">Keep the average word at 4–5 characters.</strong> Much higher and
              readers start skimming. Swap jargon for plain verbs and nouns.
            </Tip>
            <Tip>
              <strong className="text-dark">Respect keyword density.</strong> Your primary keyword should land
              at <em>1–3%</em>. Over 5% reads spammy to both humans and search engines.
            </Tip>
            <Tip>
              <strong className="text-dark">Match reading time to intent.</strong> Product descriptions: under
              1 minute. How-to articles: 3–7 minutes. In-depth guides: 8–15 minutes.
            </Tip>
            <Tip>
              <strong className="text-dark">Use the speaking time for voiceovers.</strong> Scripts read ~30%
              slower than internal reading. Budget 130 WPM for natural, broadcast-quality delivery.
            </Tip>
          </ul>
        </section>

        {/* Privacy & technical */}
        <section aria-labelledby="privacy" className="mt-10">
          <h2 id="privacy" className="heading-lg text-[26px] md:text-[30px] text-dark">
            Privacy-first by design
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Every calculation happens inside your browser using JavaScript. Your
            text is never transmitted to our servers, stored in a database, or
            shared with third parties. You can verify this by disabling your
            internet connection and using the tool offline — once the page is
            loaded, it works without a network. Perfect for drafts, confidential
            memos, and client work that can&apos;t leave your machine.
          </p>
        </section>

        {/* Conclusion + CTA */}
        <section aria-labelledby="conclusion" className="mt-10">
          <h2 id="conclusion" className="heading-lg text-[26px] md:text-[30px] text-dark">
            A professional writing companion, completely free
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-body">
            Whether you&apos;re polishing a tweet, a tender document, or a 3,000-word
            feature, ToolWools&apos; Word Counter gives you the same analytics the
            best paid tools offer — without the subscription, signup, or tracker.
            Bookmark this page and get the answer before the question even
            finishes forming in your head.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 not-prose">
            <Link
              href="/tools/seo-tools/meta-tag-generator"
              className="inline-flex items-center gap-1.5 rounded-lg bg-dark px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-dark/90 transition-colors"
            >
              Try Meta Tag Generator
            </Link>
            <Link
              href="/tools/developer-tools/json-formatter"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-border px-4 py-2.5 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors"
            >
              Try JSON Formatter
            </Link>
          </div>
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
              ['intro', 'What is a word counter'],
              ['features', 'Every metric we calculate'],
              ['how-to-use', 'How to use the tool'],
              ['use-cases', 'Who uses a word counter'],
              ['readability', 'How readability scores work'],
              ['tips', 'Writing tips'],
              ['privacy', 'Privacy-first by design'],
              ['conclusion', 'A professional companion'],
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
  icon: typeof Target;
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

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
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


import Link from 'next/link';

export default function CompressImagesArticle() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-dark leading-tight mb-4">
        How to Compress Images for Web Without Losing Quality
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-8 pb-6 border-b border-border">
        <span>May 8, 2026</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span>6 min read</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
          Image Tools
        </span>
      </div>

      {/* TL;DR */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
        <p className="text-sm font-semibold text-dark mb-1">Quick Summary</p>
        <p className="text-sm text-body leading-relaxed">
          To compress images for the web without quality loss: choose the right format (WEBP for photos,
          PNG for graphics), resize to actual display dimensions, use lossy compression at 75-80% quality,
          enable lazy loading, and leverage browser-based tools like the{' '}
          <Link href="/tools/image-tools/image-compressor" className="text-primary font-medium hover:underline">
            ToolWools Image Compressor
          </Link>{' '}
          that process files without server uploads.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Why Image Compression Matters for Web Performance
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Images account for over 50% of total page weight on most websites. Uncompressed or poorly
          optimized images slow down page load times, hurt your Core Web Vitals scores, and can push
          visitors away before your content even loads. Google considers page speed a ranking factor,
          meaning bloated images can directly hurt your search visibility.
        </p>
        <p className="text-body leading-relaxed mb-4">
          The good news? You can reduce image file sizes by 60-80% without any perceptible quality loss
          to the human eye. The key is understanding which compression techniques work for different
          image types and applying them consistently across your workflow.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Choose the Right Image Format
        </h2>
        <p className="text-body leading-relaxed mb-4">
          The format you choose matters more than most people realize. Each format excels at different
          types of content:
        </p>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li>
            <strong>WEBP:</strong> Best overall format for the web. Supports both lossy and lossless
            compression, transparency, and animation. Produces files 25-34% smaller than JPEG at
            equivalent quality.
          </li>
          <li>
            <strong>JPEG/JPG:</strong> Excellent for photographs and complex images with many colors.
            Does not support transparency. Use quality settings between 75-85% for the best
            size-to-quality ratio.
          </li>
          <li>
            <strong>PNG:</strong> Ideal for graphics, logos, screenshots, and images requiring
            transparency. Lossless compression means larger files but perfect quality.
          </li>
          <li>
            <strong>AVIF:</strong> Next-generation format with even better compression than WEBP.
            Browser support is growing but not yet universal.
          </li>
        </ul>
        <p className="text-body leading-relaxed">
          For most websites, converting photos to WEBP and keeping graphics as optimized PNG provides
          the best balance. Our{' '}
          <Link href="/tools/image-tools/image-compressor" className="text-primary font-medium hover:underline">
            Image Compressor
          </Link>{' '}
          handles JPG, PNG, and WEBP formats with adjustable quality settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Resize Before You Compress
        </h2>
        <p className="text-body leading-relaxed mb-4">
          One of the most common mistakes is uploading a 4000x3000px image when it only displays at
          800x600px on the page. Resizing to actual display dimensions (accounting for 2x retina
          screens) can cut file size by 75% before you even apply compression.
        </p>
        <p className="text-body leading-relaxed mb-4">
          Follow this rule of thumb: if your image displays at 600px wide on desktop, export it at
          1200px wide (2x for retina). This provides crisp display on high-DPI screens without the
          bloat of a full-resolution source file.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Lossy vs. Lossless Compression: When to Use Each
        </h2>
        <p className="text-body leading-relaxed mb-4">
          <strong>Lossy compression</strong> permanently removes some image data to achieve smaller
          file sizes. At quality settings of 75-85%, the removed data is imperceptible to human eyes.
          This is ideal for photographs and hero images.
        </p>
        <p className="text-body leading-relaxed mb-4">
          <strong>Lossless compression</strong> reduces file size without removing any data. The image
          is pixel-perfect identical to the original. Use this for logos, UI elements, screenshots, and
          any image that will be edited later.
        </p>
        <p className="text-body leading-relaxed">
          Most web images benefit from lossy compression. The{' '}
          <Link href="/tools/image-tools/image-compressor" className="text-primary font-medium hover:underline">
            ToolWools Image Compressor
          </Link>{' '}
          lets you adjust quality from 10% to 100%, giving you full control over the
          quality-versus-size tradeoff.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Implement Lazy Loading for Below-the-Fold Images
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Even perfectly compressed images can slow your page if they all load at once. Lazy loading
          defers loading off-screen images until the user scrolls near them. In modern HTML, it is as
          simple as adding <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">loading=&quot;lazy&quot;</code> to
          your image tags.
        </p>
        <p className="text-body leading-relaxed">
          Always keep your hero image and above-the-fold content eager-loaded (the default) for the
          best Largest Contentful Paint (LCP) score. Only lazy-load images further down the page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          5 Tips for Maximum Compression Without Quality Loss
        </h2>
        <ul className="space-y-3 text-body mb-4 ml-2">
          <li className="flex gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Strip EXIF metadata — camera data, GPS coordinates, and thumbnails add unnecessary bytes.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Use progressive JPEG encoding so images render from blurry to sharp as they load.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Serve different sizes with srcset for responsive images across devices.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Use a CDN with automatic image optimization (Cloudflare, Vercel, Imgix).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">5.</span>
            <span>Batch-compress images before uploading using a tool like our free{' '}
              <Link href="/tools/image-tools/image-compressor" className="text-primary font-medium hover:underline">
                Image Compressor
              </Link>.
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Measure Your Results
        </h2>
        <p className="text-body leading-relaxed mb-4">
          After optimizing your images, validate the improvement. Use Google PageSpeed Insights or
          Lighthouse to check your Core Web Vitals. Focus on Largest Contentful Paint (LCP) — it should
          be under 2.5 seconds. Also review your total page weight; most well-optimized pages keep
          images under 500KB total.
        </p>
        <p className="text-body leading-relaxed">
          Track your{' '}
          <Link href="/tools/seo-tools/domain-authority-checker" className="text-primary font-medium hover:underline">
            domain authority
          </Link>{' '}
          over time — faster sites tend to earn more backlinks and better search rankings, which
          compounds into higher authority scores.
        </p>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-xl p-6 mt-10">
        <h3 className="text-lg font-display text-dark mb-2">
          Ready to Compress Your Images?
        </h3>
        <p className="text-sm text-body mb-4">
          Try our free Image Compressor — reduce JPG, PNG, and WEBP files by up to 80% with zero
          quality loss. No signup, no uploads to servers, 100% browser-based.
        </p>
        <Link
          href="/tools/image-tools/image-compressor"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-btn hover:bg-primary-dark transition-colors"
        >
          Try Image Compressor Free &rarr;
        </Link>
      </div>
    </>
  );
}

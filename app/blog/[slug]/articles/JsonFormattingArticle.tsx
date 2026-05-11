import Link from 'next/link';

export default function JsonFormattingArticle() {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-dark leading-tight mb-4">
        The Complete Guide to JSON Formatting &amp; Validation
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-8 pb-6 border-b border-border">
        <span>January 5, 2025</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span>7 min read</span>
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          Developer
        </span>
      </div>

      {/* TL;DR */}
      <div className="bg-green-bg border border-green-200 rounded-xl p-5 mb-8">
        <p className="text-sm font-semibold text-dark mb-1">Quick Summary</p>
        <p className="text-sm text-body leading-relaxed">
          JSON (JavaScript Object Notation) is the standard data format for APIs and configuration
          files. This guide covers proper formatting rules, common validation errors, debugging
          techniques, and tools to make working with JSON painless. Use the{' '}
          <Link href="/tools/developer-tools/json-formatter" className="text-primary font-medium hover:underline">
            ToolStack JSON Formatter
          </Link>{' '}
          for instant formatting, validation, minification, and tree-view exploration.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          What Is JSON and Why Does It Matter?
        </h2>
        <p className="text-body leading-relaxed mb-4">
          JSON (JavaScript Object Notation) is a lightweight data interchange format that has become
          the lingua franca of web development. Nearly every REST API sends and receives JSON. Config
          files for tools like package.json, tsconfig.json, and .eslintrc use it. Databases like
          MongoDB store documents as JSON-like structures.
        </p>
        <p className="text-body leading-relaxed mb-4">
          Despite its simplicity, JSON has strict syntax rules that catch developers off guard. A single
          trailing comma, unquoted key, or misplaced bracket can break an entire payload. Understanding
          the format thoroughly — and having reliable validation tools — saves hours of debugging.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          JSON Syntax Rules You Must Know
        </h2>
        <p className="text-body leading-relaxed mb-4">
          JSON looks simple, but these are the rules that trip people up most often:
        </p>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li><strong>Keys must be double-quoted strings.</strong> Single quotes or unquoted keys are invalid.</li>
          <li><strong>No trailing commas.</strong> Unlike JavaScript, the last item in an array or object cannot have a comma after it.</li>
          <li><strong>No comments.</strong> JSON does not support // or /* */ comments. Use JSONC (JSON with Comments) for config files that support it.</li>
          <li><strong>Strings must use double quotes.</strong> Single-quoted strings are invalid JSON.</li>
          <li><strong>Numbers cannot have leading zeros.</strong> Write 0.5, not .5. Write 10, not 010.</li>
          <li><strong>Values can only be:</strong> strings, numbers, booleans (true/false), null, arrays, or objects.</li>
          <li><strong>No undefined.</strong> Unlike JavaScript, there is no undefined value in JSON. Use null instead.</li>
        </ul>
        <p className="text-body leading-relaxed">
          Run your JSON through the{' '}
          <Link href="/tools/developer-tools/json-formatter" className="text-primary font-medium hover:underline">
            JSON Formatter
          </Link>{' '}
          to instantly catch violations of these rules with clear error messages and line numbers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Formatting JSON for Readability
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Minified JSON is efficient for data transfer but impossible to read. Proper formatting adds
          indentation (typically 2 or 4 spaces), line breaks after each key-value pair, and consistent
          spacing around colons and brackets.
        </p>
        <p className="text-body leading-relaxed mb-4">
          Well-formatted JSON makes code reviews easier, debugging faster, and documentation clearer.
          Most APIs return minified JSON to reduce bandwidth, but during development you should always
          work with the formatted version.
        </p>
        <p className="text-body leading-relaxed">
          The{' '}
          <Link href="/tools/developer-tools/json-formatter" className="text-primary font-medium hover:underline">
            ToolStack JSON Formatter
          </Link>{' '}
          lets you switch between formatted (pretty-printed) and minified views with one click, and
          includes syntax highlighting that color-codes keys, strings, numbers, and booleans for easy
          scanning.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Common JSON Errors and How to Fix Them
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Here are the most frequent JSON validation errors developers encounter:
        </p>
        <ul className="space-y-4 text-body mb-4 ml-2">
          <li>
            <strong className="text-dark">Unexpected token (&apos;,&apos;):</strong> Usually a trailing comma after the
            last property. Remove the comma before the closing brace or bracket.
          </li>
          <li>
            <strong className="text-dark">Unexpected token (&apos;):</strong> You used single quotes instead of double
            quotes for a string or key. Replace all single quotes with double quotes.
          </li>
          <li>
            <strong className="text-dark">Unexpected end of input:</strong> Missing closing brace or bracket. Check that
            every opening bracket has a matching close.
          </li>
          <li>
            <strong className="text-dark">Unexpected token (u):</strong> Usually from including undefined as a value,
            which is not valid JSON. Replace with null or remove the property entirely.
          </li>
          <li>
            <strong className="text-dark">Duplicate key:</strong> While technically parseable, duplicate keys cause
            unpredictable behavior. Only the last value for a duplicate key is retained.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          JSON Minification for Production
        </h2>
        <p className="text-body leading-relaxed mb-4">
          When sending JSON over the network, minification removes all unnecessary whitespace to reduce
          payload size. For large API responses, this can mean 20-40% smaller transfers. Minified JSON
          also reduces storage costs for databases and caches.
        </p>
        <p className="text-body leading-relaxed">
          Always minify JSON for production APIs and config files served to browsers. Keep the formatted
          version in your source control for readability. Tools like our{' '}
          <Link href="/tools/developer-tools/json-formatter" className="text-primary font-medium hover:underline">
            JSON Formatter
          </Link>{' '}
          provide a dedicated minify button that strips all whitespace while preserving data integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Working with Large JSON Files
        </h2>
        <p className="text-body leading-relaxed mb-4">
          Large JSON files (over 1MB) can crash browser-based editors. For efficient exploration of
          complex JSON structures, a tree view with collapsible nodes is essential. This lets you
          navigate deeply nested objects without scrolling through thousands of lines.
        </p>
        <p className="text-body leading-relaxed mb-4">
          When dealing with large JSON payloads from APIs, consider these strategies:
        </p>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li>Use pagination to limit response sizes</li>
          <li>Request only needed fields with sparse fieldsets or GraphQL</li>
          <li>Stream large responses with JSON Lines (NDJSON) format</li>
          <li>Validate structure with JSON Schema before processing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          JSON Schema Validation
        </h2>
        <p className="text-body leading-relaxed mb-4">
          JSON Schema defines the structure, types, and constraints your JSON data must follow. It is
          like TypeScript types but for JSON payloads. Define required fields, value ranges, string
          patterns, and nested object shapes. Use schema validation at API boundaries to catch malformed
          data before it enters your system.
        </p>
        <p className="text-body leading-relaxed">
          Validate your schemas are syntactically correct JSON first using a formatter, then test them
          against sample payloads. The{' '}
          <Link href="/tools/text-tools/word-counter" className="text-primary font-medium hover:underline">
            Word Counter
          </Link>{' '}
          can also help you estimate the size and complexity of your schema documentation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-display text-dark mb-4">
          Best Practices for JSON in APIs
        </h2>
        <ul className="list-disc list-inside space-y-2 text-body mb-4 ml-2">
          <li>Use camelCase for keys (consistent with JavaScript conventions)</li>
          <li>Return ISO 8601 date strings (e.g., &quot;2025-01-05T12:00:00Z&quot;)</li>
          <li>Wrap responses in a data envelope for consistent structure</li>
          <li>Include pagination metadata for list endpoints</li>
          <li>Use null for absent values, never empty strings or &quot;N/A&quot;</li>
          <li>Version your API to handle schema changes gracefully</li>
          <li>Set Content-Type: application/json headers correctly</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mt-10">
        <h3 className="text-lg font-display text-dark mb-2">
          Format &amp; Validate Your JSON Instantly
        </h3>
        <p className="text-sm text-body mb-4">
          Paste raw JSON and get instant formatting, validation, minification, and tree-view exploration.
          Find errors with exact line numbers. No signup required.
        </p>
        <Link
          href="/tools/developer-tools/json-formatter"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green text-white text-sm font-semibold rounded-btn hover:bg-green-dark transition-colors"
        >
          Open JSON Formatter &rarr;
        </Link>
      </div>
    </>
  );
}

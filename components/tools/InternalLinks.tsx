'use client';

import Link from 'next/link';
import { getAllTools } from '@/lib/tools-data';

export function InternalLinks() {
  const allTools = getAllTools();

  // Group tools by category
  const grouped = allTools.reduce<Record<string, typeof allTools>>((acc, tool) => {
    if (!acc[tool.categoryLabel]) {
      acc[tool.categoryLabel] = [];
    }
    acc[tool.categoryLabel].push(tool);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section className="mt-12 rounded-2xl border border-gray-100/80 bg-gradient-to-br from-gray-50/80 to-white p-6 md:p-8">
      <h2 className="font-display text-xl font-bold text-dark mb-6">
        Explore More Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted mb-3">
              {category}
            </h3>
            <ul className="space-y-2">
              {grouped[category].map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.category}/${tool.slug}`}
                    className="text-[14px] text-body hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          href="/tools"
          className="text-[14px] font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          View All Tools →
        </Link>
      </div>
    </section>
  );
}

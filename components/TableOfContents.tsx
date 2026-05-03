'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/headings';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <aside className="not-prose mb-12 rounded-lg border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/40">
      <details open className="group">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
          <span>Contents</span>
          <span className="text-gray-400 transition-transform group-open:rotate-180" aria-hidden>
            ▾
          </span>
        </summary>
        <ol className="space-y-1 px-4 pb-4 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.depth === 3 ? 'pl-4' : ''}>
              <a
                href={`#${h.id}`}
                data-active={active === h.id}
                className="toc-link block border-l-2 border-transparent py-0.5 pl-3 text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </aside>
  );
}

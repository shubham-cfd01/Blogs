import Link from 'next/link';

export default function TagBadge({ tag, asLink = true }: { tag: string; asLink?: boolean }) {
  const className =
    'inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-400/30 dark:hover:bg-indigo-900/50';
  if (!asLink) return <span className={className}>{tag}</span>;
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} className={className}>
      {tag}
    </Link>
  );
}

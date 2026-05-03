import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import TagBadge from './TagBadge';

export default function PostCard({ post }: { post: PostMeta }) {
  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm dark:border-gray-800 dark:hover:border-indigo-700/60"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
          {post.title}
        </h3>
        <time dateTime={post.date} className="shrink-0 text-xs tabular-nums text-gray-500 dark:text-gray-500">
          {formatted}
        </time>
      </div>
      {post.description && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {post.description}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <TagBadge key={t} tag={t} asLink={false} />
          ))}
        </div>
      )}
    </Link>
  );
}

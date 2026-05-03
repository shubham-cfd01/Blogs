import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import TagBadge from './TagBadge';

export default function PostCard({ post }: { post: PostMeta }) {
  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const initial = (post.title.trim().charAt(0) || '?').toUpperCase();

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm sm:p-6 dark:border-gray-800 dark:hover:border-indigo-700/60"
    >
      <div className="flex gap-5">
        <div
          aria-hidden
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 font-serif text-5xl font-semibold text-gray-500 transition-colors group-hover:from-indigo-50 group-hover:to-indigo-100 group-hover:text-indigo-500 sm:h-24 sm:w-24 sm:text-6xl dark:from-gray-800/80 dark:to-gray-800/40 dark:text-gray-400 dark:group-hover:from-indigo-950/40 dark:group-hover:to-indigo-900/20 dark:group-hover:text-indigo-300"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-500">
            Published <span aria-hidden className="mx-1">·</span>
            <time dateTime={post.date}>{formatted}</time>
          </p>
          {post.description && (
            <p className="mt-3 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
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
        </div>
      </div>
    </Link>
  );
}

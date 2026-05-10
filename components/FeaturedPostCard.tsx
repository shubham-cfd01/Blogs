import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import TagBadge from './TagBadge';
import Cover from './Cover';

export default function FeaturedPostCard({ post }: { post: PostMeta }) {
  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:hover:border-indigo-700/60"
    >
      {post.cover && (
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            <Cover src={post.cover} alt="" priority />
          </div>
        </div>
      )}
      <div className="p-6 sm:p-7">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          <span>Featured</span>
          <span aria-hidden className="text-gray-300 dark:text-gray-700">·</span>
          <time dateTime={post.date} className="text-gray-500 dark:text-gray-500">
            {formatted}
          </time>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 sm:text-3xl">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <TagBadge key={t} tag={t} asLink={false} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

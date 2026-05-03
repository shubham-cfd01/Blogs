import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Posts tagged ${decoded}.`,
  };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
            ←
          </span>
          All posts
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          <span className="text-indigo-600 dark:text-indigo-400">#</span>
          {decoded}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged <span className="font-medium">{decoded}</span>.
        </p>
      </div>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

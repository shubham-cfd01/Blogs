import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import { readingTime } from '@/lib/reading-time';
import TagBadge from '@/components/TagBadge';
import ReadingProgress from '@/components/ReadingProgress';
import CodeCopyButtons from '@/components/CodeCopyButtons';
import Cover from '@/components/Cover';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();

  const post = getPostBySlug(slug);
  const html = await markdownToHtml(post.content);
  const minutes = readingTime(post.content);
  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ReadingProgress />
      <article>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
            ←
          </span>
          All posts
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 text-xl leading-relaxed text-gray-600 dark:text-gray-400 sm:text-2xl">
              {post.description}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
            <time dateTime={post.date}>{formatted}</time>
            <span aria-hidden>·</span>
            <span>{minutes} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
          )}
        </header>

        {post.cover && (
          <div className="mb-10">
            <Cover src={post.cover} alt={post.title} priority />
          </div>
        )}

        <div
          className="prose prose-article prose-gray max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:font-normal prose-blockquote:not-italic prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <CodeCopyButtons />

        <div className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
          <div className="mb-10 flex justify-center">
            <LikeButton slug={post.slug} />
          </div>
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Comments</h2>
          <Comments slug={post.slug} />
        </div>
      </article>
    </>
  );
}

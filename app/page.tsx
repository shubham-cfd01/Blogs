import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import FeaturedPostCard from '@/components/FeaturedPostCard';

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-16 sm:space-y-20">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Hi, I&apos;m Shubham.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Software engineer writing about systems, the web, and the craft of building things that last.
        </p>
      </section>

      {featured && (
        <section>
          <FeaturedPostCard post={featured} />
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            More writing
          </h2>
          <ul className="mt-6 space-y-4">
            {rest.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

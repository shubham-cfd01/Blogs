import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import FeaturedPostCard from '@/components/FeaturedPostCard';

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12 sm:space-y-16">
      <h1 className="sr-only">Writing</h1>

      {featured && (
        <section>
          <FeaturedPostCard post={featured} />
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
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

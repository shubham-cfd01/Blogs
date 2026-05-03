import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';

const BASE_URL = 'https://shubham.blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();
  const now = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/profile`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...posts.map((p) => ({
      url: `${BASE_URL}/posts/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    })),
    ...tags.map((t) => ({
      url: `${BASE_URL}/tags/${encodeURIComponent(t)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}

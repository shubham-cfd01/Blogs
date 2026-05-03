import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  published: boolean;
};

export type Post = PostMeta & { content: string };

const POSTS_DIR = path.join(process.cwd(), 'posts');

export function getAllSlugs(dir: string = POSTS_DIR): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function toISODate(d: unknown): string {
  if (!d) return '';
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d).slice(0, 10);
}

export function getPostBySlug(slug: string, dir: string = POSTS_DIR): Post {
  const raw = fs.readFileSync(path.join(dir, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: toISODate(data.date),
    description: data.description ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: typeof data.cover === 'string' ? data.cover : undefined,
    published: data.published !== false,
    content,
  };
}

export function getAllPosts(dir: string = POSTS_DIR, includeDrafts = false): Post[] {
  return getAllSlugs(dir)
    .map((slug) => getPostBySlug(slug, dir))
    .filter((p) => includeDrafts || p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(dir: string = POSTS_DIR): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts(dir)) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string, dir: string = POSTS_DIR): Post[] {
  return getAllPosts(dir).filter((p) => p.tags.includes(tag));
}

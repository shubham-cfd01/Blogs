import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { getAllSlugs, getPostBySlug, getAllPosts, getAllTags, getPostsByTag } from './posts';

const FIXTURES = path.join(import.meta.dirname, '__fixtures__');

describe('posts', () => {
  it('lists slugs from a directory', () => {
    expect(getAllSlugs(FIXTURES).sort()).toEqual(['a', 'b', 'c']);
  });

  it('parses frontmatter into a Post', () => {
    const post = getPostBySlug('a', FIXTURES);
    expect(post.title).toBe('Post A');
    expect(post.tags).toEqual(['x']);
    expect(post.published).toBe(true);
    expect(post.content.trim()).toBe('content a');
  });

  it('hides drafts by default and sorts by date descending', () => {
    const posts = getAllPosts(FIXTURES);
    expect(posts.map((p) => p.slug)).toEqual(['b', 'a']);
  });

  it('includes drafts when asked', () => {
    const posts = getAllPosts(FIXTURES, true);
    expect(posts.map((p) => p.slug).sort()).toEqual(['a', 'b', 'c']);
  });

  it('collects unique tags from published posts', () => {
    expect(getAllTags(FIXTURES)).toEqual(['x', 'y']);
  });

  it('filters posts by tag', () => {
    expect(getPostsByTag('x', FIXTURES).map((p) => p.slug)).toEqual(['a']);
  });
});

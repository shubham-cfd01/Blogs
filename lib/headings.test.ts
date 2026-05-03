import { describe, it, expect } from 'vitest';
import { extractHeadings } from './headings';

describe('extractHeadings', () => {
  it('extracts h2 and h3 with slugs', () => {
    const md = '# Title\n\n## First Section\n\nbody\n\n### A Subsection\n\n## Second Section\n';
    expect(extractHeadings(md)).toEqual([
      { depth: 2, text: 'First Section', id: 'first-section' },
      { depth: 3, text: 'A Subsection', id: 'a-subsection' },
      { depth: 2, text: 'Second Section', id: 'second-section' },
    ]);
  });

  it('ignores headings inside fenced code blocks', () => {
    const md = '## Real\n\n```ts\n## not a heading\n```\n\n## Also Real\n';
    expect(extractHeadings(md).map((h) => h.text)).toEqual(['Real', 'Also Real']);
  });

  it('disambiguates duplicate slugs', () => {
    const md = '## Setup\n\n## Setup\n';
    expect(extractHeadings(md).map((h) => h.id)).toEqual(['setup', 'setup-1']);
  });
});

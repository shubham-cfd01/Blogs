import GithubSlugger from 'github-slugger';

export type Heading = { depth: 2 | 3; text: string; id: string };

export function extractHeadings(md: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = md.split('\n');
  const headings: Heading[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }

  return headings;
}

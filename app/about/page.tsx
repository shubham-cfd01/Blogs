import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About me — what I do and what I write about.',
};

export default function AboutPage() {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-indigo-400">
      <h1>About</h1>
      <p>
        I&apos;m Shubham Mishra, a software engineer who enjoys building reliable
        systems and writing about the things I learn along the way.
      </p>
      <p>
        This blog is a place for notes — half for future-me, half for anyone else
        who finds them useful. Topics tend to cluster around web infrastructure,
        TypeScript, and the small habits that compound into better software.
      </p>
      <p>
        You can reach me on{' '}
        <a href="https://github.com/shubham-cfd01" target="_blank" rel="noopener noreferrer">GitHub</a>,{' '}
        <a href="https://www.linkedin.com/in/shubham-mishra-976458100/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or by{' '}
        <a href="mailto:mishrashubhamrewa@gmail.com">email</a>.
      </p>
    </div>
  );
}

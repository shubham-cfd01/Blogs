import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: 'https://github.com/shubham-cfd01', label: 'GitHub', external: true },
  { href: 'https://www.linkedin.com/in/shubham-mishra-976458100/', label: 'LinkedIn', external: true },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          shubham<span className="text-indigo-600 dark:text-indigo-400">.</span>blog
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="hidden rounded-md px-2 py-1 text-sm text-gray-600 transition-colors hover:text-gray-900 sm:inline-block dark:text-gray-400 dark:hover:text-gray-100"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

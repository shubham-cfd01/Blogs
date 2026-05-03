import Link from 'next/link';

const socials = [
  { href: 'https://www.linkedin.com/in/shubham-mishra-976458100/', label: 'LinkedIn' },
  { href: 'mailto:mishrashubhamrewa@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Shubham Mishra</p>
        <nav className="flex gap-4">
          {socials.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

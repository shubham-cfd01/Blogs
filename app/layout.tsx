import './globals.css';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://shubham.blog'),
  title: { default: 'Shubham — Blog', template: '%s — Shubham' },
  description: 'Notes on software, systems, and the craft of building things.',
  openGraph: { type: 'website', siteName: 'Shubham — Blog' },
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(_){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

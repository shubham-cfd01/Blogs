'use client';
import { useState, useEffect } from 'react';

export default function LikeButton({ slug }: { slug: string }) {
  const key = `liked:${slug}`;
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLiked(localStorage.getItem(key) === 'true');
  }, [key]);

  function toggle() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(key, String(next));
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        liked
          ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400'
          : 'border-gray-200 bg-white text-gray-500 hover:border-red-200 hover:text-red-500 dark:border-gray-800 dark:bg-transparent dark:text-gray-500 dark:hover:border-red-800/50 dark:hover:text-red-400'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {liked ? 'Liked' : 'Like this post'}
    </button>
  );
}

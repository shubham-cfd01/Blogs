'use client';

import { useEffect } from 'react';

export default function CodeCopyButtons() {
  useEffect(() => {
    const root = document.querySelector('article .prose');
    if (!root) return;
    const blocks = root.querySelectorAll<HTMLPreElement>('pre');

    const cleanups: Array<() => void> = [];
    blocks.forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code');

      const onClick = async () => {
        const code = pre.querySelector('code');
        const text = code?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied';
          btn.dataset.copied = 'true';
          setTimeout(() => {
            btn.textContent = 'Copy';
            delete btn.dataset.copied;
          }, 1500);
        } catch {
          btn.textContent = 'Failed';
          setTimeout(() => (btn.textContent = 'Copy'), 1500);
        }
      };
      btn.addEventListener('click', onClick);
      pre.appendChild(btn);
      cleanups.push(() => {
        btn.removeEventListener('click', onClick);
        btn.remove();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

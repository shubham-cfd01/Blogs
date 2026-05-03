'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    disqus_config: () => void;
  }
}

export default function Comments({ slug }: { slug: string }) {
  useEffect(() => {
    window.disqus_config = function () {
      // @ts-expect-error disqus types
      this.page.url = `https://shubhamwrites.blog/posts/${slug}`;
      // @ts-expect-error disqus types
      this.page.identifier = slug;
    };

    const script = document.createElement('script');
    script.src = 'https://REPLACE_SHORTNAME.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(Date.now()));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // clean up disqus globals
      const reset = (window as unknown as Record<string, unknown>)['DISQUS'];
      if (reset && typeof reset === 'object' && 'reset' in reset) {
        (reset as { reset: () => void }).reset();
      }
    };
  }, [slug]);

  return (
    <div>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view comments.
      </noscript>
    </div>
  );
}

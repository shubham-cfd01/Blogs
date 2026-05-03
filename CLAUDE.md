# CLAUDE.md

Guidance for Claude when working in this repo.

## What this is

A minimal personal tech blog: **Next.js 15 (App Router) + Markdown + Tailwind**, deployed on Vercel.

## Core principles (do not violate)

1. **Simplicity wins.** Prefer the smallest correct change. No defensive code for impossible cases. No abstractions until they earn their keep (rule of three).
2. **Pure functions in `lib/`.** Anything that touches the filesystem or transforms data lives in `lib/` as a pure function with explicit arguments — no module-level state, no hidden globals. This is what makes the code testable.
3. **Server components by default.** Only add `"use client"` when you need state or browser APIs.
4. **Match Next.js conventions.** Use `Metadata`, `generateStaticParams`, `generateMetadata`, `notFound()` — don't reinvent.
5. **No comments unless the *why* is non-obvious.** Names should carry intent.

## Layout

```
app/
  layout.tsx              root HTML, fonts, site metadata
  page.tsx                homepage — lists posts
  globals.css             tailwind + highlight.js theme
  posts/[slug]/page.tsx   individual post (SSG)
lib/
  posts.ts                read/list/get markdown posts (pure, takes `dir`)
  markdown.ts             markdown -> HTML pipeline
  reading-time.ts         word count -> minutes
  *.test.ts               vitest tests
  __fixtures__/           sample md files for tests
posts/                    actual blog posts (.md with frontmatter)
```

## Adding a post

Drop a file at `posts/<slug>.md`:

```md
---
title: My Post
date: 2026-05-01
description: Short blurb shown on the index.
tags: [tag1, tag2]
---

Body in Markdown.
```

`getAllPosts()` reads them at build time. No registration step.

## Testing

`npm test` runs vitest on `lib/**/*.test.ts`. `lib/` functions accept a `dir` arg so tests pass `lib/__fixtures__/` instead of the real `posts/` dir. Keep this pattern: any new helper in `lib/` should be a pure function with no module-level config.

## Commands

| | |
|---|---|
| `npm run dev`   | dev server |
| `npm run build` | production build |
| `npm start`     | serve build |
| `npm test`      | run tests |
| `npm run lint`  | lint |

## What NOT to add (unless asked)

- Search, comments (Giscus), RSS, sitemap, analytics — listed as "extras" in `plan.md` but intentionally deferred. Add only when the user requests.
- A CMS, a database, an admin UI. Posts are files.
- Client-side data fetching for posts. They're known at build time — keep it static.
- Testing libraries beyond vitest. No jest, no testing-library unless we add interactive UI.

## Deployment

Vercel auto-detects Next.js. Push to GitHub → import in Vercel → done. No env vars required for the base setup.

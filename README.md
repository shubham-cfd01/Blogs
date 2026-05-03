# Blog

Minimal personal tech blog: Next.js 15 (App Router) + Markdown + Tailwind. Deployed on Vercel.

## Features

- Markdown posts with frontmatter (`title`, `date`, `description`, `tags`)
- Static dynamic routes at `/posts/[slug]`
- Syntax highlighting (highlight.js, GitHub Dark theme)
- Tailwind typography for readable prose, mobile responsive, dark mode
- SEO + Open Graph metadata via Next.js Metadata API
- Reading-time estimate
- Tags listed per post
- Pure helpers in `lib/`, unit-tested with vitest

## Setup

Requires **Node 20+**.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Add a post

Create `posts/<slug>.md`:

```md
---
title: My Post
date: 2026-05-01
description: One-line summary.
tags: [tag1, tag2]
---

Markdown body here.
```

It appears on the homepage and at `/posts/<slug>` automatically.

## Folder structure

```
app/
  layout.tsx
  page.tsx
  globals.css
  posts/[slug]/page.tsx
lib/
  posts.ts
  markdown.ts
  reading-time.ts
  *.test.ts
  __fixtures__/
posts/
  *.md
```

## Commands

```bash
npm run dev      # dev server
npm run build    # production build
npm start        # serve production build
npm test         # run vitest
npm run lint     # lint
```

## Deploy on Vercel

1. `git init && git add . && git commit -m "init"`
2. Push to a new GitHub repo.
3. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
4. Accept the auto-detected Next.js settings → **Deploy**.

Zero config. Subsequent pushes to the default branch auto-deploy.

## Extras (not implemented)

The plan mentions search and comments (Giscus). Both are intentionally deferred to keep the surface area small. Add them when you actually want them.

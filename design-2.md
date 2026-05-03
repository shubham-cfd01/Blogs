Build a modern, professional blog platform inspired by Medium, Dev.to, and Hashnode.

Tech Stack:
- Frontend: Next.js (App Router) + Tailwind CSS + TypeScript
- Backend: Next.js API routes or Node.js (Express)
- Database: MongoDB (or PostgreSQL with Prisma)
- Auth: NextAuth.js (Google + Email login)
- Deployment: Vercel (frontend) + MongoDB Atlas

Core Requirements:

1. UI/UX DESIGN:
- Clean, minimal, distraction-free reading experience like Medium
- Typography-focused design (large readable fonts, good spacing)
- Light/Dark mode toggle
- Responsive (mobile + desktop)
- Sticky navbar with:
  - Logo
  - Search bar
  - Write button
  - Profile avatar dropdown

2. HOMEPAGE:
- Featured blog section (hero style)
- Trending blogs
- Latest blogs feed (infinite scroll)
- Tag/category filters (AI, DevOps, Coding, Math, etc.)

3. BLOG EDITOR:
- Rich text editor (like Medium)
- Support:
  - Markdown
  - Code blocks with syntax highlighting
  - LaTeX / Math equations
  - Image upload
  - Embeds (YouTube, links)
- Auto-save drafts
- Preview mode before publishing

4. BLOG PAGE:
- Clean reading layout
- Author info (name, avatar, bio)
- Read time estimation
- Like, bookmark, share buttons
- Table of contents (auto-generated from headings)

5. USER FEATURES:
- User profile page (their blogs, bio)
- Follow authors
- Bookmark blogs
- Draft saving

6. BACKEND FEATURES:
- REST or GraphQL API
- Models:
  - User
  - Blog
  - Comment
  - Tag
- CRUD operations:
  - Create/edit/delete blog
  - Like/comment/bookmark
- Slug-based routing for blogs
- Server-side rendering (SEO optimized)

7. SEARCH & SEO:
- Full-text search
- SEO meta tags for each blog
- Sitemap generation

8. PERFORMANCE:
- Lazy loading
- Image optimization
- Fast page load (Lighthouse optimized)

9. EXTRA FEATURES (IMPORTANT):
- Math + diagrams support (for technical blogs)
- Code copy button
- Highlight important sections
- Newsletter subscription option

10. DESIGN STYLE:
- Inspired by Medium:
  - Lots of white space
  - Serif fonts for content
  - Smooth hover animations
- Cards for blog previews
- Soft shadows, rounded corners

11. BONUS:
- Admin dashboard
- Analytics (views, likes)
- Comment system (threaded)

Deliver:
- Full project structure
- Clean reusable components
- API routes
- Sample UI screens
- Instructions to run locally
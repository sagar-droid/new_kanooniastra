This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Content Management System (CMS)

This project includes a self-hosted CMS at `/admin`, backed by MongoDB, for managing Blog Posts, Case Studies, Team Members, Testimonials, FAQs, and generic Pages without a redeploy.

### 1. Environment setup

Copy these into `.env` (never commit real values):

```bash
# MongoDB Atlas connection string (include a database name in the path, e.g. /kanooniastra)
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/kanooniastra?retryWrites=true&w=majority"

# Random secret used to sign admin session JWTs — generate a fresh one per environment, e.g.:
#   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
JWT_SECRET="..."

# Cloudinary credentials (used for all image uploads in the admin panel)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

On Vercel, add the same variables under Project Settings → Environment Variables for every environment (Production, Preview, Development) — `MONGODB_URI` in particular is also needed at build time, since `generateStaticParams` and `sitemap.ts` query the database during the build.

### 2. Create your first admin user

```bash
npm run create-admin -- you@example.com "a-strong-password"
```

This upserts a user with the `admin` role by email — safe to re-run with the same email to reset a password. There is no public sign-up route; accounts are only created this way. The `User` model has a `role` field (`"admin" | "editor"`) so an `"editor"` role can be added later without a schema change — there's just no UI distinction between the two roles yet.

Then log in at `/admin/login` and you'll land on the dashboard at `/admin`.

### 3. How content flows from admin → live site

- Every content type has a **`status`** field — `"draft" | "published"` for Blog Posts, Case Studies, FAQs, Pages, and Team Members (Testimonials use `"pending" | "approved"` instead). Only published/approved content is ever queried by the public pages; drafts are invisible on the live site but fully editable in `/admin`.
- Saving a change calls `revalidatePath()` on the affected public URL(s) (list page, detail page, and `/sitemap.xml`), so publishing shows up on the live site **immediately** — no redeploy needed.
- As a safety net, every public page also carries a 1-hour `revalidate` (ISR), in case a change is ever made directly in the database rather than through the admin UI.
- Renaming a slug revalidates both the old and new URLs.

| Content type | Admin | Public list | Public detail |
|---|---|---|---|
| Blog Post | `/admin/blog` | `/blog` | `/blog/[slug]` |
| Case Study | `/admin/case-studies` | `/case-studies` | `/case-studies/[slug]` |
| Team Member | `/admin/team-members` | `/ourteam` | `/ourteam/[slug]` |
| Testimonial | `/admin/testimonials` | `/testimonials` | — |
| FAQ | `/admin/faqs` | `/faq` | — |
| Page | `/admin/pages` | — | `/[slug]` |

A generic `Page` can't be created with a slug that collides with an existing route (`blog`, `admin`, `ourteam`, etc.) — the admin form rejects those to avoid creating unreachable content.

### 4. Images

All image uploads (cover images, photos) go through Cloudinary via `/api/admin/uploads` — nothing is written to the local filesystem, which matters because Vercel's filesystem is ephemeral in production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

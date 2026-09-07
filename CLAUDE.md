# Kanooni Astra — CLAUDE.md

Marketing/informational website for **Kanooni Astra**, a law firm based in Bagbazar, Kathmandu, Nepal. Production domain: `https://kanooniastra.com`.

## Tech stack

- Next.js 14.2 (App Router, `src/app`), React 18, TypeScript
- Tailwind CSS + daisyUI, `clsx` / `tailwind-merge` for class composition
- Framer Motion + AOS for animation

## Structure

- `src/app/` — routes. Each route folder owns its `page.tsx`; dynamic routes (`our-services/[slug]`, `ourteam/[id]`) derive params from `data/services.ts` / `data/team.ts` via `generateStaticParams`
- `src/app/layout.tsx` — root metadata defaults, global `LegalService` JSON-LD, fonts, Navbar/Footer shell
- `src/app/sitemap.ts`, `src/app/robots.ts` — generated from the same `data/` arrays; **any new route or new service/team entry must be reflected here**
- `src/components/` — organized by feature (`sections/`, `navbar/`, `footer/`), not by atomic-design layers
- `data/services.ts`, `data/team.ts` — single source of truth for services and team members; both route content and sitemap read from these, so add new services/team members here first
- `public/` — static images/icons; filenames double as descriptive alt-text sources (e.g. `praveen-bhattarai-advocate.jpg`) — keep that pattern, it helps image SEO

## Conventions

- Path alias `@/*` → `src/*` (see `tsconfig.json`); components import via `@/components/...`, but `data/` is imported with relative paths (`../../data/...`) since it lives outside `src/`
- `"use client"` only where interaction/animation requires it (forms, mobile menu, AOS); route pages default to server components so `generateMetadata` / JSON-LD work
- Each route sets its own `<title>`/`description` via `export const metadata` or `generateMetadata`, using the `%s | Kanooni Astra` template from the root layout — don't hardcode the suffix
- Dynamic detail pages emit page-specific JSON-LD (`Service`, `BreadcrumbList`, etc.) inline via `<script type="application/ld+json">` — follow this pattern for any new content type rather than adding a global schema

## Before committing

- `npm run lint` — ESLint (Next core-web-vitals config)
- `npm run build` — must succeed; this is a statically-generated marketing site, so a broken `generateStaticParams`/`generateMetadata` fails the whole build
- Never commit `.env` changes or real client-provided phone numbers/emails without confirming with the user first

---

## SEO & GEO guidelines

This site's traffic depends entirely on organic search and, increasingly, on being cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude). Apply both traditional SEO and GEO ("Generative Engine Optimization") discipline to every content or routing change.

### Traditional SEO — keep these invariants

1. **Metadata on every route.** New pages must export `metadata` (static) or `generateMetadata` (dynamic) with a unique, descriptive `title` and `description` — never leave a route to inherit the homepage default. Titles should read like `"<Specific Topic> | Kanooni Astra"` (the layout template appends the suffix automatically — don't duplicate it).
2. **Canonical URLs.** Every page sets `alternates: { canonical: "/path" }`, matching the pattern in `our-services/[slug]/page.tsx`.
3. **Sitemap/robots stay in sync.** Any new static route goes into `src/app/sitemap.ts`'s `staticRoutes`; any new dynamic content source (a new `data/*.ts` array) gets its own mapped block, same as `serviceRoutes`/`teamRoutes`.
4. **Structured data (JSON-LD) per content type**, not just globally:
   - Root layout already emits `LegalService` (org-wide NAP: name, address, phone, email, sameAs).
   - Service pages emit `Service` + `BreadcrumbList`.
   - When adding new content types (blog/insights, FAQs, individual attorney bios), add matching schema: `Person`/`Attorney` for team bios, `FAQPage` for any Q&A content, `Article`/`BlogPosting` for legal insights/articles, `BreadcrumbList` on every non-root page.
   - Validate new JSON-LD mentally against schema.org before shipping — a malformed script tag silently fails rich-result eligibility.
5. **Images:** always pass a real `alt` describing subject + context (not just a filename echo), use `next/image` for automatic optimization, and prefer descriptive filenames for new uploads (`<topic>-<location>.ext`) like the existing `public/` assets.
6. **Internal linking:** every new service/insight page should link back to `/our-services` or `/contactus` with descriptive anchor text (not "click here"), matching the existing "Contact Us About This Service" pattern — this spreads link equity and gives crawlers/LLMs a clear site graph.
7. **Heading hierarchy:** one `<h1>` per page (the page title), `<h2>`/`<h3>` for subsections — don't skip levels or reuse `<h1>` in components.
8. **Core Web Vitals:** this site is server-rendered/statically generated on purpose — don't convert pages to `"use client"` unless required, since that hurts LCP/TTI and crawlability.

### GEO — writing content AI engines will cite

AI answer engines extract and cite discrete, well-scoped factual claims rather than "ranking" pages. Optimize copy accordingly:

1. **Answer the question in the first 1–2 sentences of a section**, then elaborate. Lead with the direct fact (e.g., "Kanooni Astra handles FDI approvals through the Department of Industry in Kathmandu" — not a scene-setting intro paragraph first).
2. **Make claims self-contained and quotable.** Avoid pronoun-dependent sentences ("They also do this...") in body copy that describes services — LLMs extract sentences out of context, so each key sentence should name the subject (Kanooni Astra, the specific service, Nepali law area) explicitly.
3. **Use concrete, checkable specifics**: named laws/acts, government bodies, Kathmandu/Nepal jurisdiction, years of experience, named practice areas — generic marketing language ("industry-leading", "best-in-class") gets filtered out by extraction models and adds no citable value.
4. **Structure for extraction:** prefer lists, defined terms, and short paragraphs over long narrative blocks for service descriptions (the `service.description` array pattern in `data/services.ts` is already good — keep list items atomic, one claim per bullet).
5. **FAQ sections are high-value for GEO.** If adding FAQs to a service or practice-area page, pair visible `<h3>` question / answer pairs with `FAQPage` JSON-LD — this is one of the most directly-cited formats by AI answer engines.
6. **E-E-A-T signals matter more for legal content than most verticals.** Attorney bio pages (`ourteam/[id]`) should state credentials, bar admission, years of practice, and specific case/practice-area experience in plain text (not just in an image) — LLMs and search engines can't read credentials off a photo.
7. **Keep NAP (name/address/phone) and firm facts identical everywhere** — root layout JSON-LD, footer, contact page copy, and any new schema. Inconsistent address/phone formatting across the site undermines both local SEO and AI confidence in the entity.
8. **Don't gate factual content behind client-side JS.** Anything you want an LLM crawler or search bot to cite must be present in the server-rendered HTML, not injected after hydration.
9. **Consider a llms.txt** (`public/llms.txt`) if the site grows more content — a plain-text summary of the firm, practice areas, and key pages that AI crawlers increasingly check, analogous to `robots.txt`. Not present yet; ask the user before adding one speculatively.

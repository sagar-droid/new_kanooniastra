import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Slugs that would collide with an existing route and make the page unreachable.
const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "blog",
  "case-studies",
  "ourteam",
  "our-services",
  "testimonials",
  "faq",
  "aboutus",
  "careers",
  "contactus",
  "robots.txt",
  "sitemap.xml",
  "_next",
]);

export const pageInputSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Slug is required")
    .regex(slugPattern, "Slug can only contain lowercase letters, numbers, and hyphens")
    .refine((slug) => !RESERVED_SLUGS.has(slug), {
      message: "That slug is reserved for an existing site route",
    }),
  body: z.string().trim().min(20, "Body content is too short"),
  status: z.enum(["draft", "published"]).default("draft"),
  seo: z
    .object({
      metaTitle: z.string().trim().max(70).optional(),
      metaDescription: z.string().trim().max(160).optional(),
    })
    .optional(),
});

export type PageInput = z.infer<typeof pageInputSchema>;

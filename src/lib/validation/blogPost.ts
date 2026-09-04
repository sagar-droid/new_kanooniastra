import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const imageAssetSchema = z.object({
  url: z.string().min(1, "Image is required"),
  alt: z.string().min(2, "Alt text is required"),
});

export const blogPostInputSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters")
    .regex(slugPattern, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters").max(300),
  body: z.string().trim().min(20, "Body content is too short"),
  coverImage: imageAssetSchema,
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, "Select a valid author"),
  category: z.string().trim().min(2, "Category is required"),
  tags: z.array(z.string().trim().min(1)).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  seo: z
    .object({
      metaTitle: z.string().trim().max(70).optional(),
      metaDescription: z.string().trim().max(160).optional(),
      ogImage: imageAssetSchema.optional(),
    })
    .optional(),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

import { z } from "zod";
import { imageAssetSchema } from "./blogPost";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const caseStudyInputSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters")
    .regex(slugPattern, "Slug can only contain lowercase letters, numbers, and hyphens"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters").max(300),
  body: z.string().trim().min(20, "Body content is too short"),
  clientName: z.string().trim().optional(),
  outcome: z.string().trim().min(3, "Outcome is required"),
  practiceArea: z.string().trim().min(2, "Practice area is required"),
  coverImage: imageAssetSchema,
  status: z.enum(["draft", "published"]).default("draft"),
  seo: z
    .object({
      metaTitle: z.string().trim().max(70).optional(),
      metaDescription: z.string().trim().max(160).optional(),
    })
    .optional(),
});

export type CaseStudyInput = z.infer<typeof caseStudyInputSchema>;

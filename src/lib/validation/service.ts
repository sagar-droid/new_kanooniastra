import { z } from "zod";
import { imageAssetSchema } from "./blogPost";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const serviceInputSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Slug is required")
    .regex(slugPattern, "Slug can only contain lowercase letters, numbers, and hyphens"),
  intro: z.string().trim().min(10, "Intro must be at least 10 characters"),
  description: z.array(z.string().trim().min(1)).default([]),
  image: imageAssetSchema,
  displayOrder: z.number().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export type ServiceInput = z.infer<typeof serviceInputSchema>;

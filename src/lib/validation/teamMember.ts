import { z } from "zod";
import { imageAssetSchema } from "./blogPost";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const optionalUrl = z.string().trim().url().optional().or(z.literal(""));

export const teamMemberInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Slug is required")
    .regex(slugPattern, "Slug can only contain lowercase letters, numbers, and hyphens"),
  designation: z.string().trim().min(2, "Designation is required"),
  photo: imageAssetSchema,
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  qualifications: z.array(z.string().trim().min(1)).default([]),
  practiceAreas: z.array(z.string().trim().min(1)).default([]),
  officeLocation: z.string().trim().optional(),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  socialLinks: z
    .object({
      facebook: optionalUrl,
      linkedin: optionalUrl,
      instagram: optionalUrl,
      twitter: optionalUrl,
    })
    .optional(),
  displayOrder: z.number().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;

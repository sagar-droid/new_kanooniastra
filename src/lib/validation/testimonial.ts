import { z } from "zod";
import { imageAssetSchema } from "./blogPost";

export const testimonialInputSchema = z.object({
  clientName: z.string().trim().min(1).default("Anonymous"),
  quote: z.string().trim().min(10, "Quote must be at least 10 characters"),
  rating: z.number().min(1).max(5).optional(),
  relatedCaseStudy: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional()
    .or(z.literal("")),
  photo: imageAssetSchema.optional(),
  status: z.enum(["approved", "pending"]).default("pending"),
});

export type TestimonialInput = z.infer<typeof testimonialInputSchema>;

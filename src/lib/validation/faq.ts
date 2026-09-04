import { z } from "zod";

export const faqInputSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  answer: z.string().trim().min(5, "Answer must be at least 5 characters"),
  category: z.string().trim().optional(),
  displayOrder: z.number().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export type FAQInput = z.infer<typeof faqInputSchema>;

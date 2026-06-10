import { z } from "astro/zod";

export const SectionSchema = z.object({
  title: z.string(),
  content: z.object(),
});

export type SectionProps = z.infer<typeof SectionSchema>;

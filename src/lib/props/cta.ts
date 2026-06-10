import { z } from "astro/zod";

export const CTASchema = z.object({
  title: z.string(),
  text: z.string(),
  buttonText: z.string(),
  href: z.string(),
});

export type CTAProps = z.infer<typeof CTASchema>;

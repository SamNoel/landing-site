import { z } from "astro/zod";

export const HeroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export type HeroProps = z.infer<typeof HeroSchema>;

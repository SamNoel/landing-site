import { z } from "astro/zod";

export const CardSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export type CardProps = z.infer<typeof CardSchema>;

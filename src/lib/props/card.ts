import { z } from "astro/zod";

export const CardSchema = z.object({
  title: z.string(),
  text: z.string(),
  imageName: z.string().transform((str) => `"/src/assets/"${str}`),
});

export type CardProps = z.infer<typeof CardSchema>;

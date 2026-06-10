import { z } from "astro/zod";

export const GridSchema = z.object({
  columns: z.number(),
  gap: z.number(),
});

export type GridProps = z.infer<typeof GridSchema>;

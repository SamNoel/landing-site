import { z } from "astro/zod";
import { CardSchema } from "./card";

export const FeatureGridSchema = z.object({
  items: z.array(CardSchema),
});

export type FeatureGridProps = z.infer<typeof FeatureGridSchema>;

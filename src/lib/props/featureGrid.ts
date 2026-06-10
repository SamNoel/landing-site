import { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";

export const FeatureGridSchema = z.object({
  // services: CollectionEntry<"services">,
});

export type FeatureGridProps = z.infer<typeof FeatureGridSchema>;

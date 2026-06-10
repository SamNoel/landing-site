import { z } from "astro/zod";

// This is the actual schema for the content files themselves
export const MarkdownSchema = z.object({
  title: z.string(),
});

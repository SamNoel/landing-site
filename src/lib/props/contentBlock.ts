import { z } from "astro/zod";

// This schema is used for validating the props passed to the ContentBlock component
export const ContentBlockComponentSchema = z.object({
  direction: z.enum(["column", "row"]).default("column"),
  gap: z.enum(["xs", "sm", "md", "lg"]).default("md"),
  blockHorizontalAlign: z.enum(["left", "center", "right"]).default("left"),
  blockVerticalAlign: z.enum(["top", "center", "bottom"]).default("top"),

  titleAlign: z.enum(["left", "center", "right"]).default("left"),

  contentAlign: z.enum(["left", "center", "right"]).default("left"),

  maxWidth: z.enum(["small", "normal", "wide", "full"]).default("normal"),

  titleSize: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h2"),

  contentSize: z.enum(["sm", "md", "lg"]).default("md"),

  contentFileName: z.enum(["about"]).default("about"),
});

export type ContentBlockProps = z.infer<typeof ContentBlockComponentSchema>;

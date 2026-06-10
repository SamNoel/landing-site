import { z } from "astro/zod";

// This schema is used for validating the props passed to the ContentBlock component
export const StackSchema = z.object({
  direction: z.enum(["column", "row"]).default("column"),
  gap: z.enum(["xs", "sm", "md", "lg"]).default("md"),
  horizontalAlign: z.enum(["left", "center", "right"]).default("left"),
  verticalAlign: z.enum(["top", "center", "bottom"]).default("top"),
});

export type StackProps = z.infer<typeof StackSchema>;

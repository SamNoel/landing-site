import { z } from "astro/zod";

export const ButtonSchema = z.object({
  href: z.string(),
  label: z.string(),
  variant: z.enum(["primary", "secondary"]),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

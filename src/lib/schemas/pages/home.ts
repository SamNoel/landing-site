import { z } from "astro/zod";
import { HeroSchema } from "../components/hero";
import { CTASchema } from "../components/cta";
import { CardSchema } from "../components/card";
import { SectionSchema } from "../components/section";

export const HomeSchema = z.object({
  hero: HeroSchema,
  services: SectionSchema,
  cta: CTASchema,
});

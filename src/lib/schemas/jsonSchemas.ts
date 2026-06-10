import { z } from "astro/zod";

export const ReviewsSchema = z.array(
  z.object({
    name: z.string(),
    review: z.string(),
    order: z.number(),
  }),
);

export const LocationsSchema = z.array(
  z.object({
    name: z.string(),
    hours: z.string(),
    address: z.string(),
    phone: z.string(),
    locationNumber: z.number(),
  }),
);

export const ServicesSchema = z.array(
  z.object({
    title: z.string(),
    text: z.string(),
    imageName: z.string(),
  }),
);

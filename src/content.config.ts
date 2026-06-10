import { defineCollection } from "astro:content";
import { HomeSchema } from "./lib/schemas/pages/home";
// import { AboutSchema } from "./lib/schemas/pages/about";

const home = defineCollection({
  type: "data",
  schema: HomeSchema,
});

// const about = defineCollection({
//   type: "data",
//   schema: AboutSchema
// });

export const collections = {
  home,
};

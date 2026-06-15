import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  ServicesSchema,
  ReviewsSchema,
  LocationsSchema,
} from "@schemas/jsonSchemas";
import { MarkdownSchema } from "@schemas/markdownSchemas";

/**
 * This file defines the content collections for the site, which are used to load and validate content data from markdown and JSON files.
 * Each collection is associated with a specific schema that defines the structure of the data, ensuring that the content is consistent and correctly typed throughout the site.
 */

// The collection for any ContentBlock data, which is loaded from markdown files and validated against the Schema
const homepageContent = defineCollection({
  loader: glob({ base: "src/content/pages/home", pattern: "*.md" }),
  schema: MarkdownSchema,
});

const reviews = defineCollection({
  loader: glob({ base: "src/content/data", pattern: "reviews.json" }),
  schema: ReviewsSchema,
});

const locations = defineCollection({
  loader: glob({ base: "src/content/data", pattern: "locations.json" }),
  schema: LocationsSchema,
});

// The collection for services data, which is loaded from a JSON file and validated against the Schema
const services = defineCollection({
  loader: glob({ base: "src/content/data", pattern: "services.json" }),
  schema: ServicesSchema,
});

export const collections = {
  homepageContent,
  services,
  reviews,
  locations,
};

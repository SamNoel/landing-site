import { getCollection } from "astro:content";

export async function getReviews() {
  const reviews = await getCollection("reviews");

  // If the content file is not found, throw an error
  if (!reviews) {
    throw new Error("Content file not found");
  }

  return reviews[0].data.map((review) => ({
    name: review.name,
    review: review.review,
    order: review.order,
  }));
}

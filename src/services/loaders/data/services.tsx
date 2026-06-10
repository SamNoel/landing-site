import { getCollection } from "astro:content";

export async function getServices() {
  const services = await getCollection("services");

  // If the content file is not found, throw an error
  if (!services) {
    throw new Error("Content file not found");
  }

  return services[0].data.map((service) => ({
    title: service.title,
    text: service.text,
    imageName: service.imageName,
  }));
}

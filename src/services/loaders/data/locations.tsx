import { getCollection } from "astro:content";

export async function getLocations() {
  const locations = await getCollection("locations");

  // If the content file is not found, throw an error
  if (!locations) {
    throw new Error("Content file not found");
  }

  return locations[0].data
    .sort((a, b) => a.locationNumber - b.locationNumber)
    .map((location) => ({
      name: location.name,
      hours: location.hours,
      address: location.address,
      phone: location.phone,
      locationNumber: location.locationNumber,
    }));
}

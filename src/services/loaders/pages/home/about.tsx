import { getEntry, render } from "astro:content";

export async function getAbout() {
  // Get the content from the content file based on the contentBlockName prop
  const contentEntry = await getEntry("homepageContent", "about");

  // If the content file is not found, throw an error
  if (!contentEntry) {
    throw new Error("Content file not found");
  }

  // Render the content from the md file to get HTML output
  const { Content } = await render(contentEntry);

  return {
    title: contentEntry.data.title,
    Content,
  };
}

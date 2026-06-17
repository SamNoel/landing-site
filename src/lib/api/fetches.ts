import { routes } from "./routes";
import type { ContactFormData } from "./structures";

export const postContact = async (data: ContactFormData) => {
  await fetch(routes.contact, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

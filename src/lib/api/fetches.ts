import { routes } from "@api/routes";
import type { ContactFormData } from "@api/structures";

export interface ContactResult {
  ok: boolean;
  error?: string;
}

export const postContact = async (
  data: ContactFormData,
): Promise<ContactResult> => {
  let response: Response;

  try {
    response = await fetch(routes.contact, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }

  let json: ContactResult;
  try {
    json = await response.json();
  } catch {
    return {
      ok: false,
      error: "Unexpected server response. Please try again later.",
    };
  }

  return json;
};

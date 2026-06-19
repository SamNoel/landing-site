import { handleContact } from "@api/contact";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/functions/contact") {
      return handleContact(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  TURNSTILE_SECRET_KEY: string;
}

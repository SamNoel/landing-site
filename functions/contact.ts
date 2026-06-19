import type { EventContext } from "@cloudflare/workers-types";
import type { ContactFormData } from "@api/structures";

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ApiResult {
  ok: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 },
  message: { min: 10, max: 5000 },
};

async function verifyTurnstile(
  token: string,
  secretKey: string,
  ip: string,
): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    },
  );

  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

function validate(
  data: unknown,
): { valid: true; parsed: ContactFormData } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const { name, email, message, turnstileToken } = data as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < LIMITS.name.min) {
    return { valid: false, error: "Name is required." };
  }
  if (name.trim().length > LIMITS.name.max) {
    return {
      valid: false,
      error: `Name must be ${LIMITS.name.max} characters or fewer.`,
    };
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: "A valid email address is required." };
  }
  if (email.trim().length > LIMITS.email.max) {
    return { valid: false, error: "Email address is too long." };
  }

  if (
    typeof message !== "string" ||
    message.trim().length < LIMITS.message.min
  ) {
    return {
      valid: false,
      error: `Message must be at least ${LIMITS.message.min} characters.`,
    };
  }
  if (message.trim().length > LIMITS.message.max) {
    return {
      valid: false,
      error: `Message must be ${LIMITS.message.max} characters or fewer.`,
    };
  }

  if (typeof turnstileToken !== "string" || !turnstileToken) {
    return { valid: false, error: "Security check token is missing." };
  }

  return {
    valid: true,
    parsed: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      turnstileToken,
    },
  };
}

function buildEmailHtml(data: ContactFormData): string {
  return `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${data.message}</p>
  `.trim();
}

function buildEmailText(data: ContactFormData): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { env, request } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": new URL(request.url).origin,
    "Content-Type": "application/json",
  };

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Invalid JSON in request body.",
      } satisfies ApiResult),
      { status: 400, headers: corsHeaders },
    );
  }

  // Honeypot check — field must be absent or empty
  const maybeHoneypot = (body as Record<string, unknown>)?.website;
  if (maybeHoneypot) {
    // Silently accept so bots don't know they were caught
    return new Response(JSON.stringify({ ok: true } satisfies ApiResult), {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Validate fields + presence of Turnstile token
  const result = validate(body);
  if (!result.valid) {
    return new Response(
      JSON.stringify({ ok: false, error: result.error } satisfies ApiResult),
      { status: 422, headers: corsHeaders },
    );
  }

  const { parsed } = result;

  // Verify Turnstile token with Cloudflare
  const clientIp = request.headers.get("CF-Connecting-IP") ?? "";
  const turnstileValid = await verifyTurnstile(
    parsed.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    clientIp,
  );

  if (!turnstileValid) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Security check failed. Please try again.",
      } satisfies ApiResult),
      { status: 403, headers: corsHeaders },
    );
  }

  // Send via Resend
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM,
      to: [env.CONTACT_EMAIL_TO],
      reply_to: parsed.email,
      subject: `New contact form message from ${parsed.name}`,
      html: buildEmailHtml(parsed),
      text: buildEmailText(parsed),
    }),
  });

  if (!resendResponse.ok) {
    console.error(
      "Resend error:",
      resendResponse.status,
      await resendResponse.text(),
    );
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Failed to send message. Please try again later.",
      } satisfies ApiResult),
      { status: 502, headers: corsHeaders },
    );
  }

  return new Response(JSON.stringify({ ok: true } satisfies ApiResult), {
    status: 200,
    headers: corsHeaders,
  });
};

// Reject all other HTTP methods
export const onRequest = async (): Promise<Response> => {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Method not allowed.",
    } satisfies ApiResult),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    },
  );
};

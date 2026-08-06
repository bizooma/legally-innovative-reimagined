// Canonical Cloudflare Turnstile server-side verification.
// Secret is read from the TURNSTILE_SECRET environment variable.

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  success: boolean;
  errorCodes?: string[];
}

export const getClientIp = (req: Request): string | undefined =>
  req.headers.get("CF-Connecting-IP") ??
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
  undefined;

export async function verifyTurnstile(
  token: string | undefined | null,
  remoteip?: string,
): Promise<TurnstileResult> {
  const secret = Deno.env.get("TURNSTILE_SECRET");
  if (!secret) {
    console.error("TURNSTILE_SECRET is not configured");
    return { success: false, errorCodes: ["missing-input-secret"] };
  }
  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body: Record<string, string> = { secret, response: token };
  if (remoteip) body.remoteip = remoteip;

  const res = await fetch(SITEVERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const outcome = await res.json();
  if (outcome.success === true) return { success: true };

  console.warn("Turnstile verification failed:", outcome["error-codes"]);
  return { success: false, errorCodes: outcome["error-codes"] ?? [] };
}

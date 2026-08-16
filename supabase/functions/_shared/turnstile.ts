// Canonical Cloudflare Turnstile server-side verification.
// Secret is read from TURNSTILE_SECRET_KEY (falls back to TURNSTILE_SECRET).

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_ACTION = "turnstile-spin-v2";

const DEFAULT_HOSTNAMES = [
  "bizooma.com",
  "www.bizooma.com",
  "legally-innovative-reimagined.lovable.app",
  "legallyinnovative.com",
  "www.legallyinnovative.com",
  "localhost",
  "127.0.0.1",
];

const expectedHostnames = (): Set<string> => {
  const configured = (Deno.env.get("TURNSTILE_HOSTNAMES") ?? "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  const list = configured.length ? configured : DEFAULT_HOSTNAMES;
  return new Set(list.map((h) => h.toLowerCase()));
};

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
  expectedAction: string = TURNSTILE_ACTION,
): Promise<TurnstileResult> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY") ?? Deno.env.get("TURNSTILE_SECRET");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return { success: false, errorCodes: ["missing-input-secret"] };
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set("remoteip", remoteip);

  let outcome: Record<string, unknown>;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!res.ok) throw new Error(`siteverify HTTP ${res.status}`);
    outcome = await res.json();
  } catch (err) {
    console.error("Turnstile siteverify request failed:", (err as Error).message);
    return { success: false, errorCodes: ["internal-error"] };
  }

  if (outcome.success !== true) {
    console.warn("Turnstile verification failed:", outcome["error-codes"]);
    return { success: false, errorCodes: (outcome["error-codes"] as string[]) ?? [] };
  }

  if (expectedAction && outcome.action && outcome.action !== expectedAction) {
    console.warn("Turnstile action mismatch:", outcome.action);
    return { success: false, errorCodes: ["action-mismatch"] };
  }

  const hostname = String(outcome.hostname ?? "").toLowerCase();
  if (hostname && !expectedHostnames().has(hostname)) {
    console.warn("Turnstile hostname not allowed:", hostname);
    return { success: false, errorCodes: ["hostname-mismatch"] };
  }

  return { success: true };
}

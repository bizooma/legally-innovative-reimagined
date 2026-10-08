import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Only the live site may call this function.
const ALLOWED_ORIGINS = ["https://bizooma.com", "https://www.bizooma.com"];
const SITE_ORIGIN = "https://bizooma.com";

function cors(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : SITE_ORIGIN,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  const headers = { ...cors(req), "Content-Type": "application/json" };
  const reply = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), { status, headers });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Who is calling? (identity comes only from the JWT, never the body)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return reply(401, { error: "Unauthorized" });
    const caller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: who, error: whoErr } = await caller.auth.getUser();
    if (whoErr || !who.user) return reply(401, { error: "Unauthorized" });

    // 2. Is the caller an admin? Service role used only for this read until the check passes.
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data: me, error: meErr } = await admin.from("users").select("is_admin").eq("id", who.user.id).maybeSingle();
    if (meErr) return reply(500, { error: "Could not verify your permissions" });
    if (me?.is_admin !== true) return reply(403, { error: "Only admins can invite users" });

    // 3. Validate input
    let body: any;
    try { body = await req.json(); } catch { return reply(400, { error: "Request body must be JSON" }); }
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const clientId = typeof body?.client_id === "string" ? body.client_id.trim() : "";
    if (!email || !clientId) return reply(400, { error: "email and client_id are required" });
    if (!EMAIL_RE.test(email) || email.length > 254) return reply(400, { error: "That doesn't look like an email address" });
    if (!UUID_RE.test(clientId)) return reply(400, { error: "client_id is not valid" });

    // 4. Client must exist
    const { data: client, error: clientErr } = await admin.from("clients").select("id").eq("id", clientId).maybeSingle();
    if (clientErr) return reply(500, { error: "Could not look up the client" });
    if (!client) return reply(404, { error: "Client not found" });

    // 5. No existing account with this email (auth users and public.users)
    const { data: existingRow } = await admin.from("users").select("id").ilike("email", email).maybeSingle();
    if (existingRow) return reply(409, { error: "An account already exists for that address" });
    for (let page = 1; page < 50; page++) {
      const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (listErr) return reply(500, { error: "Could not check existing accounts" });
      if (list.users.some((u) => (u.email ?? "").toLowerCase() === email)) {
        return reply(409, { error: "An account already exists for that address" });
      }
      if (list.users.length < 1000) break;
    }

    // 6. Send the invite — the recipient chooses their own password
    const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${SITE_ORIGIN}/portal/reset-password`,
    });
    if (inviteErr || !invited?.user) {
      const status = /already|registered|exists/i.test(inviteErr?.message ?? "") ? 409 : 502;
      return reply(status, {
        error: status === 409 ? "An account already exists for that address" : `The invitation could not be sent: ${inviteErr?.message ?? "unknown error"}`,
      });
    }
    const newId = invited.user.id;

    // 7. Link the new user to the client (never set is_admin = true)
    const link = () =>
      admin.from("users").update({ client_id: clientId, is_admin: false }).eq("id", newId).select("id");
    let { data: linked, error: linkErr } = await link();
    if (!linkErr && (!linked || linked.length === 0)) {
      await new Promise((r) => setTimeout(r, 750));
      ({ data: linked, error: linkErr } = await link());
    }
    if (!linkErr && (!linked || linked.length === 0)) {
      const ins = await admin.from("users")
        .insert({ id: newId, email, full_name: email, is_admin: false, client_id: clientId })
        .select("id");
      linked = ins.data; linkErr = ins.error;
    }
    if (linkErr || !linked || linked.length !== 1) {
      return reply(500, {
        error: "The invitation was sent, but linking the account to the client failed. Use Link to client on the Users screen to finish.",
        invite_sent: true,
      });
    }

    return reply(200, { success: true });
  } catch {
    return reply(500, { error: "Something went wrong. Nothing was sent." });
  }
});

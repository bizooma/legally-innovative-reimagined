import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "org";
}

async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }
  const body: Record<string, string> = { secret, response: token };
  if (remoteip) body.remoteip = remoteip;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const outcome = await res.json();
  if (outcome.success !== true) {
    console.warn("Turnstile verification failed:", outcome["error-codes"]);
    return false;
  }
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { email, password, orgName, turnstileToken } = await req.json();
    if (!email || !password || !orgName) {
      return new Response(JSON.stringify({ error: "email, password, orgName required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (String(password).length < 8) {
      return new Response(JSON.stringify({ error: "Password must be at least 8 characters" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const remoteip = req.headers.get("CF-Connecting-IP") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? undefined;
    if (!turnstileToken || typeof turnstileToken !== "string" || !(await verifyTurnstile(turnstileToken, remoteip))) {
      return new Response(JSON.stringify({ error: "Captcha verification failed" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

    // Create auto-confirmed user (no confirmation email)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: orgName },
    });
    if (createErr || !created.user) {
      return new Response(JSON.stringify({ error: createErr?.message ?? "Could not create user" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = created.user.id;

    // Unique slug
    let baseSlug = slugify(orgName);
    let slug = baseSlug;
    for (let i = 0; i < 5; i++) {
      const { data: existing } = await admin.from("acc_organizations").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    const { data: org, error: orgErr } = await admin
      .from("acc_organizations")
      .insert({ name: orgName, slug, created_by: userId, plan: "starter" })
      .select("id, slug, name")
      .single();
    if (orgErr || !org) {
      return new Response(JSON.stringify({ error: orgErr?.message ?? "Could not create organization" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { error: memberErr } = await admin
      .from("acc_organization_members")
      .insert({ organization_id: org.id, user_id: userId, role: "owner" });
    if (memberErr) {
      return new Response(JSON.stringify({ error: memberErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: true, userId, organization: org }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
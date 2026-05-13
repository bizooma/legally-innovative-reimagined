import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "org";
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization") ?? "";
    const token = auth.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Missing Authorization" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is an admin
    const callerClient = createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    });
    const { data: userData, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Invalid auth" }, 401);

    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data: profile, error: profErr } = await admin
      .from("users")
      .select("is_admin")
      .eq("id", userData.user.id)
      .maybeSingle();
    if (profErr) return json({ error: profErr.message }, 500);
    if (!profile?.is_admin) return json({ error: "Admin only" }, 403);

    const { email, password, orgName } = await req.json();
    if (!email || !orgName) return json({ error: "email and orgName required" }, 400);

    // Find existing user or create
    let userId: string | null = null;
    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) return json({ error: listErr.message }, 500);
    const found = list.users.find((u) => u.email?.toLowerCase() === String(email).toLowerCase());
    if (found) {
      userId = found.id;
    } else {
      if (!password || String(password).length < 8) {
        return json({ error: "password (>=8 chars) required to create new user" }, 400);
      }
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: orgName },
      });
      if (createErr || !created.user) return json({ error: createErr?.message ?? "Could not create user" }, 400);
      userId = created.user.id;
    }

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
      .insert({ name: orgName, slug, created_by: userId, plan: "starter", subscription_status: "active" })
      .select("id, slug, name")
      .single();
    if (orgErr || !org) return json({ error: orgErr?.message ?? "Could not create org" }, 500);

    const { error: memberErr } = await admin
      .from("acc_organization_members")
      .insert({ organization_id: org.id, user_id: userId, role: "owner" });
    if (memberErr) return json({ error: memberErr.message }, 500);

    return json({ ok: true, userId, organization: org });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } });
    const admin = createClient(SUPABASE_URL, SRK);

    const { data: u } = await userClient.auth.getUser();
    if (!u?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json().catch(() => ({}));
    const websiteId = body.website_id as string | undefined;
    if (!websiteId) return new Response(JSON.stringify({ error: "website_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: site } = await userClient.from("acc_websites").select("id, url, name, organization_id").eq("id", websiteId).maybeSingle();
    if (!site) return new Response(JSON.stringify({ error: "Website not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: issues } = await userClient
      .from("acc_accessibility_issues")
      .select("rule_id, title, severity, wcag_reference")
      .eq("website_id", websiteId)
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(50);

    const summary = (issues ?? []).map((i: any) => `- [${i.severity}] ${i.title} (${i.wcag_reference ?? "n/a"})`).join("\n") || "No open issues recorded yet.";

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an accessibility expert. Generate prioritized, actionable recommendations." },
          { role: "user", content: `Website: ${site.name} (${site.url})\nOpen issues:\n${summary}\n\nReturn 4-6 recommendations.` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "save_recommendations",
            description: "Save accessibility recommendations.",
            parameters: {
              type: "object",
              properties: {
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      message: { type: "string" },
                      category: { type: "string", enum: ["quick-win", "recurring", "high-impact", "compliance"] },
                      priority: { type: "string", enum: ["critical", "high", "medium", "low"] },
                      estimated_impact: { type: "string" },
                    },
                    required: ["title", "message", "category", "priority", "estimated_impact"],
                  },
                },
              },
              required: ["recommendations"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "save_recommendations" } },
      }),
    });

    if (!aiResp.ok) {
      if (aiResp.status === 429) return new Response(JSON.stringify({ error: "Rate limit, try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiResp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Workspace Usage." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await aiResp.text();
      throw new Error(`AI gateway: ${aiResp.status} ${t}`);
    }
    const j = await aiResp.json();
    const args = j.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = args ? JSON.parse(args) : { recommendations: [] };
    const recs = (parsed.recommendations ?? []).slice(0, 6);

    const sevMap = (p: string) => (p === "high" ? "serious" : p === "critical" ? "critical" : p === "medium" ? "moderate" : "minor");
    if (recs.length) {
      const rows = recs.map((r: any) => ({
        organization_id: site.organization_id,
        website_id: site.id,
        title: r.title,
        message: r.message,
        category: r.category,
        priority: sevMap(r.priority),
        estimated_impact: r.estimated_impact,
      }));
      await admin.from("acc_ai_recommendations").insert(rows);
    }

    return new Response(JSON.stringify({ count: recs.length, recommendations: recs }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("ai-recs error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
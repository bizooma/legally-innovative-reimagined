import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are a senior web accessibility engineer (WCAG 2.2 / WAI-ARIA expert).
You will receive ONE accessibility issue detected on a real web page. Your job is to write a concrete, copy-pasteable fix.

Rules:
- Be specific to the offending HTML snippet provided. Do not give generic advice.
- Output Markdown with exactly these sections, in this order:
  ## Why this fails
  (1-2 short sentences citing the WCAG criterion in plain English.)
  ## Corrected HTML
  \`\`\`html
  <!-- the fixed snippet, preserving the developer's tags/attributes where possible -->
  \`\`\`
  ## How to apply
  (Bulleted, 2-4 steps a developer can follow.)
  ## Caveats
  (Optional: 1-2 lines on edge cases — alt text wording, dynamic content, focus management. Skip if none.)
- Never invent attributes that don't exist in the actual snippet (e.g. don't fabricate ids).
- Keep total response under 350 words.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } });
    const admin = createClient(SUPABASE_URL, SRK);

    const { data: u } = await userClient.auth.getUser();
    if (!u?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json().catch(() => ({}));
    const issueId = String(body.issue_id || "").trim();
    const force = !!body.force;
    if (!issueId) return new Response(JSON.stringify({ error: "issue_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // RLS-checked fetch (org members only)
    const { data: issue, error: issueErr } = await userClient
      .from("acc_accessibility_issues")
      .select("id, organization_id, rule_id, title, description, severity, wcag_reference, element_html, suggested_fix, page_url, ai_fix, ai_fix_generated_at")
      .eq("id", issueId).maybeSingle();
    if (issueErr || !issue) return new Response(JSON.stringify({ error: "Issue not found or no access" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Cache: don't re-bill unless ?force
    if (issue.ai_fix && !force) {
      return new Response(JSON.stringify({ ai_fix: issue.ai_fix, ai_fix_generated_at: issue.ai_fix_generated_at, cached: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const userPrompt = [
      `Rule: ${issue.rule_id}`,
      `Title: ${issue.title}`,
      issue.wcag_reference ? `WCAG: ${issue.wcag_reference}` : null,
      `Severity: ${issue.severity}`,
      issue.description ? `Description: ${issue.description}` : null,
      issue.suggested_fix ? `Generic suggestion: ${issue.suggested_fix}` : null,
      `Page URL: ${issue.page_url}`,
      issue.element_html ? `Offending HTML:\n\`\`\`html\n${issue.element_html}\n\`\`\`` : `(No element snippet was captured for this issue — base your fix on the rule and page context.)`,
    ].filter(Boolean).join("\n");

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (aiResp.status === 429) return new Response(JSON.stringify({ error: "Rate limit hit. Try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (aiResp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable Cloud workspace settings." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const json = await aiResp.json();
    const aiFix: string = json?.choices?.[0]?.message?.content?.trim() || "";
    if (!aiFix) return new Response(JSON.stringify({ error: "Empty AI response" }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const generatedAt = new Date().toISOString();
    await admin
      .from("acc_accessibility_issues")
      .update({ ai_fix: aiFix, ai_fix_generated_at: generatedAt })
      .eq("id", issue.id);

    return new Response(JSON.stringify({ ai_fix: aiFix, ai_fix_generated_at: generatedAt, cached: false }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("acc-issue-ai-fix error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
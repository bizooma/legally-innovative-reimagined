import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Issue = {
  rule_id: string;
  title: string;
  description?: string;
  severity: "critical" | "serious" | "moderate" | "minor" | "low" | "medium" | "high";
  wcag_reference?: string;
  element_html?: string;
  suggested_fix?: string;
  page_url: string;
};

function analyze(html: string, pageUrl: string): Issue[] {
  const issues: Issue[] = [];
  const sevMap = (s: string) => (["critical", "serious", "moderate", "minor"].includes(s) ? s : "medium") as Issue["severity"];

  // 1. <html lang="...">
  if (!/<html[^>]*\blang\s*=/i.test(html)) {
    issues.push({
      rule_id: "html-has-lang",
      title: "Missing <html lang> attribute",
      description: "The root <html> element should declare the page language.",
      severity: sevMap("serious"),
      wcag_reference: "WCAG 3.1.1",
      suggested_fix: 'Add lang="en" (or correct locale) to your <html> tag.',
      page_url: pageUrl,
    });
  }

  // 2. <title>
  if (!/<title>[\s\S]*?<\/title>/i.test(html) || /<title>\s*<\/title>/i.test(html)) {
    issues.push({
      rule_id: "document-title",
      title: "Missing or empty <title>",
      severity: sevMap("serious"),
      wcag_reference: "WCAG 2.4.2",
      suggested_fix: "Add a descriptive <title> in the document head.",
      page_url: pageUrl,
    });
  }

  // 3. images without alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  imgs.forEach((m) => {
    const tag = m[0];
    if (!/\balt\s*=/i.test(tag)) {
      issues.push({
        rule_id: "image-alt",
        title: "Image missing alt attribute",
        description: "Images must have alternative text.",
        severity: sevMap("critical"),
        wcag_reference: "WCAG 1.1.1",
        element_html: tag.slice(0, 200),
        suggested_fix: 'Add a meaningful alt="..." (or alt="" for purely decorative images).',
        page_url: pageUrl,
      });
    }
  });

  // 4. inputs without label/aria-label
  const inputs = [...html.matchAll(/<input\b[^>]*>/gi)];
  inputs.forEach((m) => {
    const tag = m[0];
    const typeMatch = tag.match(/type\s*=\s*["']?([a-zA-Z]+)/i);
    const t = typeMatch?.[1]?.toLowerCase();
    if (t === "hidden" || t === "submit" || t === "button") return;
    const id = tag.match(/id\s*=\s*["']([^"']+)["']/i)?.[1];
    const hasAria = /aria-label\s*=/i.test(tag) || /aria-labelledby\s*=/i.test(tag);
    const hasLabel = id && new RegExp(`<label[^>]*for\\s*=\\s*["']${id}["']`, "i").test(html);
    if (!hasAria && !hasLabel) {
      issues.push({
        rule_id: "label",
        title: "Form input missing accessible label",
        severity: sevMap("serious"),
        wcag_reference: "WCAG 1.3.1, 4.1.2",
        element_html: tag.slice(0, 200),
        suggested_fix: "Associate a <label for> or add aria-label / aria-labelledby.",
        page_url: pageUrl,
      });
    }
  });

  // 5. buttons / links with no text
  const links = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  links.forEach((m) => {
    const inner = m[1].replace(/<[^>]+>/g, "").trim();
    if (!inner && !/aria-label\s*=/i.test(m[0])) {
      issues.push({
        rule_id: "link-name",
        title: "Link without discernible text",
        severity: sevMap("serious"),
        wcag_reference: "WCAG 2.4.4, 4.1.2",
        element_html: m[0].slice(0, 200),
        suggested_fix: "Add visible text or aria-label to the link.",
        page_url: pageUrl,
      });
    }
  });

  // 6. heading order — at most one h1
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count === 0) {
    issues.push({
      rule_id: "page-has-heading-one",
      title: "Page is missing an <h1>",
      severity: sevMap("moderate"),
      wcag_reference: "WCAG 2.4.6",
      suggested_fix: "Include exactly one <h1> describing the main page topic.",
      page_url: pageUrl,
    });
  } else if (h1Count > 1) {
    issues.push({
      rule_id: "page-has-heading-one",
      title: "Page has multiple <h1> headings",
      severity: sevMap("minor"),
      wcag_reference: "WCAG 2.4.6",
      suggested_fix: "Use a single <h1> per page and structure the rest with <h2>–<h6>.",
      page_url: pageUrl,
    });
  }

  // 7. viewport meta
  if (!/<meta[^>]+name\s*=\s*["']viewport["']/i.test(html)) {
    issues.push({
      rule_id: "meta-viewport",
      title: "Missing viewport meta tag",
      severity: sevMap("moderate"),
      wcag_reference: "WCAG 1.4.10",
      suggested_fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      page_url: pageUrl,
    });
  }

  // 8. skip link / main landmark
  if (!/<main\b/i.test(html) && !/role\s*=\s*["']main["']/i.test(html)) {
    issues.push({
      rule_id: "landmark-one-main",
      title: "Page missing a <main> landmark",
      severity: sevMap("moderate"),
      wcag_reference: "WCAG 1.3.1",
      suggested_fix: "Wrap the primary content in a <main> element.",
      page_url: pageUrl,
    });
  }

  return issues;
}

function score(issues: Issue[]): number {
  let s = 100;
  for (const i of issues) {
    s -= i.severity === "critical" ? 8 : i.severity === "serious" ? 5 : i.severity === "moderate" ? 3 : 1;
  }
  return Math.max(0, Math.min(100, s));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } });
    const admin = createClient(SUPABASE_URL, SRK);

    const { data: u } = await userClient.auth.getUser();
    if (!u?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json().catch(() => ({}));
    const websiteId = body.website_id as string | undefined;
    if (!websiteId) return new Response(JSON.stringify({ error: "website_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Membership-checked fetch via user client (RLS)
    const { data: site, error: siteErr } = await userClient
      .from("acc_websites").select("id, url, organization_id").eq("id", websiteId).maybeSingle();
    if (siteErr || !site) return new Response(JSON.stringify({ error: "Website not found or no access" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Create scan
    const { data: scan, error: scanErr } = await admin
      .from("acc_scans")
      .insert({ website_id: site.id, organization_id: site.organization_id, status: "running", triggered_by: u.user.id, started_at: new Date().toISOString() })
      .select().single();
    if (scanErr) throw scanErr;

    // Fetch HTML
    let html = "";
    let pageScore = 0;
    let issues: Issue[] = [];
    try {
      const r = await fetch(site.url, { headers: { "User-Agent": "BizoomaAccessibilityBot/1.0" } });
      html = await r.text();
      issues = analyze(html, site.url);
      pageScore = score(issues);
    } catch (e) {
      issues = [{ rule_id: "fetch-failed", title: "Could not fetch page", severity: "critical", page_url: site.url, description: String(e) }];
      pageScore = 0;
    }

    // Insert scan page
    await admin.from("acc_scan_pages").insert({ scan_id: scan.id, url: site.url, score: pageScore, issue_count: issues.length });

    if (issues.length) {
      const rows = issues.map((i) => ({
        scan_id: scan.id,
        organization_id: site.organization_id,
        website_id: site.id,
        rule_id: i.rule_id,
        page_url: i.page_url,
        title: i.title,
        description: i.description ?? null,
        severity: i.severity,
        wcag_reference: i.wcag_reference ?? null,
        element_html: i.element_html ?? null,
        suggested_fix: i.suggested_fix ?? null,
        status: "open",
      }));
      await admin.from("acc_accessibility_issues").insert(rows);
    }

    const wcagAa = Math.max(0, Math.min(100, 100 - issues.filter(i => ["critical","serious"].includes(i.severity)).length * 6));

    await admin
      .from("acc_scans")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        score: pageScore,
        wcag_aa_pct: wcagAa,
        total_issues: issues.length,
        pages_scanned: 1,
        summary: { critical: issues.filter(i=>i.severity==="critical").length, serious: issues.filter(i=>i.severity==="serious").length, moderate: issues.filter(i=>i.severity==="moderate").length, minor: issues.filter(i=>i.severity==="minor").length },
      })
      .eq("id", scan.id);

    await admin.from("acc_websites").update({ current_score: pageScore, last_scan_at: new Date().toISOString() }).eq("id", site.id);

    return new Response(JSON.stringify({ scan_id: scan.id, score: pageScore, issues_count: issues.length }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("scan error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
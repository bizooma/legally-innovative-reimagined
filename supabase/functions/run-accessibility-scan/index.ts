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

const UA = "BizoomaAccessibilityBot/1.0 (+https://bizooma.com/accessibility)";
const FETCH_TIMEOUT_MS = 12000;
const CRAWL_CONCURRENCY = 4;
const DEFAULT_MAX_PAGES = 20;
const HARD_MAX_PAGES = 50;

async function fetchWithTimeout(url: string, ms = FETCH_TIMEOUT_MS): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" }, signal: ctrl.signal, redirect: "follow" });
  } finally { clearTimeout(t); }
}

function normalizeUrl(href: string, base: URL): string | null {
  try {
    const u = new URL(href, base);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (u.hostname.replace(/^www\./, "") !== base.hostname.replace(/^www\./, "")) return null;
    u.hash = "";
    // Strip common tracking params
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid"].forEach(p => u.searchParams.delete(p));
    let s = u.toString();
    if (s.endsWith("/") && u.pathname !== "/") s = s.slice(0, -1);
    return s;
  } catch { return null; }
}

function extractLinks(html: string, base: URL): string[] {
  const out = new Set<string>();
  const re = /<a\b[^>]*\bhref\s*=\s*["']([^"'#]+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const n = normalizeUrl(m[1], base);
    if (!n) continue;
    // skip obvious binary / asset links
    if (/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|zip|mp4|mp3|css|js|woff2?|ttf|eot|xml|json)(\?|$)/i.test(n)) continue;
    out.add(n);
  }
  return [...out];
}

async function loadRobots(origin: string): Promise<{ disallow: string[] }> {
  try {
    const r = await fetchWithTimeout(origin + "/robots.txt", 5000);
    if (!r.ok) return { disallow: [] };
    const txt = await r.text();
    const lines = txt.split(/\r?\n/);
    let appliesToUs = false;
    const disallow: string[] = [];
    for (const raw of lines) {
      const line = raw.replace(/#.*$/, "").trim();
      if (!line) continue;
      const [k, ...rest] = line.split(":");
      const key = (k || "").trim().toLowerCase();
      const val = rest.join(":").trim();
      if (key === "user-agent") appliesToUs = val === "*" || /bizoomaaccessibilitybot/i.test(val);
      else if (appliesToUs && key === "disallow" && val) disallow.push(val);
    }
    return { disallow };
  } catch { return { disallow: [] }; }
}
function isAllowed(url: string, disallow: string[]): boolean {
  if (!disallow.length) return true;
  try {
    const path = new URL(url).pathname;
    return !disallow.some((d) => path.startsWith(d));
  } catch { return true; }
}

async function discoverFromSitemap(origin: string, base: URL, max: number): Promise<string[]> {
  const urls: string[] = [];
  const seen = new Set<string>();
  async function parse(sitemapUrl: string, depth = 0) {
    if (depth > 2 || urls.length >= max) return;
    try {
      const r = await fetchWithTimeout(sitemapUrl, 8000);
      if (!r.ok) return;
      const xml = await r.text();
      const childMaps = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/sitemap>/gi)].map(m => m[1].trim());
      if (childMaps.length) {
        for (const c of childMaps.slice(0, 5)) { if (urls.length >= max) break; await parse(c, depth + 1); }
      }
      const locs = [...xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/gi)].map(m => m[1].trim());
      for (const loc of locs) {
        const n = normalizeUrl(loc, base);
        if (n && !seen.has(n)) { seen.add(n); urls.push(n); if (urls.length >= max) return; }
      }
    } catch { /* ignore */ }
  }
  await parse(origin + "/sitemap.xml");
  if (urls.length === 0) await parse(origin + "/sitemap_index.xml");
  return urls;
}

async function crawl(rootUrl: string, max: number): Promise<string[]> {
  const base = new URL(rootUrl);
  const origin = base.origin;
  const robots = await loadRobots(origin);

  // Prefer sitemap discovery
  const fromSitemap = await discoverFromSitemap(origin, base, max);
  const startList = fromSitemap.length ? fromSitemap : [base.toString().replace(/\/$/, "") || base.toString()];

  // Always include the root first
  const seed = normalizeUrl(rootUrl, base) || rootUrl;
  const queue: string[] = [seed, ...startList.filter(u => u !== seed)];
  const seen = new Set<string>(queue);
  const collected: string[] = [];

  // BFS — only expand from already-fetched pages we keep
  while (queue.length && collected.length < max) {
    const batch = queue.splice(0, CRAWL_CONCURRENCY).filter(u => isAllowed(u, robots.disallow));
    if (!batch.length) continue;
    const results = await Promise.all(batch.map(async (u) => {
      try {
        const r = await fetchWithTimeout(u);
        if (!r.ok) return { u, html: "" };
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("text/html") && !ct.includes("application/xhtml")) return { u, html: "" };
        return { u, html: await r.text() };
      } catch { return { u, html: "" }; }
    }));
    for (const { u, html } of results) {
      if (collected.length >= max) break;
      if (!html) continue;
      collected.push(u);
      // Discover more links only if we haven't met the cap
      if (collected.length + queue.length < max && !fromSitemap.length) {
        for (const link of extractLinks(html, base)) {
          if (!seen.has(link)) { seen.add(link); queue.push(link); }
          if (collected.length + queue.length >= max) break;
        }
      }
    }
  }
  return collected;
}

async function fetchAndAnalyze(url: string): Promise<{ html: string; issues: Issue[]; score: number }> {
  try {
    const r = await fetchWithTimeout(url);
    if (!r.ok) {
      const issues: Issue[] = [{ rule_id: "fetch-failed", title: `HTTP ${r.status} fetching page`, severity: "critical", page_url: url }];
      return { html: "", issues, score: 0 };
    }
    const html = await r.text();
    const issues = analyze(html, url);
    return { html, issues, score: score(issues) };
  } catch (e) {
    return { html: "", issues: [{ rule_id: "fetch-failed", title: "Could not fetch page", severity: "critical", page_url: url, description: String(e) }], score: 0 };
  }
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

    const body = await req.json().catch(() => ({}));

    // Internal/scheduled call uses the service-role key as bearer.
    // Constant-ish-time compare to avoid trivially leaking key shape.
    const bearer = auth.replace(/^Bearer\s+/i, "").trim();
    const isInternal = !!body.scheduled && bearer.length === SRK.length && bearer === SRK;

    let triggeredBy: string | null = null;
    if (!isInternal) {
      const { data: u } = await userClient.auth.getUser();
      if (!u?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      triggeredBy = u.user.id;
    }

    const websiteId = body.website_id as string | undefined;
    const requestedMax = Number(body.max_pages);
    const maxPages = Math.max(1, Math.min(HARD_MAX_PAGES, Number.isFinite(requestedMax) && requestedMax > 0 ? requestedMax : DEFAULT_MAX_PAGES));
    if (!websiteId) return new Response(JSON.stringify({ error: "website_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Membership-checked fetch via user client (RLS) — admin bypass for internal scheduled runs.
    const fetchClient = isInternal ? admin : userClient;
    const { data: site, error: siteErr } = await fetchClient
      .from("acc_websites").select("id, url, organization_id").eq("id", websiteId).maybeSingle();
    if (siteErr || !site) return new Response(JSON.stringify({ error: "Website not found or no access" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Create scan
    const { data: scan, error: scanErr } = await admin
      .from("acc_scans")
      .insert({ website_id: site.id, organization_id: site.organization_id, status: "running", triggered_by: triggeredBy, started_at: new Date().toISOString() })
      .select().single();
    if (scanErr) throw scanErr;

    // Discover pages — sitemap first, then BFS crawl, capped at maxPages
    const pages = await crawl(site.url, maxPages);
    const targets = pages.length ? pages : [site.url];

    // Analyze pages with limited concurrency
    const perPage: { url: string; score: number; issues: Issue[] }[] = [];
    for (let i = 0; i < targets.length; i += CRAWL_CONCURRENCY) {
      const batch = targets.slice(i, i + CRAWL_CONCURRENCY);
      const out = await Promise.all(batch.map(async (u) => {
        const r = await fetchAndAnalyze(u);
        return { url: u, score: r.score, issues: r.issues };
      }));
      perPage.push(...out);
    }

    // Persist per-page rows
    if (perPage.length) {
      await admin.from("acc_scan_pages").insert(
        perPage.map(p => ({ scan_id: scan.id, url: p.url, score: p.score, issue_count: p.issues.length }))
      );
    }

    const allIssues: Issue[] = perPage.flatMap(p => p.issues);
    if (allIssues.length) {
      // Insert in chunks to avoid payload limits
      const rows = allIssues.map((i) => ({
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
      const CHUNK = 500;
      for (let i = 0; i < rows.length; i += CHUNK) {
        await admin.from("acc_accessibility_issues").insert(rows.slice(i, i + CHUNK));
      }
    }

    const avgScore = perPage.length
      ? Math.round(perPage.reduce((a, p) => a + p.score, 0) / perPage.length)
      : 0;
    const blockingPerPage = perPage.length
      ? perPage.reduce((a, p) => a + p.issues.filter(i => i.severity === "critical" || i.severity === "serious").length, 0) / perPage.length
      : 0;
    const wcagAa = Math.max(0, Math.min(100, Math.round(100 - blockingPerPage * 6)));

    await admin
      .from("acc_scans")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        score: avgScore,
        wcag_aa_pct: wcagAa,
        total_issues: allIssues.length,
        pages_scanned: perPage.length || 1,
        summary: {
          critical: allIssues.filter(i=>i.severity==="critical").length,
          serious: allIssues.filter(i=>i.severity==="serious").length,
          moderate: allIssues.filter(i=>i.severity==="moderate").length,
          minor: allIssues.filter(i=>i.severity==="minor").length,
          pages: perPage.length,
          discovered_via: pages.length ? "crawl" : "single",
        },
      })
      .eq("id", scan.id);

    await admin.from("acc_websites").update({ current_score: avgScore, last_scan_at: new Date().toISOString() }).eq("id", site.id);

    return new Response(JSON.stringify({ scan_id: scan.id, score: avgScore, issues_count: allIssues.length, pages_scanned: perPage.length }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("scan error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
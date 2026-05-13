import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const DEFAULTS = {
  primary_color: "#7A0A0A",
  position: "bottom-right",
  logo_url: null as string | null,
  hide_branding: false,
  enabled_features: {
    large: true, xl: true, contrast: true, invert: true, grayscale: true,
    dyslexia: true, links: true, pause: true, cursor: true,
  } as Record<string, boolean>,
  custom_css: null as string | null,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const slug = (url.searchParams.get("org") || "").trim().toLowerCase();
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    };
    if (!slug) {
      return new Response(JSON.stringify(DEFAULTS), { headers });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: org } = await supabase
      .from("acc_organizations")
      .select("id, brand_color, logo_url")
      .eq("slug", slug)
      .maybeSingle();
    if (!org) return new Response(JSON.stringify(DEFAULTS), { headers });

    const { data: site } = await supabase
      .from("acc_websites")
      .select("id")
      .eq("organization_id", org.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    let settings: any = null;
    if (site?.id) {
      const r = await supabase
        .from("acc_widget_settings")
        .select("position, primary_color, logo_url, hide_branding, enabled_features, custom_css")
        .eq("website_id", site.id)
        .maybeSingle();
      settings = r.data;
    }

    const merged = {
      primary_color: settings?.primary_color || org.brand_color || DEFAULTS.primary_color,
      position: settings?.position || DEFAULTS.position,
      logo_url: settings?.logo_url ?? org.logo_url ?? null,
      hide_branding: !!settings?.hide_branding,
      enabled_features: { ...DEFAULTS.enabled_features, ...(settings?.enabled_features || {}) },
      custom_css: settings?.custom_css ?? null,
    };
    return new Response(JSON.stringify(merged), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ ...DEFAULTS, error: String(e) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
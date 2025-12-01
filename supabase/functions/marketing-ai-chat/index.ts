import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, clientId } = await req.json();
    console.log("Received marketing AI chat request for client:", clientId);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch current KPIs for context
    const { data: kpis, error: kpisError } = await supabase
      .from("marketing_kpis")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (kpisError) {
      console.error("Error fetching KPIs:", kpisError);
    }

    // Fetch client info
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("company_name")
      .eq("id", clientId)
      .single();

    if (clientError) {
      console.error("Error fetching client:", clientError);
    }

    // Build context about current KPIs
    const kpiContext = kpis
      ? kpis.map((kpi) => {
          return `${kpi.metric_name}: Current ${kpi.metric_value}${kpi.metric_unit || ""}, Target ${kpi.target_value}${kpi.metric_unit || ""} (${kpi.category})`;
        }).join("\n")
      : "No KPI data available";

    const systemPrompt = `You are an expert marketing strategist and analyst for ${client?.company_name || "the client"}. You help analyze marketing plans, provide insights on KPIs, and suggest improvements for marketing initiatives.

CURRENT MARKETING CONTEXT:
- Client: ${client?.company_name || "Puget Law Group"}
- Marketing Strategy: Dual-brand approach with primary brand (Puget Law Group) focusing on criminal defense and new brand (Win With Casey) targeting personal injury market
- Key Differentiators: Team of 9 former prosecutors, 5.0 Google rating with 500+ reviews, 150+ years combined experience
- Primary Goals: Dominate DUI defense market, launch Win With Casey personal injury brand, achieve top-3 rankings for 10 high-value keywords
- Geographic Focus: Seattle and Tacoma with neighborhood-level targeting

CURRENT KPI METRICS:
${kpiContext}

MARKETING PLAN HIGHLIGHTS:
- Annual Budget: $204,000 total (PLG: $96k, Win With Casey: $108k)
- Main Channels: SEO, Content Marketing, PPC, Social Media, Email Marketing
- Win With Casey Initiative: Multi-domain architecture (winwithcasey.com, caseyfights.com, caseyatbat.com, caseyarbenz.com)
- Content Strategy: Blog posts, legal guides, video content, client testimonials
- SEO Focus: Voice search optimization, answer engine optimization (AEO), local SEO

When analyzing or making suggestions:
1. Be specific and actionable
2. Reference actual KPI data when available
3. Prioritize based on ROI and impact
4. Consider the dual-brand strategy
5. Focus on measurable outcomes
6. Provide tactical next steps
7. Keep responses concise but comprehensive

You can help with:
- Analyzing current KPI performance vs targets
- Identifying gaps and opportunities
- Suggesting specific marketing tactics
- Prioritizing initiatives based on data
- Optimizing budget allocation
- Improving conversion rates
- Boosting SEO and content strategy
- Enhancing brand positioning`;

    console.log("Calling Lovable AI gateway...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    console.log("Streaming response back to client");
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Marketing AI chat error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

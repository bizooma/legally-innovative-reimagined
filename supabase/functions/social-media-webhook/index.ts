
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received webhook from Sociamonials");
    
    const webhookData = await req.json();
    console.log("Webhook data:", JSON.stringify(webhookData, null, 2));

    // Create supabase admin client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Extract client ID from URL parameter
    const url = new URL(req.url);
    const clientIdParam = url.searchParams.get('client_id');
    
    // Extract relevant data from Sociamonials webhook
    // Adjust this structure based on actual Sociamonials webhook format
    const {
      post_id,
      platform,
      content,
      media_urls,
      post_url,
      published_at,
      engagement_metrics,
      client_id
    } = webhookData;

    // Use client_id from webhook data or URL parameter, default to Puget Law Group
    const targetClientId = client_id || clientIdParam || "9d7fc8c7-795e-4a3d-acd1-3b34173a53f8";

    console.log(`Processing post for client: ${targetClientId}`);

    // Insert or update the social media post
    const { data, error } = await supabase
      .from("social_media_posts")
      .upsert({
        client_id: targetClientId,
        post_id: post_id || `${platform}_${Date.now()}`,
        platform: platform || "unknown",
        content: content || "",
        media_urls: Array.isArray(media_urls) ? media_urls : (media_urls ? [media_urls] : []),
        post_url: post_url || "",
        published_at: published_at ? new Date(published_at).toISOString() : new Date().toISOString(),
        engagement_metrics: engagement_metrics || {},
        webhook_data: webhookData
      }, {
        onConflict: 'post_id'
      });

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save social media post", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully saved social media post:", data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Social media post saved successfully",
        data: data
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing social media webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

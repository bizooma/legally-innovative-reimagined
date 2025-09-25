
// revoke-google-token/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CLIENT_ID = "963523082884-rjqcbkssi7bep6scsmh540t2qlhh88m7.apps.googleusercontent.com";
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_REVOKE_URL = "https://oauth2.googleapis.com/revoke";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    const { clientId } = await req.json();
    
    if (!clientId) {
      return new Response(
        JSON.stringify({ error: "Missing client ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create supabase admin client to access database
    const supabase = createClient(
      SUPABASE_URL || "",
      SUPABASE_SERVICE_ROLE_KEY || ""
    );
    
    // Get the refresh token from the database
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("google_refresh_token, google_drive_folder_id")
      .eq("id", clientId)
      .single();
      
    if (clientError || !clientData) {
      console.error("Error fetching client data:", clientError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch client data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { google_refresh_token: refreshToken } = clientData;
    
    // If we have a refresh token, revoke it
    if (refreshToken) {
      const revokeResponse = await fetch(GOOGLE_REVOKE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET || "",
        }),
      });
      
      if (!revokeResponse.ok) {
        const errorData = await revokeResponse.json();
        console.error("Token revocation error:", errorData);
        // We'll continue anyway to remove the folder ID from the database
      }
    }
    
    // Remove Google Drive data from the database
    const { error: updateError } = await supabase
      .from("clients")
      .update({ 
        google_drive_folder_id: null,
        google_access_token: null,
        google_refresh_token: null
      })
      .eq("id", clientId);
      
    if (updateError) {
      console.error("Database update error:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update client record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in revoke-google-token function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error)?.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});


// exchange-google-token/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CLIENT_ID = "963523082884-rjqcbkssi7bep6scsmh540t2qlhh88m7.apps.googleusercontent.com";
// The client secret should be stored as a Supabase secret, not hardcoded
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";
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
    const { code, redirectUri, clientId } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: "Missing authorization code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!clientId) {
      return new Response(
        JSON.stringify({ error: "Missing client ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Use the provided redirect URI or default to production URL
    const finalRedirectUri = redirectUri || "https://bizooma.com/auth/google/callback";

    console.log(`Exchanging code for token with redirect URI: ${finalRedirectUri}`);
    
    // Exchange authorization code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET || "",
        redirect_uri: finalRedirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange error:", tokenData);
      return new Response(
        JSON.stringify({ error: "Failed to exchange token", details: tokenData.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract tokens
    const { access_token, refresh_token, expires_in } = tokenData;
    
    // Create a folder in Google Drive
    const folderResponse = await fetch(`${GOOGLE_DRIVE_API}/files`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Client Files ${new Date().toISOString().split('T')[0]}`,
        mimeType: "application/vnd.google-apps.folder",
      }),
    });

    const folderData = await folderResponse.json();
    
    if (!folderResponse.ok) {
      console.error("Folder creation error:", folderData);
      return new Response(
        JSON.stringify({ error: "Failed to create folder", details: folderData.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create supabase admin client to update client record
    const supabase = createClient(
      SUPABASE_URL || "",
      SUPABASE_SERVICE_ROLE_KEY || ""
    );
    
    // Store tokens and folder ID in the database
    const { error: updateError } = await supabase
      .from("clients")
      .update({
        google_drive_folder_id: folderData.id,
        google_access_token: access_token,
        google_refresh_token: refresh_token,
        google_token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString()
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
      JSON.stringify({ 
        success: true, 
        folderId: folderData.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in exchange-google-token function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error)?.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

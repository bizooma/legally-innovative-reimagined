
// exchange-google-token/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLIENT_ID = "963523082884-rjqcbkssi7bep6scsmh540t2qlhh88m7.apps.googleusercontent.com";
// The client secret should be stored as a Supabase secret, not hardcoded
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";

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
    const { code, redirectUri } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: "Missing authorization code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Use the provided redirect URI or default to production URL
    const finalRedirectUri = redirectUri || "https://legallyinnovative.com/auth/google/callback";

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
    const { access_token, refresh_token } = tokenData;
    
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

    // Store tokens in database for future use
    // In a real application, you'd store these tokens securely
    // along with the folder ID and client ID

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
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

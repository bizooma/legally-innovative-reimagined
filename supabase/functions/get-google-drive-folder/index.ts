
// get-google-drive-folder/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const { folderId } = await req.json();
    
    if (!folderId) {
      return new Response(
        JSON.stringify({ error: "Missing folder ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create supabase admin client
    const supabase = createClient(
      SUPABASE_URL || "",
      SUPABASE_SERVICE_ROLE_KEY || ""
    );
    
    // Find client with this folder ID
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("id, google_access_token, google_refresh_token")
      .eq("google_drive_folder_id", folderId)
      .single();
      
    if (clientError || !clientData?.google_access_token) {
      console.log("No client found with the provided folder ID or missing access token");
      // Return a basic response with folder ID only (no detailed info)
      return new Response(
        JSON.stringify({
          id: folderId,
          name: `Client Files`,
          webViewLink: `https://drive.google.com/drive/folders/${folderId}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Use Google Drive API to get folder details
    const folderResponse = await fetch(`${GOOGLE_DRIVE_API}/files/${folderId}?fields=id,name,webViewLink`, {
      headers: {
        "Authorization": `Bearer ${clientData.google_access_token}`,
      },
    });
    
    if (folderResponse.ok) {
      const folderData = await folderResponse.json();
      return new Response(
        JSON.stringify(folderData),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      console.error("Error fetching folder details from Google Drive");
      // Return a basic response with folder ID only
      return new Response(
        JSON.stringify({
          id: folderId,
          name: `Client Files`,
          webViewLink: `https://drive.google.com/drive/folders/${folderId}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in get-google-drive-folder function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

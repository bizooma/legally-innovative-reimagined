import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProviderStatusRecord {
  id: string;
  slug: string;
  name: string;
  status: string;
  summary: string;
  last_checked: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching provider status for API endpoint...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch active providers with their latest status
    const { data: providers, error: providersError } = await supabase
      .from('provider_status_configs')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (providersError) {
      console.error('Error fetching providers:', providersError);
      throw providersError;
    }

    // Fetch latest status for all providers
    const providerIds = providers.map(p => p.id);
    const { data: statusData, error: statusError } = await supabase
      .from('provider_status_cache')
      .select('*')
      .in('provider_id', providerIds)
      .order('last_checked', { ascending: false });

    if (statusError) {
      console.error('Error fetching status cache:', statusError);
      throw statusError;
    }

    // Get the latest status for each provider
    const latestStatusMap = new Map();
    statusData?.forEach(status => {
      if (!latestStatusMap.has(status.provider_id)) {
        latestStatusMap.set(status.provider_id, status);
      }
    });

    // Transform to the required format
    const apiResponse = providers.map(provider => {
      const latestStatus = latestStatusMap.get(provider.id);
      
      return {
        id: provider.slug,
        name: provider.name,
        status: latestStatus?.status || 'unknown',
        summary: latestStatus?.summary || 'Status information unavailable',
        lastChecked: latestStatus?.last_checked || new Date().toISOString()
      };
    });

    console.log(`Successfully formatted ${apiResponse.length} providers for API`);

    return new Response(
      JSON.stringify(apiResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in api-provider-status:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});

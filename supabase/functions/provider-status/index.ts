import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProviderStatusRecord {
  id: string;
  slug: string;
  name: string;
  icon_initials: string;
  status: string;
  summary: string;
  last_checked: string;
  display_order: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    console.log('Fetching provider status data...');

    // Fetch all active providers with their latest status
    const { data: providers, error: providersError } = await supabaseClient
      .from('provider_status_configs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (providersError) {
      console.error('Error fetching providers:', providersError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch providers', providers: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch latest status for each provider
    const providerIds = providers.map(p => p.id);
    const { data: statuses, error: statusError } = await supabaseClient
      .from('provider_status_cache')
      .select('*')
      .in('provider_id', providerIds)
      .order('created_at', { ascending: false });

    if (statusError) {
      console.error('Error fetching statuses:', statusError);
    }

    // Create a map of latest status per provider
    const statusMap = new Map();
    statuses?.forEach(status => {
      if (!statusMap.has(status.provider_id)) {
        statusMap.set(status.provider_id, status);
      }
    });

    // Combine provider configs with their status
    const result: ProviderStatusRecord[] = providers.map(provider => {
      const status = statusMap.get(provider.id) || {
        status: 'unknown',
        summary: 'Status not available',
        last_checked: new Date().toISOString(),
      };

      return {
        id: provider.id,
        slug: provider.slug,
        name: provider.name,
        icon_initials: provider.icon_initials,
        status: status.status,
        summary: status.summary,
        last_checked: status.last_checked,
        display_order: provider.display_order,
      };
    });

    console.log(`Successfully fetched status for ${result.length} providers`);

    return new Response(
      JSON.stringify({ providers: result }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', providers: [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

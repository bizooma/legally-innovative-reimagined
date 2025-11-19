import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { fetchStatuspageIncidents, mapStatuspageIncidentToDb } from '../_shared/providers/statuspage-incidents.ts';
import { fetchGoogleCloudIncidents } from '../_shared/providers/google-cloud-incidents.ts';
import { fetchAWSIncidents } from '../_shared/providers/aws-incidents.ts';
import { fetchAzureIncidents } from '../_shared/providers/azure-incidents.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      }
    );

    console.log('Starting provider incident fetch job...');

    // Fetch all active providers
    const { data: providers, error: providersError } = await supabaseClient
      .from('provider_status_configs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (providersError) {
      throw providersError;
    }

    console.log(`Fetching incidents for ${providers.length} providers`);

    let totalIncidentsProcessed = 0;
    let totalNewIncidents = 0;

    // Fetch incidents for each provider
    for (const provider of providers) {
      try {
        console.log(`Fetching incidents for ${provider.name}...`);
        
        let incidents: any[] = [];

        // Fetch incidents based on provider type
        if (provider.slug === 'google_cloud') {
          incidents = await fetchGoogleCloudIncidents();
        } else if (provider.slug === 'aws') {
          incidents = await fetchAWSIncidents();
        } else if (provider.slug === 'azure') {
          incidents = await fetchAzureIncidents();
        } else if (provider.status_endpoint) {
          // Most providers use Statuspage.io
          try {
            const statuspageIncidents = await fetchStatuspageIncidents(provider.status_endpoint);
            incidents = statuspageIncidents.map(mapStatuspageIncidentToDb);
          } catch (error) {
            console.error(`Failed to fetch incidents for ${provider.name}: ${error.message}`);
            continue;
          }
        }

        if (incidents.length === 0) {
          console.log(`No incidents found for ${provider.name}`);
          continue;
        }

        console.log(`Found ${incidents.length} incidents for ${provider.name}`);
        totalIncidentsProcessed += incidents.length;

        // Store incidents in database
        for (const incident of incidents) {
          const { error: insertError } = await supabaseClient
            .from('provider_incidents')
            .upsert({
              provider_id: provider.id,
              ...incident,
            }, {
              onConflict: 'provider_id,incident_id',
              ignoreDuplicates: false, // Update existing incidents
            });

          if (insertError) {
            // Check if it's a duplicate (which is fine)
            if (insertError.code === '23505') {
              console.log(`Incident ${incident.incident_id} already exists for ${provider.name}`);
            } else {
              console.error(`Error storing incident for ${provider.name}:`, insertError);
            }
          } else {
            totalNewIncidents++;
          }
        }
      } catch (error) {
        console.error(`Error processing incidents for ${provider.name}:`, error.message);
        continue;
      }
    }

    console.log(`Incident fetch complete. Processed ${totalIncidentsProcessed} incidents, stored/updated ${totalNewIncidents}`);

    return new Response(
      JSON.stringify({
        success: true,
        providers_checked: providers.length,
        incidents_processed: totalIncidentsProcessed,
        incidents_stored: totalNewIncidents,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in incident fetch job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { fetchCloudflareStatus } from '../_shared/providers/cloudflare.ts';
import { fetchAwsStatus } from '../_shared/providers/aws.ts';
import { fetchGoogleCloudStatus } from '../_shared/providers/google-cloud.ts';
import { fetchAzureStatus } from '../_shared/providers/azure.ts';
import { fetchDigitalOceanStatus } from '../_shared/providers/digitalocean.ts';
import { fetchLinodeStatus } from '../_shared/providers/linode.ts';
import { fetchVultrStatus } from '../_shared/providers/vultr.ts';
import { fetchVercelStatus } from '../_shared/providers/vercel.ts';
import { fetchNetlifyStatus } from '../_shared/providers/netlify.ts';
import { fetchRenderStatus } from '../_shared/providers/render.ts';
import { fetchFlyIoStatus } from '../_shared/providers/fly-io.ts';
import { fetchGitHubStatus } from '../_shared/providers/github.ts';
import { fetchGitLabStatus } from '../_shared/providers/gitlab.ts';
import { fetchBitbucketStatus } from '../_shared/providers/bitbucket.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const providerFetchers: Record<string, () => Promise<{ status: string; summary: string }>> = {
  cloudflare: fetchCloudflareStatus,
  aws: fetchAwsStatus,
  google_cloud: fetchGoogleCloudStatus,
  azure: fetchAzureStatus,
  digitalocean: fetchDigitalOceanStatus,
  linode: fetchLinodeStatus,
  vultr: fetchVultrStatus,
  vercel: fetchVercelStatus,
  netlify: fetchNetlifyStatus,
  render: fetchRenderStatus,
  fly_io: fetchFlyIoStatus,
  github: fetchGitHubStatus,
  gitlab: fetchGitLabStatus,
  bitbucket: fetchBitbucketStatus,
};

async function checkAndSendAlerts(
  supabaseClient: any,
  newStatuses: any[],
  providers: any[]
) {
  try {
    // Get admin emails
    const { data: admins, error: adminsError } = await supabaseClient
      .from('users')
      .select('email')
      .eq('is_admin', true);

    if (adminsError || !admins || admins.length === 0) {
      console.log('No admin emails found for alerts');
      return;
    }

    const adminEmails = admins.map((admin: any) => admin.email);
    console.log(`Found ${adminEmails.length} admin(s) to notify`);

    // Get previous statuses for comparison
    const providerIds = providers.map(p => p.id);
    const { data: previousStatuses, error: prevError } = await supabaseClient
      .from('provider_status_cache')
      .select('provider_id, status')
      .in('provider_id', providerIds)
      .order('created_at', { ascending: false });

    if (prevError) {
      console.error('Error fetching previous statuses:', prevError);
      return;
    }

    // Create a map of most recent previous status for each provider
    const previousStatusMap = new Map();
    if (previousStatuses) {
      for (const status of previousStatuses) {
        if (!previousStatusMap.has(status.provider_id)) {
          previousStatusMap.set(status.provider_id, status.status);
        }
      }
    }

    // Check for status degradations
    const alerts = [];
    for (const newStatus of newStatuses) {
      const provider = providers.find(p => p.id === newStatus.provider_id);
      if (!provider) continue;

      const previousStatus = previousStatusMap.get(newStatus.provider_id);
      
      // Alert if status changed from operational to degraded or major_outage
      if (
        previousStatus === 'operational' &&
        (newStatus.status === 'degraded' || newStatus.status === 'major_outage')
      ) {
        alerts.push({
          providerName: provider.name,
          oldStatus: previousStatus,
          newStatus: newStatus.status,
          summary: newStatus.summary,
        });
      }
    }

    // Send alerts
    if (alerts.length > 0) {
      console.log(`Sending ${alerts.length} status alert(s)`);
      
      const alertPromises = alerts.map(alert =>
        fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-status-alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({
            ...alert,
            adminEmails,
          }),
        })
      );

      await Promise.allSettled(alertPromises);
      console.log('Alert notifications triggered');
    } else {
      console.log('No status degradations detected');
    }
  } catch (error) {
    console.error('Error checking/sending alerts:', error);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting provider status fetch job...');

    // Fetch all active providers
    const { data: providers, error: providersError } = await supabaseClient
      .from('provider_status_configs')
      .select('*')
      .eq('is_active', true);

    if (providersError) {
      throw new Error(`Failed to fetch providers: ${providersError.message}`);
    }

    console.log(`Fetching status for ${providers.length} providers`);

    // Fetch status for each provider
    const results = await Promise.allSettled(
      providers.map(async (provider) => {
        const fetcher = providerFetchers[provider.slug];
        
        if (!fetcher) {
          console.warn(`No fetcher found for ${provider.slug}`);
          return {
            provider_id: provider.id,
            status: 'unknown',
            summary: 'Fetcher not implemented',
            last_checked: new Date().toISOString(),
          };
        }

        try {
          console.log(`Fetching status for ${provider.name}...`);
          const result = await fetcher();
          
          return {
            provider_id: provider.id,
            status: result.status,
            summary: result.summary,
            last_checked: new Date().toISOString(),
          };
        } catch (error) {
          console.error(`Error fetching ${provider.name}:`, error);
          return {
            provider_id: provider.id,
            status: 'unknown',
            summary: `Fetch failed: ${error.message}`,
            last_checked: new Date().toISOString(),
          };
        }
      })
    );

    // Insert all status updates
    const statusUpdates = results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return null;
    }).filter(Boolean);

    const { error: insertError } = await supabaseClient
      .from('provider_status_cache')
      .insert(statusUpdates);

    if (insertError) {
      console.error('Error inserting status updates:', insertError);
    }

    console.log(`Successfully updated status for ${statusUpdates.length} providers`);

    // Check for status changes and send alerts
    await checkAndSendAlerts(supabaseClient, statusUpdates, providers);

    return new Response(
      JSON.stringify({ 
        success: true, 
        updated: statusUpdates.length,
        message: 'Provider statuses updated successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Fatal error in fetch job:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

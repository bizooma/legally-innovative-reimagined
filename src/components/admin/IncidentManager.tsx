import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Database, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export const IncidentManager = () => {
  const { toast } = useToast();
  const [isFetching, setIsFetching] = useState(false);

  // Query to get incident stats
  const { data: stats, refetch } = useQuery({
    queryKey: ['incident-stats'],
    queryFn: async () => {
      const { data: totalIncidents } = await supabase
        .from('provider_incidents')
        .select('id', { count: 'exact', head: true });

      const { data: activeIncidents } = await supabase
        .from('provider_incidents')
        .select('id', { count: 'exact', head: true })
        .neq('status', 'resolved');

      const { data: recentIncidents } = await supabase
        .from('provider_incidents')
        .select('id', { count: 'exact', head: true })
        .gte('started_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      return {
        total: totalIncidents?.length || 0,
        active: activeIncidents?.length || 0,
        recent: recentIncidents?.length || 0,
      };
    },
  });

  const handleFetchIncidents = async () => {
    setIsFetching(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-provider-incidents', {
        method: 'POST',
      });

      if (error) throw error;

      toast({
        title: 'Incidents Fetched Successfully',
        description: `Processed ${data.incidents_processed} incidents, stored/updated ${data.incidents_stored} records.`,
      });

      // Refetch stats
      refetch();
    } catch (error) {
      console.error('Error fetching incidents:', error);
      toast({
        title: 'Error Fetching Incidents',
        description: error.message || 'An error occurred while fetching incidents',
        variant: 'destructive',
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Provider Incident Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <div className="text-sm text-muted-foreground">Total Incidents</div>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/10">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats?.active || 0}
            </div>
            <div className="text-sm text-muted-foreground">Active Incidents</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats?.recent || 0}
            </div>
            <div className="text-sm text-muted-foreground">Last 7 Days</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Manual Incident Sync</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Fetch the latest incidents from all provider APIs. This normally runs automatically every 30 minutes.
            </p>
            <Button 
              onClick={handleFetchIncidents} 
              disabled={isFetching}
              className="gap-2"
            >
              {isFetching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Fetch Incidents Now
                </>
              )}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Automatic Sync Schedule</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Incidents are automatically fetched every 30 minutes via cron job
            </p>
            <div className="flex gap-2 flex-wrap mt-2">
              <div className="text-xs px-2 py-1 rounded bg-background">
                Status: Every 5 minutes
              </div>
              <div className="text-xs px-2 py-1 rounded bg-background">
                Incidents: Every 30 minutes
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Incidents are fetched from Statuspage.io APIs for most providers</p>
          <p>• Google Cloud Platform uses their native incidents.json API</p>
          <p>• AWS and Azure incident fetching coming soon</p>
          <p>• Duplicate incidents are automatically detected and skipped</p>
        </div>
      </CardContent>
    </Card>
  );
};

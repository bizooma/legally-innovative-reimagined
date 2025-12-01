import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MarketingKPI } from '@/types/marketing-kpi';
import { useEffect } from 'react';

interface UseMarketingKPIsOptions {
  clientId: string;
  autoRefresh?: boolean;
}

export const useMarketingKPIs = ({ clientId, autoRefresh = true }: UseMarketingKPIsOptions) => {
  const { data: kpis = [], isLoading, refetch } = useQuery({
    queryKey: ['marketing-kpis', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_kpis')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MarketingKPI[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    if (!autoRefresh) return;

    const channel = supabase
      .channel('marketing-kpis-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'marketing_kpis',
          filter: `client_id=eq.${clientId}`,
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId, autoRefresh, refetch]);

  // Helper functions to get specific metrics
  const getMetricByName = (metricName: string): MarketingKPI | undefined => {
    return kpis.find(kpi => kpi.metric_name === metricName);
  };

  const getMetricsByCategory = (category: string): MarketingKPI[] => {
    return kpis.filter(kpi => kpi.category === category);
  };

  const getMetricsByBrand = (brand: 'plg' | 'wwc'): MarketingKPI[] => {
    return kpis.filter(kpi => kpi.metadata?.brand === brand);
  };

  const calculateProgress = (current: number, target: number): number => {
    if (!target || target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return {
    kpis,
    isLoading,
    refetch,
    getMetricByName,
    getMetricsByCategory,
    getMetricsByBrand,
    calculateProgress,
  };
};

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MarketingPlan } from '@/types/marketing-plan';

interface UseMarketingPlanOptions {
  clientId: string;
}

export const useMarketingPlan = ({ clientId }: UseMarketingPlanOptions) => {
  const { data: marketingPlan, isLoading, error, refetch } = useQuery({
    queryKey: ['marketing-plan', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_plans')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();

      if (error) throw error;
      return data as MarketingPlan | null;
    },
  });

  return {
    marketingPlan,
    isLoading,
    error,
    refetch,
    hasMarketingPlan: !!marketingPlan,
  };
};

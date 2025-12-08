import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MarketingPlan, MarketingPlanBudgetLineItem } from '@/types/marketing-plan';

interface UseMarketingPlanOptions {
  clientId: string;
}

export const useMarketingPlan = ({ clientId }: UseMarketingPlanOptions) => {
  const queryClient = useQueryClient();

  const { data: marketingPlan, isLoading, error, refetch } = useQuery({
    queryKey: ['marketing-plan', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_plans')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();

      if (error) throw error;
      
      // Parse budget_breakdown if it exists
      if (data && data.budget_breakdown) {
        return {
          ...data,
          budget_breakdown: data.budget_breakdown as unknown as MarketingPlanBudgetLineItem[]
        } as MarketingPlan;
      }
      
      return data as MarketingPlan | null;
    },
  });

  const updateBudgetBreakdown = useMutation({
    mutationFn: async (budgetBreakdown: MarketingPlanBudgetLineItem[]) => {
      if (!marketingPlan?.id) throw new Error('No marketing plan found');
      
      const { error } = await supabase
        .from('marketing_plans')
        .update({ 
          budget_breakdown: budgetBreakdown as unknown as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', marketingPlan.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-plan', clientId] });
    },
  });

  return {
    marketingPlan,
    isLoading,
    error,
    refetch,
    hasMarketingPlan: !!marketingPlan,
    updateBudgetBreakdown,
  };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BudgetItem } from '@/types/budget';
import { toast } from '@/hooks/use-toast';

export const useBudgetItems = () => {
  const queryClient = useQueryClient();

  const { data: budgetItems = [], isLoading } = useQuery({
    queryKey: ['budget-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select('*')
        .order('next_billing_date', { ascending: true });

      if (error) throw error;
      return data as BudgetItem[];
    },
  });

  const addBudgetItem = useMutation({
    mutationFn: async (item: Omit<BudgetItem, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_items')
        .insert([{ ...item, created_by: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] });
      toast({
        title: 'Success',
        description: 'Budget item added successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateBudgetItem = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BudgetItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('budget_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] });
      toast({
        title: 'Success',
        description: 'Budget item updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteBudgetItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('budget_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] });
      toast({
        title: 'Success',
        description: 'Budget item deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    budgetItems,
    isLoading,
    addBudgetItem,
    updateBudgetItem,
    deleteBudgetItem,
  };
};

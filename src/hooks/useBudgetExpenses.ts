import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BudgetExpense } from '@/types/budget';
import { useToast } from '@/hooks/use-toast';

export const useBudgetExpenses = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['budget-expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_expenses')
        .select('*')
        .order('expense_date', { ascending: false });

      if (error) throw error;
      return data as BudgetExpense[];
    },
  });

  const addExpense = useMutation({
    mutationFn: async (expense: Omit<BudgetExpense, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_expenses')
        .insert([{ ...expense, created_by: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budget-comparison'] });
      toast({
        title: 'Success',
        description: 'Expense recorded successfully',
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

  const updateExpense = useMutation({
    mutationFn: async (expense: BudgetExpense) => {
      const { data, error } = await supabase
        .from('budget_expenses')
        .update({
          budget_item_id: expense.budget_item_id,
          amount: expense.amount,
          expense_date: expense.expense_date,
          notes: expense.notes,
        })
        .eq('id', expense.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budget-comparison'] });
      toast({
        title: 'Success',
        description: 'Expense updated successfully',
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

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('budget_expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budget-comparison'] });
      toast({
        title: 'Success',
        description: 'Expense deleted successfully',
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
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};

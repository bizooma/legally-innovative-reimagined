import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BudgetItem, BudgetExpense, BudgetComparisonData } from '@/types/budget';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';

const calculateMonthlyBudget = (items: BudgetItem[], month: Date): number => {
  return items.reduce((total, item) => {
    if (item.status !== 'active') return total;
    
    const itemDate = new Date(item.next_billing_date);
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Check if this item should be billed in this month
    if (itemDate >= monthStart && itemDate <= monthEnd) {
      switch (item.billing_frequency) {
        case 'monthly':
          return total + item.cost;
        case 'quarterly':
          return total + item.cost / 3;
        case 'annual':
          return total + item.cost / 12;
        case 'one-time':
          return total + item.cost;
        default:
          return total;
      }
    }
    
    // For recurring items, calculate proportional amount
    if (item.billing_frequency === 'monthly') {
      return total + item.cost;
    }
    
    return total;
  }, 0);
};

export const useBudgetComparison = (months: number = 6) => {
  return useQuery({
    queryKey: ['budget-comparison', months],
    queryFn: async () => {
      // Fetch budget items
      const { data: budgetItems, error: itemsError } = await supabase
        .from('budget_items')
        .select('*');

      if (itemsError) throw itemsError;

      // Fetch expenses for the last N months
      const startDate = subMonths(new Date(), months - 1);
      const { data: expenses, error: expensesError } = await supabase
        .from('budget_expenses')
        .select('*')
        .gte('expense_date', format(startOfMonth(startDate), 'yyyy-MM-dd'));

      if (expensesError) throw expensesError;

      // Calculate comparison data for each month
      const comparisonData: BudgetComparisonData[] = [];
      
      for (let i = months - 1; i >= 0; i--) {
        const month = subMonths(new Date(), i);
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        
        // Calculate budgeted amount
        const budgeted = calculateMonthlyBudget(budgetItems as BudgetItem[], month);
        
        // Calculate actual expenses for this month
        const actual = (expenses as BudgetExpense[])
          .filter(expense => {
            const expenseDate = new Date(expense.expense_date);
            return expenseDate >= monthStart && expenseDate <= monthEnd;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);
        
        comparisonData.push({
          month: format(month, 'MMM yyyy'),
          budgeted: Number(budgeted.toFixed(2)),
          actual: Number(actual.toFixed(2)),
        });
      }
      
      return comparisonData;
    },
  });
};

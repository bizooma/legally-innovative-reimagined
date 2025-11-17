import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BudgetExpense, BudgetItem } from '@/types/budget';
import { format } from 'date-fns';

const expenseSchema = z.object({
  budget_item_id: z.string().min(1, 'Please select a budget item'),
  amount: z.number().positive('Amount must be positive'),
  expense_date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface BudgetExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (expense: Partial<BudgetExpense>) => Promise<void>;
  expense?: BudgetExpense;
  budgetItems: BudgetItem[];
  isLoading?: boolean;
}

export const BudgetExpenseDialog = ({
  open,
  onOpenChange,
  onSave,
  expense,
  budgetItems,
  isLoading,
}: BudgetExpenseDialogProps) => {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      budget_item_id: '',
      amount: 0,
      expense_date: format(new Date(), 'yyyy-MM-dd'),
      notes: '',
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        budget_item_id: expense.budget_item_id,
        amount: expense.amount,
        expense_date: expense.expense_date,
        notes: expense.notes || '',
      });
    } else {
      form.reset({
        budget_item_id: '',
        amount: 0,
        expense_date: format(new Date(), 'yyyy-MM-dd'),
        notes: '',
      });
    }
  }, [expense, form]);

  const onSubmit = async (data: ExpenseFormData) => {
    await onSave({
      ...(expense?.id && { id: expense.id }),
      budget_item_id: data.budget_item_id,
      amount: data.amount,
      expense_date: data.expense_date,
      notes: data.notes || null,
    } as Partial<BudgetExpense>);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Record Expense'}</DialogTitle>
          <DialogDescription>
            {expense ? 'Update the expense details' : 'Record an actual expense for a budget item'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="budget_item_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Item</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetItems
                        .filter(item => item.status === 'active')
                        .map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.tool_name} (${item.cost}/{item.billing_frequency})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expense_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {expense ? 'Update' : 'Record'} Expense
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

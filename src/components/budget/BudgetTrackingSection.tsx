import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Receipt } from 'lucide-react';
import { BudgetStats } from './BudgetStats';
import { BudgetTable } from './BudgetTable';
import { BudgetItemDialog } from './BudgetItemDialog';
import { BudgetComparisonChart } from './BudgetComparisonChart';
import { BudgetExpenseDialog } from './BudgetExpenseDialog';
import { useBudgetItems } from '@/hooks/useBudgetItems';
import { useBudgetExpenses } from '@/hooks/useBudgetExpenses';
import { BudgetItem, BudgetExpense } from '@/types/budget';

export const BudgetTrackingSection = () => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | undefined>(undefined);
  const [editingExpense, setEditingExpense] = useState<BudgetExpense | undefined>(undefined);
  const { budgetItems, isLoading, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useBudgetItems();
  const { addExpense, updateExpense } = useBudgetExpenses();

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item: BudgetItem) => {
    setEditingItem(item);
    setIsItemDialogOpen(true);
  };

  const handleSaveItem = async (item: Partial<BudgetItem>) => {
    if (item.id) {
      await updateBudgetItem.mutateAsync(item as BudgetItem);
    } else {
      await addBudgetItem.mutateAsync(item as Omit<BudgetItem, 'id' | 'created_at' | 'updated_at' | 'created_by'>);
    }
    setIsItemDialogOpen(false);
    setEditingItem(undefined);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteBudgetItem.mutateAsync(id);
  };

  const handleAddExpense = () => {
    setEditingExpense(undefined);
    setIsExpenseDialogOpen(true);
  };

  const handleSaveExpense = async (expense: Partial<BudgetExpense>) => {
    if (expense.id) {
      await updateExpense.mutateAsync(expense as BudgetExpense);
    } else {
      await addExpense.mutateAsync(expense as Omit<BudgetExpense, 'id' | 'created_at' | 'updated_at' | 'created_by'>);
    }
    setIsExpenseDialogOpen(false);
    setEditingExpense(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading budget data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Budget Overview</h3>
          <p className="text-sm text-muted-foreground">Track your subscriptions and tools</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddExpense} variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Record Expense
          </Button>
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Budget Item
          </Button>
        </div>
      </div>

      <BudgetStats budgetItems={budgetItems} />

      <BudgetComparisonChart />

      <BudgetTable
        budgetItems={budgetItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <BudgetItemDialog
        open={isItemDialogOpen}
        onOpenChange={setIsItemDialogOpen}
        onSave={handleSaveItem}
        item={editingItem}
        isLoading={addBudgetItem.isPending || updateBudgetItem.isPending}
      />

      <BudgetExpenseDialog
        open={isExpenseDialogOpen}
        onOpenChange={setIsExpenseDialogOpen}
        onSave={handleSaveExpense}
        expense={editingExpense}
        budgetItems={budgetItems}
        isLoading={addExpense.isPending || updateExpense.isPending}
      />
    </div>
  );
};

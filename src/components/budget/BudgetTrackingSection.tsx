import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BudgetStats } from './BudgetStats';
import { BudgetTable } from './BudgetTable';
import { BudgetItemDialog } from './BudgetItemDialog';
import { BudgetComparisonChart } from './BudgetComparisonChart';
import { useBudgetItems } from '@/hooks/useBudgetItems';
import { BudgetItem } from '@/types/budget';

export const BudgetTrackingSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | undefined>(undefined);
  const { budgetItems, isLoading, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useBudgetItems();

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: BudgetItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (item: Partial<BudgetItem>) => {
    if (item.id) {
      await updateBudgetItem.mutateAsync(item as BudgetItem);
    } else {
      await addBudgetItem.mutateAsync(item as Omit<BudgetItem, 'id' | 'created_at' | 'updated_at' | 'created_by'>);
    }
    setIsDialogOpen(false);
    setEditingItem(undefined);
  };

  const handleDelete = async (id: string) => {
    await deleteBudgetItem.mutateAsync(id);
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
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget Item
        </Button>
      </div>

      <BudgetStats budgetItems={budgetItems} />

      <BudgetComparisonChart />

      <BudgetTable
        budgetItems={budgetItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BudgetItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        item={editingItem}
        isLoading={addBudgetItem.isPending || updateBudgetItem.isPending}
      />
    </div>
  );
};

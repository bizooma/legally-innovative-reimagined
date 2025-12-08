import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

export interface BudgetLineItem {
  category: string;
  monthly: number;
  annual: number;
  description: string;
}

interface BudgetBreakdownEditorProps {
  items: BudgetLineItem[];
  onSave: (items: BudgetLineItem[]) => Promise<void>;
  isAdmin?: boolean;
}

export const BudgetBreakdownEditor = ({ items, onSave, isAdmin = false }: BudgetBreakdownEditorProps) => {
  const [budgetItems, setBudgetItems] = useState<BudgetLineItem[]>(items);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<BudgetLineItem>({
    category: '',
    monthly: 0,
    annual: 0,
    description: ''
  });

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({ category: '', monthly: 0, annual: 0, description: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(budgetItems[index]);
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = budgetItems.filter((_, i) => i !== index);
    setBudgetItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category.trim()) {
      toast.error('Category is required');
      return;
    }

    const updatedItems = [...budgetItems];
    if (editingIndex !== null) {
      updatedItems[editingIndex] = formData;
    } else {
      updatedItems.push(formData);
    }
    
    setBudgetItems(updatedItems);
    setIsDialogOpen(false);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await onSave(budgetItems);
      toast.success('Budget breakdown saved successfully');
    } catch (error) {
      toast.error('Failed to save budget breakdown');
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalMonthly = budgetItems.reduce((sum, item) => sum + item.monthly, 0);
  const totalAnnual = budgetItems.reduce((sum, item) => sum + item.annual, 0);

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-between items-center">
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button onClick={handleSaveAll} size="sm" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="text-right font-semibold">Monthly</TableHead>
            <TableHead className="text-right font-semibold">Annual</TableHead>
            {isAdmin && <TableHead className="w-[100px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetItems.map((item, idx) => (
            <TableRow key={idx} className="hover:bg-muted/30">
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{item.description}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.monthly)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.annual)}</TableCell>
              {isAdmin && (
                <TableCell>
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(idx)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
          <TableRow className="font-bold bg-muted border-t-2">
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{formatCurrency(totalMonthly)}</TableCell>
            <TableCell className="text-right">{formatCurrency(totalAnnual)}</TableCell>
            {isAdmin && <TableCell></TableCell>}
          </TableRow>
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Budget Category' : 'Add Budget Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category Name *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., PLG SEO & Content"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Content creation, link building"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly">Monthly Amount ($)</Label>
                  <Input
                    id="monthly"
                    type="number"
                    min="0"
                    value={formData.monthly}
                    onChange={(e) => {
                      const monthly = parseFloat(e.target.value) || 0;
                      setFormData({ ...formData, monthly, annual: monthly * 12 });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual">Annual Amount ($)</Label>
                  <Input
                    id="annual"
                    type="number"
                    min="0"
                    value={formData.annual}
                    onChange={(e) => setFormData({ ...formData, annual: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingIndex !== null ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { BudgetItem, BudgetStats as BudgetStatsType } from '@/types/budget';
import { format, addDays, parseISO } from 'date-fns';

interface BudgetStatsProps {
  budgetItems: BudgetItem[];
}

export const BudgetStats = ({ budgetItems }: BudgetStatsProps) => {
  const calculateStats = (): BudgetStatsType => {
    const active = budgetItems.filter(item => item.status === 'active');
    const today = new Date();
    const thirtyDaysFromNow = addDays(today, 30);

    const totalMonthly = active.reduce((sum, item) => {
      if (item.billing_frequency === 'monthly') return sum + Number(item.cost);
      if (item.billing_frequency === 'annual') return sum + (Number(item.cost) / 12);
      if (item.billing_frequency === 'quarterly') return sum + (Number(item.cost) / 3);
      return sum;
    }, 0);

    const totalAnnual = active.reduce((sum, item) => {
      if (item.billing_frequency === 'monthly') return sum + (Number(item.cost) * 12);
      if (item.billing_frequency === 'annual') return sum + Number(item.cost);
      if (item.billing_frequency === 'quarterly') return sum + (Number(item.cost) * 4);
      if (item.billing_frequency === 'one-time') return sum + Number(item.cost);
      return sum;
    }, 0);

    const upcomingBills = active.filter(item => {
      const billDate = parseISO(item.next_billing_date);
      return billDate >= today && billDate <= thirtyDaysFromNow;
    }).length;

    return {
      totalMonthly,
      totalAnnual,
      activeCount: active.length,
      upcomingBills,
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalMonthly.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Recurring monthly expenses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Annual Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalAnnual.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total yearly projection</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeCount}</div>
          <p className="text-xs text-muted-foreground">Currently active tools</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingBills}</div>
          <p className="text-xs text-muted-foreground">Next 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
};

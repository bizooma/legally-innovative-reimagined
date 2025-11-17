export type BillingFrequency = 'monthly' | 'annual' | 'quarterly' | 'one-time';
export type BudgetCategory = 'software' | 'marketing' | 'infrastructure' | 'other';
export type BudgetStatus = 'active' | 'cancelled' | 'trial';

export interface BudgetItem {
  id: string;
  tool_name: string;
  cost: number;
  billing_frequency: BillingFrequency;
  next_billing_date: string;
  category: BudgetCategory;
  status: BudgetStatus;
  description?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetStats {
  totalMonthly: number;
  totalAnnual: number;
  activeCount: number;
  upcomingBills: number;
}

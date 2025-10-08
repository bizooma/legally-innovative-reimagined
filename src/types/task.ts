export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'idea' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  due_date?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

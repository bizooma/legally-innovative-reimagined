export interface Lead {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';
  estimated_value?: number;
  payment_type?: 'monthly' | 'one_time';
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  converted_to_client_id?: string;
  next_follow_up?: string;
}

export interface Proposal {
  id: string;
  lead_id: string;
  title: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  document_url?: string;
  notes?: string;
  sent_date?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CrmActivity {
  id: string;
  lead_id: string;
  activity_type: 'call' | 'email' | 'meeting' | 'note' | 'proposal_sent' | 'follow_up';
  activity_date: string;
  summary: string;
  notes?: string;
  created_at: string;
  created_by: string;
}

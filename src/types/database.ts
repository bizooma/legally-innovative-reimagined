
// Custom type definitions for our database
// This avoids modifying the read-only types.ts file

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string | null;
  notes?: string | null;
  date_added: string;
  created_by: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  client_id: string;
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  progress: number;
  description?: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

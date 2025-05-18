
// This file extends the Database types from Supabase to provide additional type safety
import { Database } from '@/integrations/supabase/types';

// Define the tables we're using in our application
export interface DatabaseTables {
  clients: {
    Row: {
      id: string;
      company_name: string;
      contact_name: string;
      contact_email: string;
      contact_phone: string | null;
      notes: string | null;
      date_added: string;
      created_by: string;
    };
    Insert: {
      company_name: string;
      contact_name: string;
      contact_email: string;
      contact_phone?: string | null;
      notes?: string | null;
      created_by: string;
    };
    Update: {
      company_name?: string;
      contact_name?: string;
      contact_email?: string;
      contact_phone?: string | null;
      notes?: string | null;
    };
  };
  users: {
    Row: {
      id: string;
      email: string;
      full_name: string | null;
      is_admin: boolean;
      created_at: string;
    };
    Insert: {
      id: string;
      email: string;
      full_name?: string | null;
      is_admin?: boolean;
    };
    Update: {
      email?: string;
      full_name?: string | null;
      is_admin?: boolean;
    };
  };
}

// Define our Database interface that extends Supabase's Database type
export interface AppDatabase {
  public: {
    Tables: {
      clients: DatabaseTables['clients'];
      users: DatabaseTables['users'];
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

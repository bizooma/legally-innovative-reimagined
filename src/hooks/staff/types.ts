
import { supabase } from '@/integrations/supabase/client';

export interface StaffMember {
  id: string;
  full_name: string;
  position: string;
  email: string;
  phone: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaffDialogState {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isPasswordDialogOpen: boolean;
  currentStaffMember: StaffMember | null;
}

export type StaffFetchResponse = Awaited<ReturnType<typeof fetchStaffMembers>>;

export async function fetchStaffMembers() {
  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .order('full_name', { ascending: true });
    
  if (error) {
    throw error;
  }
  
  return data as StaffMember[];
}

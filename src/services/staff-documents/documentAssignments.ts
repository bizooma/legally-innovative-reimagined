import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentAssignment } from './types';
import type { StaffDocument } from '@/types/staffDocument';
import { StaffMember } from '@/hooks/staff/types';

export async function getStaffDocumentAssignments(staffMemberId: string): Promise<StaffDocumentAssignment[]> {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('*')
      .eq('staff_member_id', staffMemberId);

    if (error) {
      console.error("Error fetching staff document assignments:", error);
      throw error;
    }

    return data as StaffDocumentAssignment[];
  } catch (error) {
    console.error("Failed to fetch staff document assignments:", error);
    throw error;
  }
}

export async function assignDocumentToStaff(staffMemberId: string, documentId: string): Promise<StaffDocumentAssignment | null> {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .insert([{ staff_member_id: staffMemberId, document_id: documentId }])
      .select()
      .single();

    if (error) {
      console.error("Error assigning document to staff:", error);
      throw error;
    }

    return data as StaffDocumentAssignment;
  } catch (error) {
    console.error("Failed to assign document to staff:", error);
    return null;
  }
}

export async function unassignDocumentFromStaff(staffMemberId: string, documentId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .eq('staff_member_id', staffMemberId)
      .eq('document_id', documentId);

    if (error) {
      console.error("Error unassigning document from staff:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Failed to unassign document from staff:", error);
    return false;
  }
}


import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentAssignment } from './types';
import type { StaffDocument } from '@/types/staffDocument';
import { StaffMember } from '@/hooks/staff/types';

// Get document assignments for a staff member
export async function getStaffDocumentAssignments(staffMemberId: string): Promise<StaffDocumentAssignment[]> {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('*')
      .eq('staff_id', staffMemberId); // Fixed column name from staff_member_id to staff_id

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

// Get all staff members assigned to a document
export async function getDocumentAssignments(documentId: string): Promise<StaffMember[]> {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('staff_id') // Fixed column name from staff_member_id to staff_id
      .eq('document_id', documentId);

    if (error) {
      console.error("Error fetching document assignments:", error);
      throw error;
    }

    // If no assignments, return empty array
    if (!data || data.length === 0) return [];

    // Get staff details for each assignment
    const staffIds = data.map(assignment => assignment.staff_id); // Fixed column name
    const { data: staffData, error: staffError } = await supabase
      .from('staff_members')
      .select('*')
      .in('id', staffIds);

    if (staffError) {
      console.error("Error fetching staff details:", staffError);
      throw staffError;
    }

    return staffData as StaffMember[];
  } catch (error) {
    console.error("Failed to fetch document assignments:", error);
    return [];
  }
}

// Assign document to multiple staff members
export async function assignDocumentToStaff(documentId: string, staffIds: string[]): Promise<boolean> {
  try {
    const assignments = staffIds.map(staffId => ({
      document_id: documentId,
      staff_id: staffId // Fixed column name from staff_member_id to staff_id
    }));

    const { error } = await supabase
      .from('staff_document_assignments')
      .insert(assignments);

    if (error) {
      console.error("Error assigning document to staff:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Failed to assign document to staff:", error);
    return false;
  }
}

// Remove document assignment for a staff member
export async function removeDocumentAssignment(documentId: string, staffId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .eq('document_id', documentId)
      .eq('staff_id', staffId); // Fixed column name from staff_member_id to staff_id

    if (error) {
      console.error("Error removing document assignment:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Failed to remove document assignment:", error);
    return false;
  }
}

// For backwards compatibility
export const unassignDocumentFromStaff = removeDocumentAssignment;

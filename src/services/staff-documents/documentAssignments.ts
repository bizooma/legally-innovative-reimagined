
import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentAssignment } from './types';
import type { StaffDocument } from '@/types/staffDocument';
import { StaffMember } from '@/hooks/staff/types';
import { checkAssignmentExists } from './utils';

// Get document assignments for a staff member
export async function getStaffDocumentAssignments(staffMemberId: string): Promise<StaffDocumentAssignment[]> {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('*')
      .eq('staff_id', staffMemberId);

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
      .select('staff_id')
      .eq('document_id', documentId);

    if (error) {
      console.error("Error fetching document assignments:", error);
      throw error;
    }

    // If no assignments, return empty array
    if (!data || data.length === 0) return [];

    // Get staff details for each assignment
    const staffIds = data.map(assignment => assignment.staff_id);
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
    console.log(`Starting assignment of document ${documentId} to ${staffIds.length} staff members`);
    
    // Process assignments one by one to better handle errors
    for (const staffId of staffIds) {
      // Check if assignment already exists to avoid duplicate key violation
      const exists = await checkAssignmentExists(documentId, staffId);
      
      if (exists) {
        console.log(`Assignment for document ${documentId} to staff ${staffId} already exists, skipping`);
        continue;
      }
      
      console.log(`Creating assignment for document ${documentId} to staff ${staffId}`);
      
      const assignment = {
        document_id: documentId,
        staff_id: staffId
      };
      
      const { error } = await supabase
        .from('staff_document_assignments')
        .insert([assignment]);

      if (error) {
        console.error(`Error assigning document ${documentId} to staff ${staffId}:`, error);
        // Log but continue with other assignments rather than failing completely
        console.error('Continuing with other assignments...');
      } else {
        console.log(`Successfully assigned document ${documentId} to staff ${staffId}`);
      }
      
      // Small delay between inserts to avoid race conditions
      await new Promise(resolve => setTimeout(resolve, 300));
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
    console.log(`Removing assignment for document ${documentId} from staff ${staffId}`);
    
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .eq('document_id', documentId)
      .eq('staff_id', staffId);

    if (error) {
      console.error("Error removing document assignment:", error);
      throw error;
    }

    console.log(`Successfully removed assignment for document ${documentId} from staff ${staffId}`);
    return true;
  } catch (error) {
    console.error("Failed to remove document assignment:", error);
    return false;
  }
}

// Remove all assignments for a document
export async function removeAllDocumentAssignments(documentId: string): Promise<boolean> {
  try {
    console.log(`Removing all assignments for document ${documentId}`);
    
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .eq('document_id', documentId);

    if (error) {
      console.error("Error removing document assignments:", error);
      throw error;
    }

    console.log(`Successfully removed all assignments for document ${documentId}`);
    return true;
  } catch (error) {
    console.error("Failed to remove all document assignments:", error);
    return false;
  }
}

// For backwards compatibility
export const unassignDocumentFromStaff = removeDocumentAssignment;

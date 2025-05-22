
import { supabase } from '@/integrations/supabase/client';
import { StaffDocument, StaffDocumentWithUrl } from './types';
import { StaffMember } from '@/hooks/useStaffMembers';
import { createSignedUrl } from './utils';

/**
 * Assign a document to staff members
 */
export const assignDocumentToStaff = async (
  documentId: string,
  staffIds: string[]
): Promise<boolean> => {
  try {
    // Create an array of assignments
    const assignments = staffIds.map(staffId => ({
      document_id: documentId,
      staff_id: staffId,
    }));

    // Insert assignments
    const { error } = await supabase
      .from('staff_document_assignments')
      .insert(assignments);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Assign document error:', error);
    return false;
  }
};

/**
 * Get document assignments (which staff members are assigned to a document)
 */
export const getDocumentAssignments = async (documentId: string): Promise<StaffMember[]> => {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select(`
        staff_id,
        staff_members:staff_id (*)
      `)
      .eq('document_id', documentId);

    if (error) throw error;

    // Extract the staff members from the data and ensure proper type casting
    return data?.map(item => item.staff_members as unknown as StaffMember) || [];
  } catch (error) {
    console.error('Get document assignments error:', error);
    return [];
  }
};

/**
 * Remove a document assignment
 */
export const removeDocumentAssignment = async (
  documentId: string,
  staffId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .match({ document_id: documentId, staff_id: staffId });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Remove assignment error:', error);
    return false;
  }
};

/**
 * Get documents assigned to a staff member
 */
export const getStaffDocuments = async (staffId: string): Promise<StaffDocumentWithUrl[]> => {
  try {
    console.log('Fetching documents for staff member:', staffId);
    
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select(`
        document_id,
        staff_documents:document_id (*)
      `)
      .eq('staff_id', staffId);

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    console.log('Raw assignment data:', data);

    // Extract the documents and properly cast the type
    const documents = data?.map(item => {
      return item.staff_documents as unknown as StaffDocument;
    }) || [];
    
    console.log('Extracted documents:', documents);

    // Get signed URLs for each document
    const documentsWithUrls = await Promise.all(
      documents.map(async (doc) => {
        const url = await createSignedUrl(doc.file_path);
        return {
          ...doc,
          url
        };
      })
    );
    
    console.log('Documents with URLs:', documentsWithUrls);

    return documentsWithUrls;
  } catch (error) {
    console.error('Get staff documents error:', error);
    return [];
  }
};


import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentWithUrl } from './types';

// Storage bucket for staff documents
export const STORAGE_BUCKET = 'staff_documents';

/**
 * Format file size to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) return kilobytes.toFixed(1) + ' KB';
  const megabytes = kilobytes / 1024;
  return megabytes.toFixed(1) + ' MB';
};

/**
 * Create a signed URL for a file path
 */
export const createSignedUrl = async (filePath: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry

    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return '';
  }
};

/**
 * Check if an assignment already exists
 */
export const checkAssignmentExists = async (documentId: string, staffId: string): Promise<boolean> => {
  try {
    console.log(`Checking if assignment exists for document ${documentId} and staff ${staffId}`);
    
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('id')
      .eq('document_id', documentId)
      .eq('staff_id', staffId)
      .maybeSingle();

    if (error) {
      console.error('Error checking assignment:', error);
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkAssignmentExists:', error);
    return false;
  }
};

/**
 * Get documents assigned to a staff member
 */
export async function getStaffDocuments(staffMemberId: string): Promise<StaffDocumentWithUrl[]> {
  try {
    if (!staffMemberId) {
      console.error('No staff member ID provided');
      throw new Error('No staff member ID provided');
    }

    console.log(`Fetching documents for staff ID: ${staffMemberId}`);

    // First get document IDs assigned to the staff member
    const { data: assignments, error: assignmentError } = await supabase
      .from('staff_document_assignments')
      .select('document_id')
      .eq('staff_id', staffMemberId);

    if (assignmentError) {
      console.error('Error fetching staff document assignments:', assignmentError);
      throw assignmentError;
    }

    // If no assignments, return empty array
    if (!assignments || assignments.length === 0) {
      console.log(`No documents assigned to staff ID: ${staffMemberId}`);
      return [];
    }

    console.log(`Found ${assignments.length} document assignments for staff ID: ${staffMemberId}`);
    
    // Get document details for each assignment
    const documentIds = assignments.map(assignment => assignment.document_id);
    const { data: documents, error: documentError } = await supabase
      .from('staff_documents')
      .select('*')
      .in('id', documentIds);

    if (documentError) {
      console.error('Error fetching staff documents:', documentError);
      throw documentError;
    }

    console.log(`Retrieved ${documents?.length || 0} documents for staff ID: ${staffMemberId}`);
    
    // Get signed URLs for each document
    const documentsWithUrls = await Promise.all(
      (documents || []).map(async (doc) => {
        const url = await createSignedUrl(doc.file_path);
        return {
          ...doc,
          url
        };
      })
    );

    return documentsWithUrls;
  } catch (error) {
    console.error('Error fetching staff documents:', error);
    return [];
  }
}

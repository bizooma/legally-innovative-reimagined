
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
 * Get documents assigned to a staff member
 */
export async function getStaffDocuments(staffMemberId: string): Promise<StaffDocumentWithUrl[]> {
  try {
    if (!staffMemberId) {
      console.error('No staff member ID provided');
      throw new Error('No staff member ID provided');
    }

    // First get document IDs assigned to the staff member
    const { data: assignments, error: assignmentError } = await supabase
      .from('staff_document_assignments')
      .select('document_id')
      .eq('staff_member_id', staffMemberId);

    if (assignmentError) throw assignmentError;

    // If no assignments, return empty array
    if (!assignments || assignments.length === 0) return [];

    // Get document details for each assignment
    const documentIds = assignments.map(assignment => assignment.document_id);
    const { data: documents, error: documentError } = await supabase
      .from('staff_documents')
      .select('*')
      .in('id', documentIds);

    if (documentError) throw documentError;

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

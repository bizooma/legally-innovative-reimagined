
import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentWithUrl } from './types';
import { toast } from '@/hooks/use-toast';

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
 * If bucket doesn't exist or user lacks access, returns an empty string
 */
export const createSignedUrl = async (filePath: string): Promise<string> => {
  try {
    console.log(`Creating signed URL for file: ${filePath}`);
    
    if (!filePath) {
      console.error('Cannot create signed URL - empty file path');
      return '';
    }
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 60 * 5); // 5 minutes expiry (shorter for security)

    if (error) {
      console.error('Error creating signed URL:', error);
      
      if (error.message.includes('permission') || error.message.includes('access')) {
        toast({
          title: "Permission denied",
          description: "You don't have permission to access this document.",
          variant: "destructive",
        });
      }
      
      return '';
    }
    
    if (!data?.signedUrl) {
      console.error('No signed URL returned', data);
      return '';
    }
    
    console.log(`Successfully created signed URL for: ${filePath}`);
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

    console.log(`Assignment check result for document ${documentId} and staff ${staffId}:`, !!data);
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
      console.error('No staff member ID provided to getStaffDocuments');
      throw new Error('No staff member ID provided');
    }

    console.log(`[DOCUMENT-DEBUG] Fetching documents for staff ID: ${staffMemberId}`);

    // IMPORTANT: First get document IDs assigned to the staff member
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
      console.log(`[DOCUMENT-DEBUG] No documents assigned to staff ID: ${staffMemberId}`);
      return [];
    }

    // Log all assignments for debugging
    console.log(`[DOCUMENT-DEBUG] Found ${assignments.length} document assignments for staff ${staffMemberId}`);
    console.log('[DOCUMENT-DEBUG] Assignment document IDs:', assignments.map(a => a.document_id));
    
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

    console.log(`[DOCUMENT-DEBUG] Retrieved ${documents?.length || 0} documents for staff ID: ${staffMemberId}`);
    
    if (!documents || documents.length === 0) {
      console.log('[DOCUMENT-DEBUG] No documents found despite having assignments');
      return [];
    }
    
    // Check if we have access to the storage bucket before trying to get URLs
    const { data: bucketCheck, error: bucketError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list();
      
    const canAccessBucket = !bucketError && !!bucketCheck;
    
    if (!canAccessBucket) {
      console.error('Cannot access storage bucket:', bucketError);
      // Still return documents, but URLs will be empty
    }
    
    // Get signed URLs for each document if we have bucket access
    const documentsWithUrls = await Promise.all(
      documents.map(async (doc) => {
        let url = '';
        
        if (canAccessBucket) {
          try {
            url = await createSignedUrl(doc.file_path);
            if (!url) {
              console.warn(`[DOCUMENT-DEBUG] Failed to create signed URL for document: ${doc.id} - ${doc.name}`);
            } else {
              console.log(`[DOCUMENT-DEBUG] Successfully created URL for document: ${doc.id}`);
            }
          } catch (urlError) {
            console.error(`[DOCUMENT-DEBUG] Error creating URL for document ${doc.id}:`, urlError);
          }
        }
        
        return {
          ...doc,
          url
        };
      })
    );

    console.log(`[DOCUMENT-DEBUG] Returning ${documentsWithUrls.length} documents with URLs`);
    return documentsWithUrls;
  } catch (error) {
    console.error('Error fetching staff documents:', error);
    return [];
  }
}

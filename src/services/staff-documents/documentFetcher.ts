
import { supabase } from '@/integrations/supabase/client';
import { StaffDocumentWithUrl } from './types';
import { toast } from '@/hooks/use-toast';
import { createSignedUrl } from './urlUtils';
import { STORAGE_BUCKET } from './fileUtils';

/**
 * Get all documents (visible to all staff members)
 * 
 * This function returns ALL documents regardless of staff assignment
 */
export async function getStaffDocuments(staffMemberId?: string): Promise<StaffDocumentWithUrl[]> {
  try {
    console.log(`[DOCUMENT-DEBUG] Fetching all staff documents (visible to all)`);

    // Fetch all documents directly, ignoring assignments
    const { data: documents, error: documentError } = await supabase
      .from('staff_documents')
      .select('*');

    if (documentError) {
      console.error('Error fetching staff documents:', documentError);
      toast({
        title: "Error fetching documents",
        description: "Could not retrieve document details. Please try again.",
        variant: "destructive",
      });
      return [];
    }

    console.log(`[DOCUMENT-DEBUG] Retrieved ${documents?.length || 0} documents (all documents)`);
    
    if (!documents || documents.length === 0) {
      console.log('[DOCUMENT-DEBUG] No documents found in the system');
      return [];
    }
    
    // Check if we have access to the storage bucket before trying to get URLs
    const { data: bucketCheck, error: bucketError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list('', { limit: 1 }); // Just try to list one file to check access
      
    const canAccessBucket = !bucketError;
    
    if (!canAccessBucket) {
      console.error('Cannot access storage bucket:', bucketError);
      // Still return documents, but URLs will be empty
      toast({
        title: "Storage access issue",
        description: "Document preview unavailable. Storage access required.",
        variant: "default",
      });
    } else {
      console.log('[DOCUMENT-DEBUG] Successfully accessed storage bucket');
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
    toast({
      title: "Error",
      description: "Failed to load documents. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
}

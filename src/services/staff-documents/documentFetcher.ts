
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
    console.log(`[DOCUMENT-DEBUG] Fetching all staff documents`);

    // Fetch all documents directly, ignoring assignments
    const { data: documents, error: documentError } = await supabase
      .from('staff_documents')
      .select('*')
      .order('created_at', { ascending: false });

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
    
    // Check bucket public access status
    console.log(`[DOCUMENT-DEBUG] Checking bucket public access status for: ${STORAGE_BUCKET}`);
    const { data: bucketInfo, error: bucketError } = await supabase
      .storage
      .getBucket(STORAGE_BUCKET);
      
    const bucketIsPublic = bucketInfo?.public || false;
    console.log(`[DOCUMENT-DEBUG] Bucket ${STORAGE_BUCKET} is public: ${bucketIsPublic}`);
    
    // Get URLs for each document
    const documentsWithUrls = await Promise.all(
      documents.map(async (doc) => {
        let url = '';
        
        try {
          if (doc.file_path) {
            // Remove any leading slashes for consistency
            const cleanPath = doc.file_path.replace(/^\/+/, '');
            console.log(`[DOCUMENT-DEBUG] Getting URL for document: ${doc.name} (path: ${cleanPath})`);
            
            // Try using public URL first
            const { data: publicUrlData } = supabase
              .storage
              .from(STORAGE_BUCKET)
              .getPublicUrl(cleanPath);
              
            url = publicUrlData?.publicUrl || '';
            
            if (!url) {
              console.log(`[DOCUMENT-DEBUG] Public URL failed, trying signed URL for: ${cleanPath}`);
              url = await createSignedUrl(cleanPath);
            }
            
            console.log(`[DOCUMENT-DEBUG] Final URL for ${doc.name}: ${url ? `${url.substring(0, 50)}...` : 'NONE'}`);
          } else {
            console.log(`[DOCUMENT-DEBUG] Document ${doc.id} has no file path`);
          }
        } catch (urlError) {
          console.error(`[DOCUMENT-DEBUG] Error creating URL for document ${doc.id}:`, urlError);
        }
        
        return {
          ...doc,
          url
        };
      })
    );

    console.log(`[DOCUMENT-DEBUG] Returning ${documentsWithUrls.length} documents with URLs`);
    // Print first document path and URL for debugging
    if (documentsWithUrls.length > 0) {
      console.log(`[DOCUMENT-DEBUG] First document: ${documentsWithUrls[0].name}`);
      console.log(`[DOCUMENT-DEBUG] First document file_path: ${documentsWithUrls[0].file_path}`);
      console.log(`[DOCUMENT-DEBUG] First document URL: ${documentsWithUrls[0].url ? documentsWithUrls[0].url.substring(0, 100) : 'NONE'}`);
    }
    
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

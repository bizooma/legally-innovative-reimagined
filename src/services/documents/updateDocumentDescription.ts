
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Updates the description of a document
 * 
 * This function uses the metadata API of Supabase Storage
 * to update only the description metadata without re-uploading the file
 */
export async function updateDocumentDescription(path: string, description: string): Promise<boolean> {
  try {
    // Update metadata for the file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .updateMetadata(path, {
        cacheControl: '3600',
        contentType: 'application/octet-stream',
        upsert: true,
        customMetadata: {
          description: description
        }
      });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    toast.error(`Failed to update description: ${error.message}`);
    console.error('Error updating document description:', error);
    return false;
  }
}

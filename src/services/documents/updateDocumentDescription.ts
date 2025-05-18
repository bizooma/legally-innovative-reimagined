
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Updates the description of a document
 */
export async function updateDocumentDescription(path: string, description: string): Promise<boolean> {
  try {
    // First, download the file to get its content
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(path);
    
    if (downloadError) {
      throw downloadError;
    }
    
    if (!fileData) {
      throw new Error("File not found");
    }
    
    // Re-upload the file with updated metadata
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, fileData, {
        upsert: true, // Override the existing file
        metadata: {
          description: description
        }
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    return true;
  } catch (error: any) {
    toast.error(`Failed to update description: ${error.message}`);
    console.error('Error updating document description:', error);
    return false;
  }
}

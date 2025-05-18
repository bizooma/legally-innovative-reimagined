
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Deletes a document from storage
 */
export async function deleteDocument(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    toast.error(`Delete failed: ${error.message}`);
    console.error('Error deleting document:', error);
    return false;
  }
}


import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';
import { handleStorageOperation } from '@/utils/storageErrorUtils';

/**
 * Deletes a document from storage
 */
export async function deleteDocument(path: string): Promise<boolean> {
  const result = await handleStorageOperation(
    async () => {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);
      
      if (error) throw error;
      return true;
    }
  );
  
  if (!result.success) {
    toast.error(`Delete failed: ${result.errorMessage}`);
    console.error('Error deleting document:', result.errorMessage);
    return false;
  }
  
  return true;
}

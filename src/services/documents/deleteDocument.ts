
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Deletes a document from both storage and database
 */
export async function deleteDocument(path: string): Promise<boolean> {
  try {
    console.log('Deleting document with path:', path);
    
    // First, find the document record by file path
    const { data: document, error: findError } = await supabase
      .from('documents')
      .select('id')
      .eq('file_path', path)
      .single();
    
    if (findError) {
      console.error('Error finding document:', findError);
      // If we can't find the document in DB, still try to delete from storage
    }
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    if (storageError) {
      console.error('Storage deletion error:', storageError);
      throw storageError;
    }
    
    console.log('File deleted from storage successfully');
    
    // Delete from database if we found the record
    if (document) {
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id);
      
      if (dbError) {
        console.error('Error deleting from database:', dbError);
        // Don't fail the entire operation if DB deletion fails
      } else {
        console.log('Document deleted from database successfully');
      }
    }
    
    return true;
  } catch (error: any) {
    console.error('Error deleting document:', error);
    toast.error(`Delete failed: ${error.message}`);
    return false;
  }
}

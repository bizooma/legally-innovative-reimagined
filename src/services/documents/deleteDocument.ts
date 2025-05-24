
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
      .select('id, file_path')
      .eq('file_path', path)
      .single();
    
    if (findError) {
      console.error('Error finding document:', findError);
      toast.error(`Document not found: ${findError.message}`);
      return false;
    }
    
    if (!document) {
      console.error('Document not found with path:', path);
      toast.error('Document not found');
      return false;
    }

    console.log('Found document to delete:', document);
    
    // Delete from database first
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', document.id);
    
    if (dbError) {
      console.error('Error deleting from database:', dbError);
      toast.error(`Database deletion failed: ${dbError.message}`);
      return false;
    }
    
    console.log('Document deleted from database successfully');
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    if (storageError) {
      console.error('Storage deletion error:', storageError);
      // Don't fail the entire operation if storage deletion fails
      // since the database record is already deleted
      console.warn('Storage deletion failed but database record was removed');
    } else {
      console.log('File deleted from storage successfully');
    }
    
    return true;
  } catch (error: any) {
    console.error('Error deleting document:', error);
    toast.error(`Delete failed: ${error.message}`);
    return false;
  }
}

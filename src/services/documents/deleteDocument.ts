
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Deletes a document from both storage and database
 */
export async function deleteDocument(path: string): Promise<boolean> {
  try {
    console.log('=== DELETE DOCUMENT START ===');
    console.log('Environment:', window.location.hostname);
    console.log('Deleting document with path:', path);
    console.log('Bucket name:', BUCKET_NAME);
    
    // Check authentication state first
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Authentication error during deletion:', authError);
      toast.error('Authentication error - please log in again');
      return false;
    }
    
    if (!session?.user) {
      console.error('No authenticated user found');
      toast.error('You must be logged in to delete documents');
      return false;
    }
    
    console.log('Authenticated user:', session.user.id);
    
    // First, find the document record by file path
    console.log('Step 1: Finding document in database...');
    const { data: document, error: findError } = await supabase
      .from('documents')
      .select('id, file_path, client_id')
      .eq('file_path', path)
      .single();
    
    if (findError) {
      console.error('Error finding document:', findError);
      console.log('Find error details:', {
        code: findError.code,
        message: findError.message,
        details: findError.details,
        hint: findError.hint
      });
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
    console.log('Step 2: Deleting from database...');
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', document.id);
    
    if (dbError) {
      console.error('Database deletion error:', dbError);
      console.log('DB error details:', {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint
      });
      toast.error(`Database deletion failed: ${dbError.message}`);
      return false;
    }
    
    console.log('Document deleted from database successfully');
    
    // Verify database deletion immediately
    console.log('Step 3: Verifying database deletion...');
    const { data: verifyDb, error: verifyDbError } = await supabase
      .from('documents')
      .select('id')
      .eq('file_path', path)
      .maybeSingle();
    
    if (verifyDbError) {
      console.error('Database verification error:', verifyDbError);
    } else if (verifyDb) {
      console.error('WARNING: Document still exists in database after deletion!');
      return false;
    } else {
      console.log('✓ Database deletion verified');
    }
    
    // Delete from storage with retry mechanism
    console.log('Step 4: Deleting from storage...');
    let storageDeleteSuccess = false;
    let storageAttempts = 0;
    const maxStorageAttempts = 3;
    
    while (!storageDeleteSuccess && storageAttempts < maxStorageAttempts) {
      storageAttempts++;
      console.log(`Storage deletion attempt ${storageAttempts}/${maxStorageAttempts}`);
      
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);
      
      if (storageError) {
        console.error(`Storage deletion attempt ${storageAttempts} failed:`, storageError);
        console.log('Storage error details:', {
          message: storageError.message,
          name: storageError.name
        });
        
        if (storageAttempts < maxStorageAttempts) {
          console.log('Retrying storage deletion...');
          await new Promise(resolve => setTimeout(resolve, 1000 * storageAttempts));
        }
      } else {
        console.log('✓ File deleted from storage successfully');
        storageDeleteSuccess = true;
      }
    }
    
    if (!storageDeleteSuccess) {
      console.warn('Storage deletion failed after all attempts, but database record was removed');
    }
    
    // Final verification - check both database and attempt to access storage
    console.log('Step 5: Final verification...');
    const { data: finalVerifyData, error: finalVerifyError } = await supabase
      .from('documents')
      .select('id')
      .eq('file_path', path)
      .maybeSingle();
    
    if (finalVerifyError) {
      console.error('Final verification error:', finalVerifyError);
    }
    
    if (finalVerifyData) {
      console.error('CRITICAL: Document still exists in database after deletion attempt');
      return false;
    }
    
    console.log('✓ Final verification: Document deletion confirmed');
    console.log('=== DELETE DOCUMENT SUCCESS ===');
    return true;
  } catch (error: any) {
    console.error('=== DELETE DOCUMENT FAILED ===');
    console.error('Unexpected error during deletion:', error);
    console.log('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    toast.error(`Delete failed: ${error.message}`);
    return false;
  }
}

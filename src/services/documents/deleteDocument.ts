
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Deletes a document from both storage and database
 */
export async function deleteDocument(path: string): Promise<boolean> {
  try {
    console.log('=== DELETE DOCUMENT DEBUG START ===');
    console.log('Environment:', window.location.hostname);
    console.log('Supabase URL:', 'https://hvyjvbdforunsjgqhhny.supabase.co');
    console.log('Document path to delete:', path);
    console.log('Bucket name:', BUCKET_NAME);
    console.log('Timestamp:', new Date().toISOString());
    
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
    console.log('Step 1: Finding document in database by path...');
    const { data: document, error: findError } = await supabase
      .from('documents')
      .select('id, file_path, client_id, name')
      .eq('file_path', path)
      .single();
    
    console.log('Document lookup result:', { document, findError });
    
    if (findError) {
      console.error('Error finding document:', findError);
      console.log('Find error details:', {
        code: findError.code,
        message: findError.message,
        details: findError.details,
        hint: findError.hint
      });
      
      // Try alternative approach - search all documents to see what exists
      console.log('Attempting alternative search to see what documents exist...');
      const { data: allDocs, error: allDocsError } = await supabase
        .from('documents')
        .select('id, file_path, name');
      
      console.log('All documents in database:', allDocs);
      console.log('All docs error:', allDocsError);
      
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
    
    console.log('Database deletion result:', { dbError });
    
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
    
    console.log('✅ Document deleted from database successfully');
    
    // Verify database deletion immediately
    console.log('Step 3: Verifying database deletion...');
    const { data: verifyDb, error: verifyDbError } = await supabase
      .from('documents')
      .select('id')
      .eq('file_path', path)
      .maybeSingle();
    
    console.log('Database verification result:', { verifyDb, verifyDbError });
    
    if (verifyDbError) {
      console.error('Database verification error:', verifyDbError);
    } else if (verifyDb) {
      console.error('❌ WARNING: Document still exists in database after deletion!');
      return false;
    } else {
      console.log('✅ Database deletion verified - document no longer exists');
    }
    
    // Delete from storage
    console.log('Step 4: Deleting from storage...');
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    console.log('Storage deletion result:', { storageError });
    
    if (storageError) {
      console.warn('Storage deletion failed:', storageError);
      console.log('Storage error details:', {
        message: storageError.message,
        name: storageError.name
      });
      // Don't fail the whole operation for storage issues
    } else {
      console.log('✅ File deleted from storage successfully');
    }
    
    console.log('✅ DELETE DOCUMENT COMPLETED SUCCESSFULLY');
    console.log('=== DELETE DOCUMENT DEBUG END ===');
    return true;
  } catch (error: any) {
    console.error('=== DELETE DOCUMENT ERROR ===');
    console.error('Unexpected error during deletion:', error);
    console.log('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      environment: window.location.hostname,
      path: path
    });
    console.error('=== END DELETE ERROR ===');
    toast.error(`Delete failed: ${error.message}`);
    return false;
  }
}

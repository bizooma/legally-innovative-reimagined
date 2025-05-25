
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Updates the description of a document in the database
 */
export async function updateDocumentDescription(documentId: string, description: string): Promise<boolean> {
  try {
    console.log('=== UPDATE DOCUMENT DESCRIPTION START ===');
    console.log('Document ID:', documentId);
    console.log('New description:', description);
    console.log('Environment:', window.location.hostname);
    
    // Check authentication state first
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Authentication error during update:', authError);
      toast.error('Authentication error - please log in again');
      return false;
    }
    
    if (!session?.user) {
      console.error('No authenticated user found');
      toast.error('You must be logged in to update documents');
      return false;
    }
    
    console.log('Authenticated user:', session.user.id);
    console.log('Session details:', {
      access_token: session.access_token ? 'Present' : 'Missing',
      refresh_token: session.refresh_token ? 'Present' : 'Missing',
      expires_at: session.expires_at,
      user_role: session.user.role
    });
    
    // Test basic database connectivity
    console.log('Testing basic database connection...');
    const { data: testData, error: testError } = await supabase
      .from('documents')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('Basic database test failed:', testError);
      toast.error('Database connection issue');
      return false;
    }
    
    console.log('Database connection test passed');
    
    // First, verify the document exists
    console.log('Checking if document exists...');
    const { data: existingDoc, error: findError } = await supabase
      .from('documents')
      .select('id, name, client_id')
      .eq('id', documentId)
      .single();
    
    if (findError) {
      console.error('Error finding document:', findError);
      toast.error(`Document not found: ${findError.message}`);
      return false;
    }
    
    console.log('Found document:', existingDoc);
    
    // Try a simple update first without the timestamp
    console.log('Attempting simple update without timestamp...');
    const { data: simpleData, error: simpleError } = await supabase
      .from('documents')
      .update({ description: description })
      .eq('id', documentId)
      .select()
      .single();
    
    if (simpleError) {
      console.error('Simple update failed:', simpleError);
      console.log('Simple update error details:', {
        code: simpleError.code,
        message: simpleError.message,
        details: simpleError.details,
        hint: simpleError.hint
      });
      
      // Try an even more basic update with raw SQL
      console.log('Trying raw SQL update...');
      const { data: rawData, error: rawError } = await supabase
        .rpc('update_document_description', { 
          doc_id: documentId, 
          new_description: description 
        });
      
      if (rawError) {
        console.error('Raw SQL update also failed:', rawError);
        toast.error(`All update methods failed: ${simpleError.message}`);
        return false;
      }
      
      console.log('Raw SQL update succeeded:', rawData);
      toast.success('Description updated successfully (via raw SQL)');
      return true;
    }
    
    console.log('Simple update succeeded:', simpleData);
    console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
    toast.success('Description updated successfully');
    return true;
  } catch (error: any) {
    console.error('=== UPDATE DOCUMENT DESCRIPTION FAILED ===');
    console.error('Unexpected error updating document description:', error);
    console.log('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    toast.error(`Failed to update description: ${error.message}`);
    return false;
  }
}

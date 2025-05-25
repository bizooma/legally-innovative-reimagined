
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
    
    // Update the document description in the database with explicit timestamp
    console.log('Performing update...');
    const { data, error } = await supabase
      .from('documents')
      .update({ 
        description: description,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)
      .select()
      .single();
    
    if (error) {
      console.error('Database update error:', error);
      console.log('Update error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      toast.error(`Failed to update description: ${error.message}`);
      return false;
    }
    
    console.log('Document description updated successfully:', data);
    console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
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

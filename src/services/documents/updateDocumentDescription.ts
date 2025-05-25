
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
    
    // Try direct table update first since RLS is disabled
    console.log('Attempting direct table update...');
    const { data, error } = await supabase
      .from('documents')
      .update({ 
        description: description,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)
      .select();
    
    console.log('Direct update response:', { data, error });
    
    if (error) {
      console.error('Direct update failed:', error);
      
      // Fallback to database function
      console.log('Trying database function as fallback...');
      const { data: result, error: functionError } = await supabase
        .rpc('update_document_description', { 
          doc_id: documentId, 
          new_description: description 
        });
      
      console.log('Database function response:', { result, error: functionError });
      
      if (functionError) {
        console.error('Database function also failed:', functionError);
        toast.error(`Update failed: ${functionError.message}`);
        return false;
      }
      
      if (result === true) {
        console.log('Database function succeeded');
        console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
        toast.success('Description updated successfully');
        return true;
      } else {
        console.error('Database function returned false');
        toast.error('Document not found or could not be updated');
        return false;
      }
    }
    
    if (data && data.length > 0) {
      console.log('Direct update succeeded:', data);
      console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
      toast.success('Description updated successfully');
      return true;
    } else {
      console.error('Direct update returned no data');
      toast.error('Document not found or could not be updated');
      return false;
    }
  } catch (error: any) {
    console.error('=== UPDATE DOCUMENT DESCRIPTION FAILED ===');
    console.error('Unexpected error updating document description:', error);
    toast.error(`Failed to update description: ${error.message}`);
    return false;
  }
}

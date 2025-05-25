
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
    
    // Call the database function directly - this should bypass RLS
    console.log('Calling database function update_document_description...');
    const { data: result, error: functionError } = await supabase
      .rpc('update_document_description', { 
        doc_id: documentId, 
        new_description: description 
      });
    
    console.log('Database function response:', { result, error: functionError });
    
    if (functionError) {
      console.error('Database function failed:', functionError);
      toast.error(`Update failed: ${functionError.message}`);
      return false;
    }
    
    if (result === true) {
      console.log('Database function succeeded');
      console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
      toast.success('Description updated successfully');
      return true;
    } else {
      console.error('Database function returned false - document not found or not updated');
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

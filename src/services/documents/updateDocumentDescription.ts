
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
    
    // Use the database function with SECURITY DEFINER to bypass all RLS
    console.log('Calling update_document_description function...');
    const { data: result, error } = await supabase
      .rpc('update_document_description', { 
        doc_id: documentId, 
        new_description: description 
      });
    
    console.log('Function response:', { result, error });
    
    if (error) {
      console.error('Function call failed:', error);
      toast.error(`Update failed: ${error.message}`);
      return false;
    }
    
    if (result === true) {
      console.log('Description update successful');
      console.log('=== UPDATE DOCUMENT DESCRIPTION SUCCESS ===');
      toast.success('Description updated successfully');
      return true;
    } else {
      console.error('Function returned false - document not found');
      toast.error('Document not found or could not be updated');
      return false;
    }
  } catch (error: any) {
    console.error('=== UPDATE DOCUMENT DESCRIPTION FAILED ===');
    console.error('Unexpected error:', error);
    toast.error(`Failed to update description: ${error.message}`);
    return false;
  }
}

/** Flips whether the client can see a document. Throws the real database error on failure. */
export async function setDocumentClientVisibility(docId: string, visible: boolean): Promise<void> {
  const { data, error } = await supabase
    .from('documents')
    .update({ is_client_visible: visible })
    .eq('id', docId)
    .select('id');
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error('No document was updated — you may not have permission to change it.');
}


import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Updates the description of a document in the database
 */
export async function updateDocumentDescription(documentId: string, description: string): Promise<boolean> {
  try {
    console.log('Updating document description:', { documentId, description });
    
    // Update the document description in the database
    const { error } = await supabase
      .from('documents')
      .update({ 
        description: description,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId);
    
    if (error) {
      console.error('Database update error:', error);
      throw error;
    }
    
    console.log('Document description updated successfully');
    return true;
  } catch (error: any) {
    console.error('Error updating document description:', error);
    toast.error(`Failed to update description: ${error.message}`);
    return false;
  }
}

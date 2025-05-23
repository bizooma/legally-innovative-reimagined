
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if an assignment already exists
 */
export const checkAssignmentExists = async (documentId: string, staffId: string): Promise<boolean> => {
  try {
    console.log(`Checking if assignment exists for document ${documentId} and staff ${staffId}`);
    
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select('id')
      .eq('document_id', documentId)
      .eq('staff_id', staffId)
      .maybeSingle();

    if (error) {
      console.error('Error checking assignment:', error);
      throw error;
    }

    console.log(`Assignment check result for document ${documentId} and staff ${staffId}:`, !!data);
    return !!data;
  } catch (error) {
    console.error('Error in checkAssignmentExists:', error);
    return false;
  }
};

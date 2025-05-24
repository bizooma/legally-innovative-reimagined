
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Document } from '@/types/document';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Fetches all documents for a specific client from the database
 */
export async function fetchClientDocuments(clientId: string): Promise<Document[]> {
  try {
    console.log('Fetching documents for client:', clientId);
    
    // Fetch documents from database
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log('No documents found for client');
      return [];
    }
    
    console.log(`Found ${data.length} documents for client`);
    
    // Map database records to Document interface
    const documents: Document[] = data.map((record) => {
      // Get public URL for each document
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(record.file_path);
      
      return {
        id: record.id,
        name: record.name,
        type: record.file_type,
        size: record.file_size,
        lastUpdated: new Date(record.updated_at).toISOString().split('T')[0],
        path: record.file_path,
        url: urlData.publicUrl,
        description: record.description || ''
      };
    });
    
    console.log('Mapped documents:', documents);
    return documents;
  } catch (error: any) {
    console.error('Error in fetchClientDocuments:', error);
    toast.error(`Failed to fetch documents: ${error.message}`);
    return [];
  }
}

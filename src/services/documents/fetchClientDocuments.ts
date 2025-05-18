
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Document } from '@/types/document';
import { formatFileSize, getFileType } from '@/utils/fileUtils';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Fetches all documents for a specific client
 */
export async function fetchClientDocuments(clientId: string): Promise<Document[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(`${clientId}/`, {
        sortBy: { column: 'name', order: 'asc' },
      });
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Map the storage objects to our Document interface
    const documents: Document[] = await Promise.all(
      data.filter(item => !item.id.endsWith('/'))
        .map(async (item) => {
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(`${clientId}/${item.name}`);
          
          // Extract description from metadata if available
          const description = item.metadata?.description || '';
          
          return {
            id: item.id,
            name: item.name.split('/').pop() || item.name,
            type: getFileType(item.name),
            size: formatFileSize(item.metadata?.size || 0),
            lastUpdated: new Date(item.updated_at || Date.now()).toISOString().split('T')[0],
            path: `${clientId}/${item.name}`,
            url: urlData.publicUrl,
            description: description
          };
        })
    );
    
    return documents;
  } catch (error: any) {
    toast.error(`Failed to fetch documents: ${error.message}`);
    console.error('Error fetching documents:', error);
    return [];
  }
}

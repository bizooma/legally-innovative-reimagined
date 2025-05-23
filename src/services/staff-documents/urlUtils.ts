
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { STORAGE_BUCKET } from './fileUtils';

/**
 * Create a signed URL for a file path
 * If bucket doesn't exist or user lacks access, returns an empty string
 */
export const createSignedUrl = async (filePath: string): Promise<string> => {
  try {
    console.log(`Creating signed URL for file: ${filePath}`);
    
    if (!filePath) {
      console.error('Cannot create signed URL - empty file path');
      return '';
    }
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 60 * 5); // 5 minutes expiry (shorter for security)

    if (error) {
      console.error('Error creating signed URL:', error);
      
      if (error.message.includes('permission') || error.message.includes('access')) {
        toast({
          title: "Permission denied",
          description: "You don't have permission to access this document.",
          variant: "destructive",
        });
      }
      
      return '';
    }
    
    if (!data?.signedUrl) {
      console.error('No signed URL returned', data);
      return '';
    }
    
    console.log(`Successfully created signed URL for: ${filePath}`);
    return data.signedUrl;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return '';
  }
};

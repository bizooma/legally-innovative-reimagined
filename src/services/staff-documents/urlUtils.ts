
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { STORAGE_BUCKET } from './fileUtils';

/**
 * Create a signed URL for a file path
 * If bucket doesn't exist or user lacks access, returns an empty string
 */
export const createSignedUrl = async (filePath: string): Promise<string> => {
  try {
    console.log(`Creating URL for file: ${filePath}`);
    
    if (!filePath) {
      console.error('Cannot create URL - empty file path');
      return '';
    }
    
    // Make sure filePath doesn't have a leading slash when accessing Supabase storage
    const normalizedPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    console.log(`Normalized file path: ${normalizedPath}`);
    
    // First try to get a public URL since our bucket should be public
    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(normalizedPath);
      
    if (publicUrlData?.publicUrl) {
      console.log(`Successfully created public URL for: ${normalizedPath}`);
      console.log(`Public URL: ${publicUrlData.publicUrl}`);
      return publicUrlData.publicUrl;
    }
    
    console.log('Public URL not available, trying signed URL...');
    
    // Fallback to signed URL if public URL doesn't work
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(normalizedPath, 60 * 30); // 30 minutes expiry

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
    
    console.log(`Successfully created signed URL for: ${normalizedPath}`);
    return data.signedUrl;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return '';
  }
};

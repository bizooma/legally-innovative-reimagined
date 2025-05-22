
import { supabase } from '@/integrations/supabase/client';

// Storage bucket for staff documents
export const STORAGE_BUCKET = 'staff-documents';

// Format file size for display (e.g. 1.2 MB)
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Create a signed URL for a file in storage
export const createSignedUrl = async (filePath: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry
    
    if (error) {
      console.error('Error creating signed URL:', error);
      throw error;
    }
    
    return data.signedUrl;
  } catch (error) {
    console.error('Create signed URL error:', error);
    return '';
  }
};


import { supabase } from '@/integrations/supabase/client';

// Constants
export const STORAGE_BUCKET = 'staff_documents';

/**
 * Format file size in a human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Creates a signed URL for a document
 */
export const createSignedUrl = async (filePath: string, expirySeconds: number = 3600): Promise<string> => {
  const { data } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(filePath, expirySeconds);
  
  return data?.signedUrl || '';
};


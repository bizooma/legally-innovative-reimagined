
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Document } from '@/types/document';
import { formatFileSize, getFileType } from '@/utils/fileUtils';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Uploads a document to Supabase storage 
 */
export async function uploadDocument(
  clientId: string,
  file: File,
  description: string = ''
): Promise<Document | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${clientId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Store description in metadata
    const options = {
      cacheControl: '3600',
      upsert: false,
      metadata: {
        description: description
      }
    };
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, options);
    
    if (uploadError) {
      throw uploadError;
    }
    
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
    
    // Format file size
    const fileSize = formatFileSize(file.size);
    
    // Get file type
    const fileType = getFileType(file.name);
    
    const document: Document = {
      id: filePath,
      name: file.name,
      type: fileType,
      size: fileSize,
      lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      path: filePath,
      url: urlData.publicUrl,
      description: description
    };
    
    return document;
  } catch (error: any) {
    toast.error(`Upload failed: ${error.message}`);
    console.error('Error uploading document:', error);
    return null;
  }
}

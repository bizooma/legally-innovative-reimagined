
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Document } from '@/types/document';
import { formatFileSize, getFileType } from '@/utils/fileUtils';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Uploads a document to Supabase storage and creates a database record
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
    
    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
    
    // Format file details
    const fileSize = formatFileSize(file.size);
    const fileType = getFileType(file.name);
    
    // Create database record
    const { data: dbRecord, error: dbError } = await supabase
      .from('documents')
      .insert({
        client_id: clientId,
        name: file.name,
        description: description,
        file_path: filePath,
        file_size: fileSize,
        file_type: fileType,
        storage_object_id: filePath
      })
      .select()
      .single();
    
    if (dbError) {
      // If database insert fails, clean up the uploaded file
      await supabase.storage.from(BUCKET_NAME).remove([filePath]);
      throw dbError;
    }
    
    const document: Document = {
      id: dbRecord.id,
      name: dbRecord.name,
      type: dbRecord.file_type,
      size: dbRecord.file_size,
      lastUpdated: new Date(dbRecord.updated_at).toISOString().split('T')[0],
      path: dbRecord.file_path,
      url: urlData.publicUrl,
      description: dbRecord.description
    };
    
    return document;
  } catch (error: any) {
    toast.error(`Upload failed: ${error.message}`);
    console.error('Error uploading document:', error);
    return null;
  }
}


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
    console.log('Starting upload for file:', file.name, 'with description:', description);
    
    // Use original filename with client ID as folder path - maintain original name
    const fileName = `${clientId}/${file.name}`;
    const filePath = fileName;
    
    console.log('Upload path:', filePath);
    
    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }
    
    console.log('File uploaded successfully, creating database record...');
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
    
    // Format file details
    const fileSize = formatFileSize(file.size);
    const fileType = getFileType(file.name);
    
    // Create database record with proper timestamp handling
    const { data: dbRecord, error: dbError } = await supabase
      .from('documents')
      .insert({
        client_id: clientId,
        name: file.name, // Keep original filename
        description: description || '', // Ensure description is properly set
        file_path: filePath,
        file_size: fileSize,
        file_type: fileType,
        storage_object_id: filePath,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Database insert error:', dbError);
      // If database insert fails, clean up the uploaded file
      await supabase.storage.from(BUCKET_NAME).remove([filePath]);
      throw dbError;
    }
    
    console.log('Database record created successfully:', dbRecord);
    
    const document: Document = {
      id: dbRecord.id,
      name: dbRecord.name,
      type: dbRecord.file_type,
      size: dbRecord.file_size,
      lastUpdated: new Date(dbRecord.updated_at).toISOString().split('T')[0],
      path: dbRecord.file_path,
      url: urlData.publicUrl,
      description: dbRecord.description || ''
    };
    
    return document;
  } catch (error: any) {
    console.error('Error uploading document:', error);
    toast.error(`Upload failed: ${error.message}`);
    return null;
  }
}

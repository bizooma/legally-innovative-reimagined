
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
    
    // Create a unique filename to avoid duplicates
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const baseName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    const uniqueFileName = `${baseName}_${timestamp}_${randomString}.${fileExtension}`;
    
    // Use client ID as folder path with unique filename
    const filePath = `${clientId}/${uniqueFileName}`;
    
    console.log('Upload path:', filePath);
    console.log('Original filename:', file.name);
    console.log('Unique filename:', uniqueFileName);
    
    // Check if file already exists and remove if it does
    console.log('Checking for existing file...');
    const { data: existingFiles } = await supabase.storage
      .from(BUCKET_NAME)
      .list(clientId);
    
    if (existingFiles) {
      console.log('Existing files in client folder:', existingFiles.map(f => f.name));
    }
    
    // Upload to storage with upsert: true to handle duplicates
    console.log('Uploading file to storage...');
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting if file exists
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      console.error('Upload error details:', {
        message: uploadError.message,
        name: uploadError.name,
        filePath: filePath,
        fileSize: file.size
      });
      throw uploadError;
    }
    
    console.log('File uploaded successfully, creating database record...');
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
    
    console.log('Generated public URL:', urlData.publicUrl);
    
    // Format file details
    const fileSize = formatFileSize(file.size);
    const fileType = getFileType(file.name);
    
    // Create database record with proper timestamp handling
    console.log('Creating database record...');
    const { data: dbRecord, error: dbError } = await supabase
      .from('documents')
      .insert({
        client_id: clientId,
        name: file.name, // Keep original filename for display
        description: description || '', // Ensure description is properly set
        file_path: filePath, // Use unique path for storage
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
      console.error('Database error details:', {
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint
      });
      
      // If database insert fails, clean up the uploaded file
      console.log('Cleaning up uploaded file due to database error...');
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
    
    console.log('Upload completed successfully:', document);
    return document;
  } catch (error: any) {
    console.error('=== UPLOAD ERROR DETAILS ===');
    console.error('Error uploading document:', error);
    console.error('Error type:', typeof error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Client ID:', clientId);
    console.error('File name:', file.name);
    console.error('File size:', file.size);
    console.error('Environment:', window.location.hostname);
    console.error('=== END UPLOAD ERROR ===');
    
    toast.error(`Upload failed: ${error.message}`);
    return null;
  }
}

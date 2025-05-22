
import { supabase } from '@/integrations/supabase/client';
import { StaffDocument, StaffDocumentWithUrl } from './types';
import { STORAGE_BUCKET, formatFileSize, createSignedUrl } from './utils';

/**
 * Upload a document to storage
 */
export const uploadStaffDocument = async (
  file: File,
  description: string | null = null
): Promise<StaffDocument | null> => {
  try {
    // Generate a unique file name to prevent collisions
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}_${file.name.replace(/\.[^/.]+$/, '')}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Create a document record in the database
    const { data: document, error: documentError } = await supabase
      .from('staff_documents')
      .insert({
        name: file.name,
        description: description,
        file_path: filePath,
        file_size: formatFileSize(file.size),
        file_type: file.type,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (documentError) {
      console.error('Error creating document record:', documentError);
      // Clean up the storage if the database insert fails
      await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
      throw documentError;
    }

    return document;
  } catch (error) {
    console.error('Upload staff document error:', error);
    return null;
  }
};

/**
 * Fetch all documents with signed URLs
 */
export const fetchAllDocuments = async (): Promise<StaffDocumentWithUrl[]> => {
  try {
    const { data: documents, error } = await supabase
      .from('staff_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get signed URLs for each document
    const documentsWithUrls = await Promise.all(
      (documents || []).map(async (doc) => {
        const url = await createSignedUrl(doc.file_path);
        
        return {
          ...doc,
          url
        };
      })
    );

    return documentsWithUrls;
  } catch (error) {
    console.error('Fetch documents error:', error);
    return [];
  }
};

/**
 * Delete a document and its file
 */
export const deleteDocument = async (documentId: string): Promise<boolean> => {
  try {
    // First get the document to retrieve the file path
    const { data: document, error: fetchError } = await supabase
      .from('staff_documents')
      .select('file_path')
      .eq('id', documentId)
      .single();

    if (fetchError) throw fetchError;

    // Delete the document from the database
    const { error: deleteError } = await supabase
      .from('staff_documents')
      .delete()
      .eq('id', documentId);

    if (deleteError) throw deleteError;

    // Delete the file from storage
    if (document?.file_path) {
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([document.file_path]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        // We continue even if storage removal fails
      }
    }

    return true;
  } catch (error) {
    console.error('Delete document error:', error);
    return false;
  }
};


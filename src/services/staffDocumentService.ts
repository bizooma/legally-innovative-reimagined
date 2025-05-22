
import { supabase } from '@/integrations/supabase/client';
import { StaffDocument, StaffDocumentWithUrl, StaffDocumentAssignment } from '@/types/staffDocument';
import { StaffMember } from '@/hooks/useStaffMembers';

// Constants
const STORAGE_BUCKET = 'staff_documents';

// Upload a document to storage
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

// Format file size in a human-readable format
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Fetch all documents
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
        const { data } = await supabase.storage
          .from(STORAGE_BUCKET)
          .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

        return {
          ...doc,
          url: data?.signedUrl || ''
        };
      })
    );

    return documentsWithUrls;
  } catch (error) {
    console.error('Fetch documents error:', error);
    return [];
  }
};

// Delete a document
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

// Assign a document to staff members
export const assignDocumentToStaff = async (
  documentId: string,
  staffIds: string[]
): Promise<boolean> => {
  try {
    // Create an array of assignments
    const assignments = staffIds.map(staffId => ({
      document_id: documentId,
      staff_id: staffId,
    }));

    // Insert assignments
    const { error } = await supabase
      .from('staff_document_assignments')
      .insert(assignments);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Assign document error:', error);
    return false;
  }
};

// Get document assignments
export const getDocumentAssignments = async (documentId: string): Promise<StaffMember[]> => {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select(`
        staff_id,
        staff_members:staff_id (*)
      `)
      .eq('document_id', documentId);

    if (error) throw error;

    // Extract the staff members from the data and ensure proper typing
    return data?.map(item => {
      // The item.staff_members is actually an object, not an array
      // Convert it explicitly to the StaffMember type
      return item.staff_members as unknown as StaffMember;
    }) || [];
  } catch (error) {
    console.error('Get document assignments error:', error);
    return [];
  }
};

// Remove a document assignment
export const removeDocumentAssignment = async (
  documentId: string,
  staffId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('staff_document_assignments')
      .delete()
      .match({ document_id: documentId, staff_id: staffId });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Remove assignment error:', error);
    return false;
  }
};

// Get documents assigned to a staff member
export const getStaffDocuments = async (staffId: string): Promise<StaffDocumentWithUrl[]> => {
  try {
    const { data, error } = await supabase
      .from('staff_document_assignments')
      .select(`
        document_id,
        staff_documents:document_id (*)
      `)
      .eq('staff_id', staffId);

    if (error) throw error;

    // Extract the documents and ensure proper typing
    const documents = data?.map(item => {
      // The item.staff_documents is an object, not an array
      // Convert it explicitly to the StaffDocument type
      return item.staff_documents as unknown as StaffDocument;
    }) || [];

    // Get signed URLs for each document
    const documentsWithUrls = await Promise.all(
      documents.map(async (doc) => {
        const { data } = await supabase.storage
          .from(STORAGE_BUCKET)
          .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

        return {
          ...doc,
          url: data?.signedUrl || ''
        };
      })
    );

    return documentsWithUrls;
  } catch (error) {
    console.error('Get staff documents error:', error);
    return [];
  }
};

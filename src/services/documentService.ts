
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const BUCKET_NAME = 'client_documents';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastUpdated: string;
  path: string;
  url: string;
  description: string;
}

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

export async function fetchClientDocuments(clientId: string): Promise<Document[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(`${clientId}/`, {
        sortBy: { column: 'name', order: 'asc' },
      });
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Map the storage objects to our Document interface
    const documents: Document[] = await Promise.all(
      data.filter(item => !item.id.endsWith('/'))
        .map(async (item) => {
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(`${clientId}/${item.name}`);
          
          // Extract description from metadata if available
          const description = item.metadata?.description || '';
          
          return {
            id: item.id,
            name: item.name.split('/').pop() || item.name,
            type: getFileType(item.name),
            size: formatFileSize(item.metadata?.size || 0),
            lastUpdated: new Date(item.updated_at || Date.now()).toISOString().split('T')[0],
            path: `${clientId}/${item.name}`,
            url: urlData.publicUrl,
            description: description
          };
        })
    );
    
    return documents;
  } catch (error: any) {
    toast.error(`Failed to fetch documents: ${error.message}`);
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function updateDocumentDescription(path: string, description: string): Promise<boolean> {
  try {
    // Call the database function we created to update the metadata
    const { data, error } = await supabase.rpc(
      'update_document_description',
      {
        p_path: path,
        p_description: description
      }
    );
    
    if (error) {
      throw error;
    }
    
    return data || false;
  } catch (error: any) {
    toast.error(`Failed to update description: ${error.message}`);
    console.error('Error updating document description:', error);
    return false;
  }
}

export async function deleteDocument(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    toast.error(`Delete failed: ${error.message}`);
    console.error('Error deleting document:', error);
    return false;
  }
}

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  
  const fileTypes: Record<string, string> = {
    'pdf': 'PDF',
    'doc': 'DOC',
    'docx': 'DOCX',
    'xls': 'XLS',
    'xlsx': 'XLSX',
    'ppt': 'PPT',
    'pptx': 'PPTX',
    'txt': 'TXT',
    'csv': 'CSV',
    'jpg': 'JPG',
    'jpeg': 'JPEG',
    'png': 'PNG',
    'gif': 'GIF'
  };
  
  return fileTypes[ext] || ext.toUpperCase();
}

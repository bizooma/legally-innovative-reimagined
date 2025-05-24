
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BUCKET_NAME } from '@/config/documentConfig';
import { getFileType, formatFileSize } from '@/utils/fileUtils';

/**
 * Migrates existing documents from storage to the documents table
 */
export async function migrateStorageDocuments(currentClientId?: string): Promise<{ success: boolean; migrated: number; errors: string[] }> {
  const errors: string[] = [];
  let migrated = 0;

  try {
    console.log('Starting document migration from storage...');

    // List all files in the storage bucket
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (listError) {
      console.error('Error listing files:', listError);
      throw listError;
    }

    if (!files || files.length === 0) {
      console.log('No files found in storage bucket');
      return { success: true, migrated: 0, errors: [] };
    }

    console.log(`Found ${files.length} files in storage, processing...`);

    // Process files in batches to avoid overwhelming the database
    const batchSize = 10;
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      
      for (const file of batch) {
        try {
          await processSingleFile(file, currentClientId);
          migrated++;
          console.log(`Migrated file: ${file.name}`);
        } catch (error) {
          const errorMsg = `Failed to migrate ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          console.error(errorMsg);
          errors.push(errorMsg);
        }
      }

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < files.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`Migration completed. Migrated: ${migrated}, Errors: ${errors.length}`);
    return { success: true, migrated, errors };

  } catch (error) {
    console.error('Migration failed:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error during migration';
    return { success: false, migrated, errors: [...errors, errorMsg] };
  }
}

async function processSingleFile(file: any, fallbackClientId?: string): Promise<void> {
  // Extract client ID from file path (assuming format: clientId/filename or just filename)
  const pathParts = file.name.split('/');
  let clientId: string;
  let fileName: string;
  let filePath: string;

  if (pathParts.length === 2) {
    // Format: clientId/filename
    clientId = pathParts[0];
    fileName = pathParts[1];
    filePath = file.name;
  } else {
    // Format: just filename - use fallback client ID if provided
    fileName = file.name;
    filePath = file.name;
    
    if (fallbackClientId) {
      clientId = fallbackClientId;
      console.log(`Using fallback client ID ${fallbackClientId} for file ${fileName}`);
    } else {
      // Try to extract UUID pattern from filename as potential client ID
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidPattern.test(fileName)) {
        // Check if this UUID corresponds to an existing client
        const { data: clientCheck } = await supabase
          .from('clients')
          .select('id')
          .eq('id', fileName)
          .single();
        
        if (clientCheck) {
          clientId = fileName;
          fileName = `Document_${fileName.substring(0, 8)}`;
          console.log(`Found matching client for UUID filename: ${clientId}`);
        } else {
          throw new Error('Unable to determine client ID for file and no fallback provided');
        }
      } else {
        throw new Error('Unable to determine client ID for file and no fallback provided');
      }
    }
  }

  // Validate that the client exists
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('id', clientId)
    .single();

  if (clientError || !client) {
    throw new Error(`Client ${clientId} not found`);
  }

  // Check if document record already exists
  const { data: existingDoc, error: existingError } = await supabase
    .from('documents')
    .select('id')
    .eq('file_path', filePath)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Error checking existing document: ${existingError.message}`);
  }

  if (existingDoc) {
    console.log(`Document ${fileName} already exists in database, skipping...`);
    return;
  }

  // Get file metadata for size and type
  const fileSize = file.metadata?.size ? formatFileSize(file.metadata.size) : 'Unknown';
  const fileType = getFileType(fileName);

  // Create database record
  const { error: insertError } = await supabase
    .from('documents')
    .insert({
      client_id: clientId,
      name: fileName,
      description: null, // No existing descriptions to migrate
      file_path: filePath,
      file_size: fileSize,
      file_type: fileType,
      storage_object_id: filePath,
      created_at: file.created_at,
      updated_at: file.updated_at || file.created_at
    });

  if (insertError) {
    throw new Error(`Database insert failed: ${insertError.message}`);
  }
}

/**
 * Runs the migration and shows progress to the user
 */
export async function runDocumentMigration(currentClientId?: string): Promise<void> {
  toast.info('Starting document migration...', {
    description: 'This may take a few moments to complete.'
  });

  const result = await migrateStorageDocuments(currentClientId);

  if (result.success) {
    if (result.migrated > 0) {
      toast.success(`Migration completed successfully!`, {
        description: `${result.migrated} documents have been migrated to the database.`
      });
    } else {
      toast.info('Migration completed', {
        description: 'No documents found to migrate.'
      });
    }

    if (result.errors.length > 0) {
      console.warn('Migration completed with some errors:', result.errors);
      toast.warning(`Migration completed with ${result.errors.length} errors`, {
        description: 'Check the console for details.'
      });
    }
  } else {
    toast.error('Migration failed', {
      description: 'Please check the console for error details.'
    });
  }
}

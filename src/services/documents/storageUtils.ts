
import { supabase } from '@/integrations/supabase/client';
import { handleStorageOperation, StorageOperationResult } from '@/utils/storageErrorUtils';

/**
 * Check if a bucket exists in Supabase storage
 * 
 * @param bucketName - The name of the bucket to check
 * @returns A promise resolving to a StorageOperationResult with success status and bucket info if found
 */
export async function checkBucketExists(bucketName: string): Promise<StorageOperationResult> {
  const result = await handleStorageOperation(
    async () => {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      
      if (!buckets || !Array.isArray(buckets)) {
        throw new Error("Invalid response when listing buckets");
      }
      
      const bucket = buckets.find(b => b.name === bucketName);
      if (!bucket) {
        throw new Error(`Bucket "${bucketName}" not found`);
      }
      
      return bucket;
    },
    false
  );
  
  return result;
}

/**
 * Create a storage bucket if it doesn't exist
 * 
 * @param bucketName - The name of the bucket to create
 * @returns A promise resolving to a StorageOperationResult
 */
export async function createBucketIfNotExists(bucketName: string): Promise<StorageOperationResult> {
  return await handleStorageOperation(
    async () => {
      // First check if bucket exists
      const bucketCheck = await checkBucketExists(bucketName);
      if (bucketCheck.success) {
        console.log(`Bucket "${bucketName}" already exists`);
        return bucketCheck.data;
      }

      // Create the bucket
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'text/csv',
          'image/jpeg',
          'image/png',
          'image/gif'
        ],
        fileSizeLimit: 52428800 // 50MB
      });

      if (error) {
        throw error;
      }

      console.log(`Created bucket "${bucketName}" successfully`);
      return data;
    },
    false
  );
}

/**
 * Check if a file exists in a specific bucket
 * 
 * @param bucketName - The name of the bucket to check
 * @param filePath - The file path to check
 * @returns A promise resolving to a StorageOperationResult with success status
 */
export async function checkFileExists(bucketName: string, filePath: string): Promise<StorageOperationResult> {
  return await handleStorageOperation(
    async () => {
      // Get the directory path and filename
      const dirPath = filePath.includes('/') ? filePath.split('/').slice(0, -1).join('/') : '';
      const fileName = filePath.includes('/') ? filePath.split('/').pop() : filePath;
      
      // List files in the directory
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(dirPath);
      
      if (error) throw error;
      
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response when listing files");
      }
      
      console.log(`Checking for file "${fileName}" in bucket "${bucketName}", found files:`, 
        data.map(f => f.name).join(", "));
      
      // Check if the file exists in the directory
      const fileExists = data.some(item => item.name === fileName);
      
      if (!fileExists) {
        throw new Error(`File "${fileName}" not found in bucket "${bucketName}"`);
      }
      
      return true;
    },
    false
  );
}

/**
 * Get a public URL for a file in storage
 * 
 * @param bucketName - The name of the bucket
 * @param filePath - The path to the file
 * @returns A promise resolving to a StorageOperationResult with success status and public URL
 */
export async function getPublicFileUrl(bucketName: string, filePath: string): Promise<StorageOperationResult> {
  return await handleStorageOperation(
    async () => {
      // Use the correct method to get the URL
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    },
    false
  );
}

/**
 * List all files in a storage bucket
 * 
 * @param bucketName - The name of the bucket
 * @param path - Optional path within the bucket
 * @returns A promise resolving to a StorageOperationResult with file list
 */
export async function listStorageFiles(bucketName: string, path: string = ''): Promise<StorageOperationResult> {
  return await handleStorageOperation(
    async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(path, {
          limit: 1000,
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) throw error;
      
      return data || [];
    },
    false
  );
}

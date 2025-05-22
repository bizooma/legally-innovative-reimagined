
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
 * Check if a file exists in a specific bucket
 * 
 * @param bucketName - The name of the bucket to check
 * @param filePath - The file path to check
 * @returns A promise resolving to a StorageOperationResult with success status
 */
export async function checkFileExists(bucketName: string, filePath: string): Promise<StorageOperationResult> {
  // First ensure the bucket exists
  const bucketResult = await checkBucketExists(bucketName);
  if (!bucketResult.success) {
    return bucketResult;
  }
  
  // Now check if file exists in the bucket
  return await handleStorageOperation(
    async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(filePath.includes('/') ? filePath.split('/').slice(0, -1).join('/') : '');
      
      if (error) throw error;
      
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response when listing files");
      }
      
      const fileName = filePath.includes('/') ? filePath.split('/').pop() : filePath;
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
  // First check if the file exists
  const fileResult = await checkFileExists(bucketName, filePath);
  if (!fileResult.success) {
    return fileResult;
  }
  
  // Get the public URL - fixed to return a Promise
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

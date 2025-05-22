
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './utils';

/**
 * Ensure the staff documents storage bucket exists
 */
export async function ensureStorageBucket(): Promise<boolean> {
  try {
    console.log(`Checking if storage bucket '${STORAGE_BUCKET}' exists...`);
    
    // First check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing storage buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
    
    if (bucketExists) {
      console.log(`Storage bucket '${STORAGE_BUCKET}' already exists`);
      return true;
    }
    
    console.log(`Storage bucket '${STORAGE_BUCKET}' not found, creating it...`);
    
    // Create bucket if it doesn't exist
    const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: false,
      fileSizeLimit: 50 * 1024 * 1024 // 50MB
    });
    
    if (createError) {
      console.error('Error creating storage bucket:', createError);
      return false;
    }
    
    console.log(`Storage bucket '${STORAGE_BUCKET}' created successfully`);
    return true;
  } catch (error) {
    console.error('Error ensuring storage bucket exists:', error);
    return false;
  }
}

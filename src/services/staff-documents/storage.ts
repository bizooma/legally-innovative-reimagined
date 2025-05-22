
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './utils';

/**
 * Check if a storage bucket exists and create it if it doesn't
 */
export async function ensureStorageBucket(): Promise<boolean> {
  try {
    console.log(`Checking if storage bucket '${STORAGE_BUCKET}' exists...`);
    
    // First check if bucket exists
    const { data: buckets, error: bucketError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketError) {
      console.error('Error checking storage buckets:', bucketError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
    
    if (bucketExists) {
      console.log(`Storage bucket '${STORAGE_BUCKET}' exists`);
      return true;
    }
    
    console.log(`Storage bucket '${STORAGE_BUCKET}' not found, creating it...`);
    
    // Create bucket if it doesn't exist
    try {
      const { data, error } = await supabase
        .storage
        .createBucket(STORAGE_BUCKET, {
          public: false,
          fileSizeLimit: 52428800, // 50MB
        });
      
      if (error) {
        console.error('Error creating storage bucket:', error);
        return false;
      }
      
      console.log(`Storage bucket '${STORAGE_BUCKET}' created successfully`);
      return true;
    } catch (createError) {
      console.error('Error creating storage bucket:', createError);
      // If bucket creation fails due to permissions, assume it exists and return true
      // This allows the application to continue working if the bucket already exists
      // but the current user doesn't have permission to create buckets
      return false;
    }
  } catch (error) {
    console.error('Error in ensureStorageBucket:', error);
    return false;
  }
}

/**
 * Check if user has access to manage document storage
 * (Useful for determining if UI elements should be shown)
 */
export async function userCanManageDocumentStorage(): Promise<boolean> {
  // This is a simplified check - in a real app, you would check permissions more thoroughly
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    return true;
  } catch (error) {
    console.error('Error checking storage permissions:', error);
    return false;
  }
}

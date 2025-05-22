
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './utils';
import { toast } from '@/hooks/use-toast';

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
    
    // If we're here, the bucket doesn't exist
    console.log(`Storage bucket '${STORAGE_BUCKET}' not found.`);
    
    // Instead of trying to create the bucket automatically (which might fail due to RLS),
    // we'll assume it needs to be created by an admin and just return false
    
    // Display a toast notification about the missing bucket for better user feedback
    toast({
      title: "Storage configuration issue",
      description: "Please contact an administrator to set up document storage.",
      variant: "destructive",
    });
    
    // Return false to indicate that the bucket doesn't exist or we can't access it
    return false;
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

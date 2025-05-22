
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
      toast({
        title: "Storage access error",
        description: `Unable to access document storage: ${bucketError.message}`,
        variant: "destructive",
      });
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
    
    if (bucketExists) {
      console.log(`Storage bucket '${STORAGE_BUCKET}' exists`);
      
      // Additional check: Try to list files to verify we have access
      const { error: listError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .list();
        
      if (listError) {
        console.error(`Bucket exists but cannot list files: ${listError.message}`);
        toast({
          title: "Storage permission issue",
          description: "You don't have permission to access document storage",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    }
    
    // If we're here, the bucket doesn't exist
    console.log(`Storage bucket '${STORAGE_BUCKET}' not found.`);
    
    // Display a toast notification about the missing bucket for better user feedback
    toast({
      title: "Storage configuration issue",
      description: "Please contact an administrator to set up document storage.",
      variant: "destructive",
    });
    
    return false;
  } catch (error) {
    console.error('Error in ensureStorageBucket:', error);
    toast({
      title: "Storage error",
      description: "There was a problem connecting to document storage.",
      variant: "destructive",
    });
    return false;
  }
}

/**
 * Check if user has access to manage document storage
 * (Useful for determining if UI elements should be shown)
 */
export async function userCanManageDocumentStorage(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    // First check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();
      
    if (!userError && userData?.is_admin) {
      return true; // Admin users have full access
    }
    
    // Then try to list files as a test of permission
    const { error: listError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list();
    
    return !listError; // No error means we have access
  } catch (error) {
    console.error('Error checking storage permissions:', error);
    return false;
  }
}

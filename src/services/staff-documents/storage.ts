
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './fileUtils';
import { toast } from '@/hooks/use-toast';

/**
 * Check if a storage bucket exists and create it if it doesn't
 */
export async function ensureStorageBucket(): Promise<boolean> {
  try {
    console.log(`Checking if storage bucket '${STORAGE_BUCKET}' exists...`);
    
    // First try to list files to check if we have access to the bucket
    const { data: files, error: listError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list('', { limit: 1 });
      
    if (listError) {
      console.error(`Error listing files in bucket: ${listError.message}`);
      
      // Check if bucket exists by trying to get bucket details
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === STORAGE_BUCKET);
      
      if (!bucketExists) {
        console.error(`Storage bucket "${STORAGE_BUCKET}" not found`);
        
        toast({
          title: "Storage setup required",
          description: "Document storage bucket not found. Please contact an administrator.",
          variant: "default",
        });
        return false;
      } else {
        // Bucket exists but we can't list files - likely a permissions issue
        console.error(`Bucket exists but there may be permission issues: ${listError.message}`);
        
        toast({
          title: "Storage access issue",
          description: "You may not have permission to access document storage.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    // Success! We were able to list files in the bucket
    console.log(`Successfully connected to bucket '${STORAGE_BUCKET}'. Found ${files?.length || 0} files.`);
    
    return true;
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
    
    // Try checking bucket existence without creating it
    const { error: listError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list('', { limit: 1 });
    
    return !listError; // No error means we have access
  } catch (error) {
    console.error('Error checking storage permissions:', error);
    return false;
  }
}

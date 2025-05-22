
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
      const { data, error: listError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .list();
        
      if (listError) {
        console.error(`Bucket exists but cannot list files: ${listError.message}`);
        
        if (listError.message.includes('Not found') || listError.message.includes('does not exist')) {
          // This suggests the bucket exists in the database but not in storage
          toast({
            title: "Storage inconsistency",
            description: "Document storage exists but may need repair. Please contact an administrator.",
            variant: "warning",
          });
        } else {
          // Permission issue likely
          console.warn('User may not have permissions to list files, but bucket exists');
        }
        
        // Return true since the bucket exists, even if we can't list files
        // This allows document names to be displayed even without URLs
        return true;
      }
      
      console.log(`Successfully accessed bucket. Found ${data?.length || 0} files.`);
      toast({
        title: "Storage connected",
        description: "Document storage is properly configured.",
      });
      
      return true;
    }
    
    console.log(`Storage bucket '${STORAGE_BUCKET}' not found.`);
    
    // Show a message that storage is not available
    toast({
      title: "Storage setup required",
      description: "Document storage needs to be set up by an administrator.",
      variant: "warning",
    });
    
    // Return false indicating bucket is not available yet
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
    
    // Try checking bucket existence without creating it
    const { data: buckets, error: bucketError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketError) {
      console.error('Error checking storage buckets:', bucketError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
    if (!bucketExists) return false;
    
    // If bucket exists, try to list files to check permissions
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

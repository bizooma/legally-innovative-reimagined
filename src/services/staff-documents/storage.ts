
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './fileUtils';
import { toast } from '@/hooks/use-toast';

/**
 * Check if a storage bucket exists and create it if it doesn't
 */
export async function ensureStorageBucket(): Promise<boolean> {
  try {
    console.log(`Checking if storage bucket '${STORAGE_BUCKET}' exists...`);
    
    // Check if the bucket exists
    const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets();
    
    if (listBucketsError) {
      console.error(`Error listing buckets: ${listBucketsError.message}`);
      toast({
        title: "Storage error",
        description: "Error retrieving storage information.",
        variant: "destructive",
      });
      return false;
    }
    
    const bucketExists = buckets?.some(b => b.name === STORAGE_BUCKET);
    
    if (!bucketExists) {
      console.error(`Storage bucket "${STORAGE_BUCKET}" not found`);
      
      // Instead of trying to create the bucket which requires admin privileges, 
      // just notify the user
      toast({
        title: "Storage setup required",
        description: "Document storage bucket not found. Please contact an administrator.",
        variant: "default",
      });
      return false;
    }
    
    // If bucket exists, check its public status
    const { data: bucketInfo, error: getBucketError } = await supabase.storage.getBucket(STORAGE_BUCKET);
    
    if (getBucketError) {
      console.error(`Error getting bucket info: ${getBucketError.message}`);
      return false;
    }
    
    const isPublic = bucketInfo?.public || false;
    console.log(`Bucket '${STORAGE_BUCKET}' exists and public status is: ${isPublic}`);
    
    // Even if the bucket is not public, we'll try to proceed
    // But warn the user if it's not public
    if (!isPublic) {
      console.warn(`Bucket '${STORAGE_BUCKET}' exists but is not public. Documents may not be accessible.`);
      toast({
        title: "Storage configuration issue",
        description: "Document storage may not be configured for public access. Contact an administrator if documents aren't viewable.",
        variant: "default",
      });
    }
    
    // Test bucket access by listing files
    const { data: files, error: listError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list('', { limit: 10 });
      
    if (listError) {
      console.error(`Error listing files in bucket: ${listError.message}`);
      
      toast({
        title: "Storage access issue",
        description: "You may not have permission to access document storage.",
        variant: "destructive",
      });
      return isPublic; // Return public status even if we can't list files
    }
    
    // Success! We were able to list files in the bucket
    console.log(`Successfully connected to bucket '${STORAGE_BUCKET}'. Found ${files?.length || 0} files.`);
    
    if (files && files.length > 0) {
      console.log('Sample files:', files.slice(0, 3).map(f => f.name).join(', ') + (files.length > 3 ? '...' : ''));
    }
    
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

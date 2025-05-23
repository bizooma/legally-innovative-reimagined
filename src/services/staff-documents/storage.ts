
import { supabase } from '@/integrations/supabase/client';
import { STORAGE_BUCKET } from './utils';
import { toast } from '@/hooks/use-toast';

/**
 * Check if a storage bucket exists and create it if it doesn't
 */
export async function ensureStorageBucket(): Promise<boolean> {
  try {
    console.log(`Checking if storage bucket '${STORAGE_BUCKET}' exists...`);
    
    // First try to create the bucket if it doesn't exist
    // This is more reliable than just checking if it exists
    const { data: createData, error: createError } = await supabase
      .storage
      .createBucket(STORAGE_BUCKET, {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB limit
        allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      });
      
    if (createError) {
      // Error might be because bucket already exists, which is fine
      console.log(`Could not create bucket: ${createError.message}`);
      if (!createError.message.includes('already exists')) {
        console.error('Error creating storage bucket:', createError);
      }
    } else {
      console.log(`Successfully created bucket '${STORAGE_BUCKET}'`);
      
      toast({
        title: "Storage configured",
        description: "Document storage has been set up successfully.",
      });
      
      return true;
    }
    
    // Verify bucket exists by attempting to list files
    const { data: files, error: listError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .list();
      
    if (listError) {
      console.error(`Error listing files in bucket: ${listError.message}`);
      
      if (listError.message.includes('Not found') || listError.message.includes('does not exist')) {
        toast({
          title: "Storage setup required",
          description: "Document storage needs to be configured by an administrator.",
          variant: "warning",
        });
        return false;
      } else {
        // Permission issue likely
        toast({
          title: "Storage access issue",
          description: "You may not have permission to access document storage.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    console.log(`Successfully verified bucket '${STORAGE_BUCKET}'. Found ${files?.length || 0} files.`);
    toast({
      title: "Storage connected",
      description: "Document storage is properly configured.",
    });
    
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

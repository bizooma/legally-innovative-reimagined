
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { handleStorageOperation, isConnectionError } from "@/utils/storageErrorUtils";
import { checkBucketExists, checkFileExists as checkFileExistsUtil } from "@/services/documents/storageUtils";

interface StorageBucketStatus {
  isChecking: boolean;
  hasError: boolean;
  isRetrying: boolean;
  errorMessage?: string;
}

export const useStorageBucketCheck = (bucketName: string) => {
  const [status, setStatus] = useState<StorageBucketStatus>({
    isChecking: true,
    hasError: false,
    isRetrying: false,
    errorMessage: undefined
  });

  const checkBucketExistsInternal = async () => {
    try {
      console.log(`Checking if bucket "${bucketName}" exists...`);
      
      // First try to list files in the bucket - this is a more reliable way to check
      const { data: files, error: filesError } = await supabase.storage
        .from(bucketName)
        .list();
        
      if (filesError) {
        console.error("Error listing files in bucket:", filesError);
        
        // If we can't list files, try a direct bucket existence check
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === bucketName);
        
        if (!bucketExists) {
          setStatus(prev => ({ 
            ...prev, 
            hasError: true, 
            isChecking: false,
            errorMessage: `Storage bucket "${bucketName}" not found. Please check your configuration.`
          }));
          return false;
        } else {
          // Bucket exists but we can't list files - likely a permissions issue
          setStatus(prev => ({ 
            ...prev, 
            hasError: true, 
            isChecking: false,
            errorMessage: `The storage bucket "${bucketName}" exists but there may be permission issues. ${filesError.message}`
          }));
          return false;
        }
      }
      
      // If we get here, we were able to list files in the bucket
      console.log(`Successfully connected to bucket "${bucketName}". Files found:`, files?.length || 0);
      if (files) {
        console.log("Files in bucket:", files.map(f => f.name).join(", "));
      }
      
      setStatus(prev => ({ ...prev, hasError: false, isChecking: false, errorMessage: undefined }));
      return true;
      
    } catch (err) {
      console.error("Failed to check bucket existence:", err);
      setStatus(prev => ({ 
        ...prev, 
        hasError: true, 
        isChecking: false,
        errorMessage: err instanceof Error ? err.message : "Unknown error checking bucket"
      }));
      return false;
    }
  };

  const checkFileExists = useCallback(async (fileName: string): Promise<boolean> => {
    try {
      console.log(`Checking if file "${fileName}" exists in bucket "${bucketName}"...`);
      
      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list();
      
      if (error) {
        console.error("Error checking file existence:", error);
        return false;
      }
      
      const fileExists = files?.some(f => f.name === fileName);
      console.log(`File "${fileName}" ${fileExists ? "exists" : "does not exist"} in bucket "${bucketName}"`);
      
      if (files && files.length > 0) {
        console.log("Available files:", files.map(f => f.name).join(", "));
      }
      
      return !!fileExists;
    } catch (err) {
      console.error("Error checking file existence:", err);
      return false;
    }
  }, [bucketName]);

  const retryBucketCheck = async () => {
    setStatus(prev => ({ ...prev, isRetrying: true, isChecking: true }));
    
    try {
      await checkBucketExistsInternal();
    } finally {
      setStatus(prev => ({ ...prev, isRetrying: false }));
    }
  };

  // Initial check on mount
  useEffect(() => {
    checkBucketExistsInternal();
  }, [bucketName]);

  return {
    ...status,
    retryBucketCheck,
    checkFileExists
  };
};

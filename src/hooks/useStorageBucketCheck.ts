
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { handleStorageOperation, isConnectionError, isNotFoundError } from "@/utils/storageErrorUtils";
import { checkBucketExists } from "@/services/documentService";

interface StorageBucketStatus {
  isChecking: boolean;
  hasError: boolean;
  isRetrying: boolean;
}

export const useStorageBucketCheck = (bucketName: string) => {
  const [status, setStatus] = useState<StorageBucketStatus>({
    isChecking: true,
    hasError: false,
    isRetrying: false
  });

  const checkBucketExistsInternal = async () => {
    try {
      console.log(`Checking if bucket "${bucketName}" exists...`);
      
      // Use the checkBucketExists utility from documentService
      const result = await checkBucketExists(bucketName);
      
      if (!result.success) {
        console.error("Error checking bucket:", result.errorMessage);
        setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
        return false;
      }
      
      // If we get here, the bucket exists
      setStatus(prev => ({ ...prev, hasError: false, isChecking: false }));
      return true;
      
    } catch (err) {
      console.error("Failed to check bucket existence:", err);
      setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
      return false;
    }
  };

  const checkFileExists = async (fileName: string) => {
    try {
      const result = await handleStorageOperation(
        async () => {
          const { data, error } = await supabase.storage.from(bucketName).list();
          if (error) throw error;
          
          if (!data || !Array.isArray(data)) {
            throw new Error("Invalid response format when listing files");
          }
          
          return data;
        },
        false
      );
      
      if (!result.success) {
        console.error("Error listing files:", result.errorMessage);
        return false;
      }
      
      const files = result.data;
      console.log(`Files in bucket "${bucketName}":`, files.map(f => f.name));
      
      const fileExists = files.some(f => f.name === fileName);
      if (!fileExists) {
        console.warn(`File "${fileName}" not found in bucket "${bucketName}"`);
        return false;
      } else {
        console.log(`File "${fileName}" found in bucket "${bucketName}"`);
        return true;
      }
    } catch (err) {
      console.error("Error checking file existence:", err);
      return false;
    }
  };

  const retryBucketCheck = async (fileName?: string) => {
    setStatus(prev => ({ ...prev, isRetrying: true, hasError: false }));
    
    try {
      const bucketExists = await checkBucketExistsInternal();
      
      if (bucketExists && fileName) {
        await checkFileExists(fileName);
      }
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

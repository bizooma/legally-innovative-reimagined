
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { handleStorageOperation, isConnectionError } from "@/utils/storageErrorUtils";
import { checkBucketExists, checkFileExists as checkFileExistsUtil } from "@/services/documents/storageUtils";

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
      
      // Use the checkBucketExists utility from storageUtils
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

  const checkFileExists = useCallback(async (fileName: string): Promise<boolean> => {
    try {
      const result = await checkFileExistsUtil(bucketName, fileName);
      
      if (!result.success) {
        console.error("Error checking file existence:", result.errorMessage);
        return false;
      }
      
      return true;
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

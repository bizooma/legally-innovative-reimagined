
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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

  const checkBucketExists = async () => {
    try {
      console.log(`Checking if bucket "${bucketName}" exists...`);
      
      // Force a refresh of the buckets list to ensure we have the latest data
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error("Error checking buckets:", error);
        setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
        return false;
      }
      
      if (!buckets || buckets.length === 0) {
        console.warn("No storage buckets found in Supabase");
        setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
        return false;
      }
      
      console.log("Available buckets:", buckets.map(b => b.name));
      
      const bucketExists = buckets.some(b => b.name === bucketName);
      if (!bucketExists) {
        console.warn(`Bucket "${bucketName}" not found in list:`, buckets.map(b => b.name));
        setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
        return false;
      } else {
        setStatus(prev => ({ ...prev, hasError: false, isChecking: false }));
        return true;
      }
    } catch (err) {
      console.error("Failed to check bucket existence:", err);
      setStatus(prev => ({ ...prev, hasError: true, isChecking: false }));
      return false;
    }
  };

  const checkFileExists = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list();
      
      if (error) {
        console.error("Error listing files:", error);
        return false;
      }
      
      console.log(`Files in bucket "${bucketName}":`, data?.map(f => f.name));
      
      const fileExists = data?.some(f => f.name === fileName);
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
      const bucketExists = await checkBucketExists();
      
      if (bucketExists && fileName) {
        await checkFileExists(fileName);
      }
    } finally {
      setStatus(prev => ({ ...prev, isRetrying: false }));
    }
  };

  // Initial check on mount
  useEffect(() => {
    checkBucketExists();
  }, [bucketName]);

  return {
    ...status,
    retryBucketCheck,
    checkFileExists
  };
};

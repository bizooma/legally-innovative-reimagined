
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VALID_DOWNLOAD_BUCKETS } from "@/config/documentConfig";
import { toast } from "@/components/ui/use-toast";

export const useResourceValidation = () => {
  const [bucketsAvailable, setBucketsAvailable] = useState<string[]>([]);
  const [isCheckingBuckets, setIsCheckingBuckets] = useState(true);

  // Check if the required buckets exist when the component mounts
  useEffect(() => {
    const checkBuckets = async () => {
      setIsCheckingBuckets(true);
      try {
        console.log("Checking available buckets...");
        const { data: buckets, error } = await supabase.storage.listBuckets();
        
        if (error) {
          console.error("Error checking buckets:", error);
          toast({
            title: "Storage Connection Error",
            description: "Could not connect to storage. Some downloads may not be available.",
            variant: "destructive",
          });
          return;
        }
        
        if (!buckets || buckets.length === 0) {
          console.warn("No storage buckets found");
          toast({
            title: "Storage Configuration Issue",
            description: "No storage buckets found. Downloads will not be available.",
            variant: "destructive",
          });
          return;
        }
        
        const bucketNames = buckets.map(b => b.name);
        console.log("Available buckets:", bucketNames);
        setBucketsAvailable(bucketNames);
        
        // Check if our required buckets exist
        const missingBuckets = VALID_DOWNLOAD_BUCKETS.filter(
          bucketName => !bucketNames.includes(bucketName)
        );
        
        if (missingBuckets.length > 0) {
          console.warn(`Warning: The following buckets do not exist: ${missingBuckets.join(', ')}`);
          toast({
            title: "Some Resources Unavailable",
            description: `Some download resources may not be available due to storage configuration.`,
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Failed to check buckets:", err);
        toast({
          title: "Storage Connection Error",
          description: "Failed to check storage availability. Some features may not work properly.",
          variant: "destructive",
        });
      } finally {
        setIsCheckingBuckets(false);
      }
    };
    
    checkBuckets();
  }, []);

  return {
    bucketsAvailable,
    isCheckingBuckets
  };
};


import { toast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Error types that can occur with Supabase Storage operations
 */
export type StorageErrorType = 
  | "not_found" 
  | "bucket_not_found" 
  | "file_not_found" 
  | "unauthorized" 
  | "connection" 
  | "unknown";

/**
 * Result of a storage operation with error information
 */
export interface StorageOperationResult {
  success: boolean;
  errorType?: StorageErrorType;
  errorMessage?: string;
  data?: any;
}

/**
 * Parse a Supabase storage error and determine its type
 */
export function parseStorageError(error: PostgrestError | Error | unknown): StorageErrorType {
  const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';
  
  // Handle specific Supabase storage error patterns
  if (errorMessage.includes("bucket not found") || errorMessage.includes("does not exist")) {
    return "bucket_not_found";
  }
  
  if (errorMessage.includes("file not found") || errorMessage.includes("object not found")) {
    return "file_not_found";
  }
  
  if (errorMessage.includes("unauthorized") || 
      errorMessage.includes("permission denied") || 
      errorMessage.includes("access denied")) {
    return "unauthorized";
  }
  
  if (errorMessage.includes("network") || 
      errorMessage.includes("timeout") || 
      errorMessage.includes("connection") || 
      errorMessage.includes("fetch")) {
    return "connection";
  }
  
  return "unknown";
}

/**
 * Get a user-friendly error message based on the error type
 */
export function getStorageErrorMessage(errorType: StorageErrorType): string {
  switch (errorType) {
    case "bucket_not_found":
      return "Storage location not found. Please check your configuration.";
    case "file_not_found":
      return "The requested file could not be found.";
    case "unauthorized":
      return "You don't have permission to access this file.";
    case "connection":
      return "Connection issue detected. Please check your internet connection.";
    case "not_found":
      return "Resource not found.";
    case "unknown":
    default:
      return "An unexpected error occurred with storage. Please try again later.";
  }
}

/**
 * Handle a storage operation and return a standardized result
 * @param operation - The storage operation to perform
 * @param notifyOnError - Whether to show a toast notification on error
 */
export async function handleStorageOperation<T>(
  operation: () => Promise<T>,
  notifyOnError: boolean = true
): Promise<StorageOperationResult> {
  try {
    const data = await operation();
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Storage operation failed:", error);
    
    const errorType = parseStorageError(error);
    const errorMessage = getStorageErrorMessage(errorType);
    
    if (notifyOnError) {
      toast({
        title: "Storage Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    
    return {
      success: false,
      errorType,
      errorMessage,
    };
  }
}

/**
 * Check if an error is related to connection issues
 */
export function isConnectionError(errorType: StorageErrorType): boolean {
  return errorType === "connection";
}

/**
 * Check if an error is related to resource not found
 */
export function isNotFoundError(errorType: StorageErrorType): boolean {
  return errorType === "bucket_not_found" || errorType === "file_not_found" || errorType === "not_found";
}

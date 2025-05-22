
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ResourceErrorStateProps {
  isRetrying: boolean;
  onRetry: () => void;
  errorMessage?: string;
  errorType?: "connection" | "not-found" | "generic";
}

export const ResourceErrorState = ({ 
  isRetrying, 
  onRetry, 
  errorMessage = "Storage connection issue detected",
  errorType = "connection"
}: ResourceErrorStateProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant={errorType === "not-found" ? "default" : "destructive"} className="py-2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-sm font-medium">
          {errorType === "not-found" ? "Resource unavailable" : "Storage connection error"}
        </AlertTitle>
        <AlertDescription className="text-xs mt-1">
          {errorMessage}
        </AlertDescription>
      </Alert>
      
      <Button
        variant="outline"
        className="flex items-center justify-center w-full sm:w-auto"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {isRetrying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {errorType === "not-found" ? "Checking..." : "Retrying..."}
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            {errorType === "not-found" ? "Check Again" : "Retry Connection"}
          </>
        )}
      </Button>
    </div>
  );
};

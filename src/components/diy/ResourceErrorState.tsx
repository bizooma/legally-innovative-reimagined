
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";

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
      <div className={`text-sm flex items-center gap-1.5 ${errorType === "not-found" ? "text-amber-600" : "text-red-600"}`}>
        <AlertCircle className="h-4 w-4" />
        <span>{errorMessage}</span>
      </div>
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

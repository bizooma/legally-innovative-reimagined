
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";

interface ResourceErrorStateProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export const ResourceErrorState = ({ isRetrying, onRetry }: ResourceErrorStateProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-red-600 text-sm flex items-center gap-1.5">
        <AlertCircle className="h-4 w-4" />
        <span>Storage connection issue detected</span>
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
            Connecting...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry connection
          </>
        )}
      </Button>
    </div>
  );
};

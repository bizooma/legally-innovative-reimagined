import { useProviderStatus } from "@/hooks/useProviderStatus";
import { ProviderStatusChip } from "./ProviderStatusChip";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StatusTickerProps {
  autoRefresh?: boolean;
  className?: string;
}

export const StatusTicker = ({ autoRefresh = true, className = "" }: StatusTickerProps) => {
  const { data: providers, isLoading, error } = useProviderStatus(autoRefresh ? 60000 : undefined);

  if (isLoading) {
    return (
      <div className={`w-full bg-card border-y py-4 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-48 rounded-full flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full bg-destructive/10 border-y border-destructive/20 py-4 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Unable to load provider status</span>
          </div>
        </div>
      </div>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <div className={`w-full bg-muted border-y py-4 ${className}`}>
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">No provider data available</p>
        </div>
      </div>
    );
  }

  const operationalCount = providers.filter(p => p.status === "operational").length;
  const degradedCount = providers.filter(p => p.status === "degraded").length;
  const outageCount = providers.filter(p => p.status === "major_outage").length;
  const issueCount = degradedCount + outageCount;
  
  const allOperational = operationalCount === providers.length;
  const latestCheck = providers[0]?.last_checked;

  return (
    <div className={`w-full bg-card border-y ${className}`}>
      <div className="container mx-auto px-4 py-4">
        {/* Summary Banner */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {allOperational ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">All systems operational</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">
                  Issues detected with {issueCount} {issueCount === 1 ? 'provider' : 'providers'}
                </span>
              </>
            )}
          </div>
          {latestCheck && (
            <span className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(latestCheck), { addSuffix: true })}
            </span>
          )}
        </div>

        {/* Scrolling Ticker */}
        <div 
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollBehavior: 'smooth' }}
          role="region"
          aria-label="Provider status ticker"
        >
          {providers.map((provider) => (
            <ProviderStatusChip key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

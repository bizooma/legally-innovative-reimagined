import { formatDistanceToNow } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import type { ProviderStatusRecord } from "@/types/providerStatus";

interface ProviderStatusChipProps {
  provider: ProviderStatusRecord;
}

const statusConfig = {
  operational: {
    color: "bg-green-500",
    text: "text-green-700",
    label: "Operational",
  },
  degraded: {
    color: "bg-yellow-500",
    text: "text-yellow-700",
    label: "Degraded",
  },
  major_outage: {
    color: "bg-red-500",
    text: "text-red-700",
    label: "Major Outage",
  },
  unknown: {
    color: "bg-gray-400",
    text: "text-gray-700",
    label: "Unknown",
  },
};

export const ProviderStatusChip = ({ provider }: ProviderStatusChipProps) => {
  const config = statusConfig[provider.status as keyof typeof statusConfig];
  const lastChecked = formatDistanceToNow(new Date(provider.last_checked), { addSuffix: true });

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div 
          className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full hover:scale-105 transition-transform cursor-pointer whitespace-nowrap"
          role="button"
          tabIndex={0}
          aria-label={`${provider.name} status: ${config.label}`}
        >
          {/* Icon Circle */}
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
            {provider.icon_initials}
          </div>
          
          {/* Provider Name */}
          <span className="text-sm font-medium text-foreground">
            {provider.name}
          </span>
          
          {/* Status Badge */}
          <div className={`px-2 py-0.5 rounded-full ${config.color}`}>
            <span className={`text-xs font-semibold ${config.text}`}>
              {config.label}
            </span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{provider.name}</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Summary:</span> {provider.summary}
            </div>
            <div className="text-xs text-muted-foreground">
              Last checked {lastChecked}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

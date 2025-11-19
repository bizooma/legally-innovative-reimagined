import { useProviderStatus } from "@/hooks/useProviderStatus";
import { ProviderStatusChip } from "./ProviderStatusChip";
import { Skeleton } from "@/components/ui/skeleton";

export const StatusTickerEmbed = () => {
  const { data: providers, isLoading } = useProviderStatus(60000);

  if (isLoading) {
    return (
      <div className="w-full bg-background p-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-40 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-background p-2">
      <div 
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {providers.map((provider) => (
          <ProviderStatusChip key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

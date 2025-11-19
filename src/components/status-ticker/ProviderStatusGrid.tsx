import React from 'react';
import { ProviderStatusCard } from './ProviderStatusCard';
import type { ProviderStatusRecord } from '@/types/providerStatus';

interface ProviderStatusGridProps {
  providers: ProviderStatusRecord[];
}

export const ProviderStatusGrid: React.FC<ProviderStatusGridProps> = ({ providers }) => {
  // Group providers by category
  const groupedProviders = providers.reduce((acc, provider) => {
    const category = provider.category || 'cloud';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(provider);
    return acc;
  }, {} as Record<string, ProviderStatusRecord[]>);

  const categoryLabels = {
    cloud: 'Cloud Infrastructure',
    deployment: 'Deployment Platforms',
    version_control: 'Version Control'
  };

  return (
    <div className="space-y-12">
      {Object.entries(groupedProviders).map(([category, categoryProviders]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-primary">
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              ({categoryProviders.length} {categoryProviders.length === 1 ? 'provider' : 'providers'})
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProviders.map((provider) => (
              <ProviderStatusCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

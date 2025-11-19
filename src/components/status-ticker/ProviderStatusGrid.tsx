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
    <div className="space-y-16">
      {Object.entries(groupedProviders).map(([category, categoryProviders]) => (
        <div key={category}>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </h2>
            <p className="text-white/50 text-sm">
              {categoryProviders.length} {categoryProviders.length === 1 ? 'provider' : 'providers'}
            </p>
          </div>
          
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

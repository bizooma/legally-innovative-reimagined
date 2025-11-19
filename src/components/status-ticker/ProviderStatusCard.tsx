import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ProviderStatusRecord } from '@/types/providerStatus';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, History } from 'lucide-react';
import { useProviderIncidents } from '@/hooks/useProviderIncidents';
import { IncidentTimeline } from './IncidentTimeline';

interface ProviderStatusCardProps {
  provider: ProviderStatusRecord;
}

export const ProviderStatusCard: React.FC<ProviderStatusCardProps> = ({ provider }) => {
  const [showIncidents, setShowIncidents] = useState(false);
  const { data: incidents, isLoading: incidentsLoading } = useProviderIncidents(provider.id, 20);
  const getStatusConfig = () => {
    switch (provider.status) {
      case 'operational':
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          label: 'Operational',
          ring: 'ring-green-500/20'
        };
      case 'degraded':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          label: 'Degraded',
          ring: 'ring-yellow-500/20'
        };
      case 'major_outage':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          label: 'Major Outage',
          ring: 'ring-red-500/20'
        };
      default:
        return {
          icon: HelpCircle,
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          label: 'Unknown',
          ring: 'ring-border'
        };
    }
  };

  const getCategoryConfig = () => {
    switch (provider.category) {
      case 'cloud':
        return { label: 'Cloud', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400' };
      case 'deployment':
        return { label: 'Deployment', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400' };
      case 'version_control':
        return { label: 'Version Control', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400' };
      default:
        return { label: 'Other', color: 'bg-muted text-muted-foreground' };
    }
  };

  const statusConfig = getStatusConfig();
  const categoryConfig = getCategoryConfig();
  const StatusIcon = statusConfig.icon;

  const logoUrl = provider.logo_url || `/provider-logos/${provider.slug}.svg`;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-2 ${statusConfig.border} relative overflow-hidden`}>
      {/* Animated status ring */}
      <div 
        className={`absolute -inset-0.5 ${statusConfig.bg} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${statusConfig.ring} ring-2`}
        aria-hidden="true"
      />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Provider Logo with brand color accent */}
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center bg-background border-2 shadow-sm"
              style={{ borderColor: provider.brand_color + '40' }}
            >
              <img 
                src={logoUrl} 
                alt={`${provider.name} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback to initials if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                className="w-8 h-8 hidden items-center justify-center text-xs font-bold"
                style={{ color: provider.brand_color }}
              >
                {provider.icon_initials}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">{provider.name}</h3>
              <Badge variant="outline" className={`mt-1 ${categoryConfig.color} border-0`}>
                {categoryConfig.label}
              </Badge>
            </div>
          </div>

          {/* Animated Status Indicator */}
          <div className="relative">
            <div className={`absolute inset-0 ${statusConfig.bg} rounded-full animate-pulse`} />
            <StatusIcon className={`w-6 h-6 ${statusConfig.color} relative z-10`} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          {provider.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            {incidents && incidents.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {incidents.filter(i => i.status !== 'resolved').length || incidents.length} incidents
              </Badge>
            )}
          </div>
          
          <Dialog open={showIncidents} onOpenChange={setShowIncidents}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span className="text-xs">History</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-background border-2 shadow-sm"
                    style={{ borderColor: provider.brand_color + '40' }}
                  >
                    <img 
                      src={logoUrl} 
                      alt={`${provider.name} logo`}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{provider.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      Incident History
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                {incidentsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
                    <p className="mt-4 text-sm text-muted-foreground">Loading incident history...</p>
                  </div>
                ) : (
                  <IncidentTimeline incidents={incidents || []} />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

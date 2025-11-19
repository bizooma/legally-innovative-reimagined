import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import type { ProviderStatusRecord } from '@/types/providerStatus';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Clock, History } from 'lucide-react';
import { useProviderIncidents } from '@/hooks/useProviderIncidents';
import { IncidentTimeline } from './IncidentTimeline';

interface ProviderStatusChipProps {
  provider: ProviderStatusRecord;
}

const statusConfigMap = {
  operational: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-700 dark:text-green-400',
    icon: CheckCircle2,
    ring: 'ring-green-500'
  },
  degraded: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-700 dark:text-yellow-400',
    icon: AlertTriangle,
    ring: 'ring-yellow-500'
  },
  major_outage: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-700 dark:text-red-400',
    icon: XCircle,
    ring: 'ring-red-500'
  },
  unknown: {
    bg: 'bg-muted',
    border: 'border-border',
    text: 'text-muted-foreground',
    icon: HelpCircle,
    ring: 'ring-muted'
  },
};

export const ProviderStatusChip = ({ provider }: ProviderStatusChipProps) => {
  const statusConfig = statusConfigMap[provider.status as keyof typeof statusConfigMap] || statusConfigMap.unknown;
  const StatusIcon = statusConfig.icon;
  const { data: incidents, isLoading: incidentsLoading } = useProviderIncidents(provider.id, 5);
  
  const getCategoryColor = () => {
    switch (provider.category) {
      case 'cloud':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'deployment':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'version_control':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const categoryColor = getCategoryColor();
  const logoUrl = provider.logo_url || `/provider-logos/${provider.slug}.svg`;

  const formatLastChecked = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div
          className={`
            group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl
            border-2 cursor-pointer transition-all duration-300
            hover:scale-105 hover:shadow-lg
            ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text}
          `}
          role="button"
          tabIndex={0}
          aria-label={`${provider.name} status: ${provider.status}`}
        >
          {/* Animated status ring */}
          <div 
            className={`absolute -inset-0.5 ${statusConfig.bg} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${statusConfig.ring} ring-1`}
            aria-hidden="true"
          />
          
          {/* Provider Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-background/50 border shadow-sm"
              style={{ borderColor: provider.brand_color + '40' }}
            >
              <img 
                src={logoUrl} 
                alt={`${provider.name} logo`}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                className="w-6 h-6 hidden items-center justify-center text-xs font-bold"
                style={{ color: provider.brand_color }}
              >
                {provider.icon_initials}
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-semibold whitespace-nowrap">
                {provider.name}
              </span>
              <Badge variant="outline" className={`mt-0.5 text-xs px-1.5 py-0 h-4 ${categoryColor} border-0`}>
                {provider.category.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Animated Status Indicator */}
          <div className="relative z-10">
            <div className={`absolute inset-0 ${statusConfig.bg} rounded-full animate-pulse`} />
            <StatusIcon className="w-4 h-4 relative" />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center bg-background border-2 shadow-sm flex-shrink-0"
              style={{ borderColor: provider.brand_color + '40' }}
            >
              <img 
                src={logoUrl} 
                alt={`${provider.name} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
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
            
            <div className="flex-1">
              <h4 className="font-bold text-lg">{provider.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {provider.description || 'No description available'}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={`${categoryColor} border-0`}>
                  {provider.category.replace('_', ' ')}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} border-0`}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {provider.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-3 border-t">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Current Status
              </p>
              <p className="text-sm">{provider.summary}</p>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Last updated: {formatLastChecked(provider.last_checked)}</span>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                Recent Incidents
              </p>
              {incidents && incidents.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {incidents.filter(i => i.status !== 'resolved').length || incidents.length}
                </Badge>
              )}
            </div>
            
            {incidentsLoading ? (
              <div className="text-center py-4">
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
              </div>
            ) : (
              <IncidentTimeline incidents={incidents || []} compact />
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

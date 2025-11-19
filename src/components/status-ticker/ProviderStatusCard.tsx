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
          color: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          label: 'Operational',
          ring: 'ring-green-500/30',
          glow: 'shadow-green-500/20',
          gradient: 'from-green-500/20 via-green-500/10 to-transparent'
        };
      case 'degraded':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          label: 'Degraded',
          ring: 'ring-yellow-500/30',
          glow: 'shadow-yellow-500/20',
          gradient: 'from-yellow-500/20 via-yellow-500/10 to-transparent'
        };
      case 'major_outage':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          label: 'Major Outage',
          ring: 'ring-red-500/30',
          glow: 'shadow-red-500/20',
          gradient: 'from-red-500/20 via-red-500/10 to-transparent'
        };
      default:
        return {
          icon: HelpCircle,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          label: 'Unknown',
          ring: 'ring-gray-500/30',
          glow: 'shadow-gray-500/20',
          gradient: 'from-gray-500/20 via-gray-500/10 to-transparent'
        };
    }
  };

  const getCategoryConfig = () => {
    switch (provider.category) {
      case 'cloud':
        return { label: 'Cloud', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'deployment':
        return { label: 'Deployment', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      case 'version_control':
        return { label: 'Version Control', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' };
      default:
        return { label: 'Other', color: 'bg-gray-500/10 text-gray-400 border-gray-500/30' };
    }
  };

  const statusConfig = getStatusConfig();
  const categoryConfig = getCategoryConfig();
  const StatusIcon = statusConfig.icon;
  const isNonOperational = provider.status !== 'operational';

  const logoUrl = provider.logo_url || `/provider-logos/${provider.slug}.svg`;

  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-500
      bg-white/10 backdrop-blur-2xl border-2 ${statusConfig.border}
      hover:bg-white/15 hover:shadow-2xl ${statusConfig.glow}
      hover:scale-[1.02] hover:-translate-y-1
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
      ring-1 ring-white/10
    `}>
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.gradient} opacity-30`} />
      
      {/* Animated Border Gradient */}
      <div className={`
        absolute -inset-[2px] bg-gradient-to-br ${statusConfig.gradient} rounded-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10
      `} />
      
      <CardContent className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Provider Logo with Status Pulse */}
            <div className="relative">
              <div 
                className={`
                  w-14 h-14 rounded-xl flex items-center justify-center 
                  bg-black/40 backdrop-blur-sm border-2 shadow-lg
                  transition-all duration-300 group-hover:scale-110
                  ${isNonOperational ? 'border-red-500/50' : 'border-white/20'}
                `}
                style={{ 
                  borderColor: isNonOperational ? undefined : provider.brand_color + '40',
                }}
              >
                {/* Animated Pulse Ring for Non-Operational */}
                {isNonOperational && (
                  <>
                    <div className={`
                      absolute inset-0 rounded-xl ${statusConfig.bg} 
                      animate-ping opacity-75
                    `} />
                    <div className={`
                      absolute inset-0 rounded-xl ${statusConfig.border} border-2
                      animate-pulse
                    `} />
                  </>
                )}
                
                <img 
                  src={logoUrl} 
                  alt={`${provider.name} logo`}
                  className={`
                    w-9 h-9 object-contain relative z-10
                    ${isNonOperational ? 'animate-pulse' : ''}
                  `}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-9 h-9 hidden items-center justify-center text-xs font-bold relative z-10"
                  style={{ color: provider.brand_color }}
                >
                  {provider.icon_initials}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-white">{provider.name}</h3>
              <Badge variant="outline" className={`mt-1 ${categoryConfig.color} border`}>
                {categoryConfig.label}
              </Badge>
            </div>
          </div>

          {/* Animated Status Indicator */}
          <div className="relative">
            <div className={`
              absolute inset-0 ${statusConfig.bg} rounded-full 
              ${isNonOperational ? 'animate-pulse' : ''}
            `} />
            <StatusIcon className={`w-6 h-6 ${statusConfig.color} relative z-10`} />
          </div>
        </div>

        <p className="text-sm text-white/80 mb-4 line-clamp-2">
          {provider.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            {incidents && incidents.length > 0 && (
              <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                {incidents.filter(i => i.status !== 'resolved').length || incidents.length} incidents
              </Badge>
            )}
          </div>
          
          <Dialog open={showIncidents} onOpenChange={setShowIncidents}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-1.5 text-white/70 hover:text-white hover:bg-white/10"
              >
                <History className="w-3.5 h-3.5" />
                <span className="text-xs">History</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/95 backdrop-blur-xl border-white/20">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-white">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border-2 shadow-sm"
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
                    <div className="text-sm font-normal text-white/60">
                      Incident History
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                {incidentsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
                    <p className="mt-4 text-sm text-white/60">Loading incident history...</p>
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

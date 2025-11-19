import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Wrench, CheckCircle2, Clock } from 'lucide-react';
import type { ProviderIncident } from '@/types/providerIncident';
import { formatDistanceToNow } from 'date-fns';

interface IncidentTimelineProps {
  incidents: ProviderIncident[];
  compact?: boolean;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ 
  incidents, 
  compact = false 
}) => {
  const getIncidentIcon = (type: string, severity: string) => {
    if (type === 'maintenance') {
      return { icon: Wrench, color: 'text-blue-500' };
    }
    
    switch (severity) {
      case 'critical':
        return { icon: AlertCircle, color: 'text-red-500' };
      case 'major':
        return { icon: AlertTriangle, color: 'text-orange-500' };
      default:
        return { icon: AlertTriangle, color: 'text-yellow-500' };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'major':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'outage':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'monitoring':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'identified':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'Ongoing';
    
    if (minutes < 60) return `${Math.round(minutes)}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  if (incidents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
        <p className="font-medium">No incidents reported</p>
        <p className="text-sm mt-1">This provider has been operating smoothly</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident, index) => {
        const { icon: Icon, color } = getIncidentIcon(incident.incident_type, incident.severity);
        const isResolved = incident.status === 'resolved';

        return (
          <Card 
            key={incident.id}
            className={`p-4 ${compact ? 'p-3' : 'p-4'} transition-all duration-200 hover:shadow-md border-l-4 ${
              isResolved ? 'border-l-green-500' : 'border-l-orange-500'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Timeline connector */}
              {!compact && index < incidents.length - 1 && (
                <div className="absolute left-[29px] top-12 w-0.5 h-full bg-border -mb-4" />
              )}
              
              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isResolved ? 'bg-green-500/10' : 'bg-orange-500/10'
              }`}>
                {isResolved ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Icon className={`w-4 h-4 ${color}`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className={`font-semibold ${compact ? 'text-sm' : 'text-base'}`}>
                    {incident.title}
                  </h4>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(incident.incident_type)} border-0`}
                    >
                      {incident.incident_type}
                    </Badge>
                    {incident.incident_type !== 'maintenance' && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSeverityColor(incident.severity)} border-0`}
                      >
                        {incident.severity}
                      </Badge>
                    )}
                  </div>
                </div>

                {!compact && incident.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDistanceToNow(new Date(incident.started_at), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(incident.status)} border-0`}
                  >
                    {incident.status}
                  </Badge>

                  {incident.duration_minutes !== null && (
                    <span className="font-medium">
                      Duration: {formatDuration(incident.duration_minutes)}
                    </span>
                  )}

                  {incident.affected_services && incident.affected_services.length > 0 && (
                    <span className="text-xs">
                      Affected: {incident.affected_services.join(', ')}
                    </span>
                  )}
                </div>

                {isResolved && incident.resolved_at && (
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>
                      Resolved {formatDistanceToNow(new Date(incident.resolved_at), { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

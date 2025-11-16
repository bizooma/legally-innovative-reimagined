import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, PauseCircle, PlayCircle } from 'lucide-react';

interface ProjectStatusBadgeProps {
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  className?: string;
}

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Completed':
        return {
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'In Progress':
        return {
          icon: PlayCircle,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'On Hold':
        return {
          icon: PauseCircle,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      default: // Not Started
        return {
          icon: Clock,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${className || ''}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </Badge>
  );
};

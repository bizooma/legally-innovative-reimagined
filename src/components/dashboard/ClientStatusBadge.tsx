import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ClientStatusBadgeProps {
  status: 'active' | 'paused' | 'terminated';
}

const statusConfig = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 hover:bg-green-100'
  },
  paused: {
    label: 'Paused',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
  },
  terminated: {
    label: 'Terminated',
    className: 'bg-red-100 text-red-800 hover:bg-red-100'
  }
};

export const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

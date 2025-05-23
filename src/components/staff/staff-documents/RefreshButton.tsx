
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onRefresh: () => void;
  isRefetching: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isRefetching }) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onRefresh}
      disabled={isRefetching}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
  );
};

export default RefreshButton;

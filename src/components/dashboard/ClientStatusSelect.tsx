import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ClientStatusSelectProps {
  status: 'active' | 'paused' | 'terminated';
  onStatusChange: (status: 'active' | 'paused' | 'terminated') => void;
  disabled?: boolean;
}

export const ClientStatusSelect: React.FC<ClientStatusSelectProps> = ({ 
  status, 
  onStatusChange,
  disabled = false
}) => {
  return (
    <Select value={status} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Active
          </div>
        </SelectItem>
        <SelectItem value="paused">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Paused
          </div>
        </SelectItem>
        <SelectItem value="terminated">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Terminated
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

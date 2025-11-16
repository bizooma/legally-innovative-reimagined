import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, Clock, PauseCircle, PlayCircle } from 'lucide-react';

interface ProjectStatusSelectProps {
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  onStatusChange: (status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed') => void;
  disabled?: boolean;
}

export const ProjectStatusSelect: React.FC<ProjectStatusSelectProps> = ({ 
  status, 
  onStatusChange,
  disabled = false
}) => {
  return (
    <Select value={status} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger className="w-[150px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Not Started">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-500" />
            Not Started
          </div>
        </SelectItem>
        <SelectItem value="In Progress">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-3 h-3 text-blue-500" />
            In Progress
          </div>
        </SelectItem>
        <SelectItem value="On Hold">
          <div className="flex items-center gap-2">
            <PauseCircle className="w-3 h-3 text-yellow-500" />
            On Hold
          </div>
        </SelectItem>
        <SelectItem value="Completed">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-500" />
            Completed
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

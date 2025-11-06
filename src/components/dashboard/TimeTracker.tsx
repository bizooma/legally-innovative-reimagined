import React, { useState } from 'react';
import { Play, Square, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Client } from '@/types/database';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';

interface TimeTrackerProps {
  clients: Client[];
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ clients }) => {
  const { timerState, elapsedSeconds, startTimer, stopTimer, cancelTimer, isRunning } = useTimeTracker();
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [description, setDescription] = useState('');

  const activeClients = clients.filter((c) => c.status === 'active');

  const handleStart = () => {
    if (!selectedClientId) return;
    startTimer(selectedClientId, description);
    setDescription('');
  };

  const handleStop = async () => {
    await stopTimer();
    setSelectedClientId('');
  };

  const handleCancel = () => {
    cancelTimer();
    setSelectedClientId('');
    setDescription('');
  };

  if (isRunning) {
    const currentClient = clients.find((c) => c.id === timerState.clientId);
    return (
      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-2xl font-mono font-bold">{formatDuration(elapsedSeconds)}</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{currentClient?.company_name}</div>
            {timerState.description && (
              <div className="text-xs text-muted-foreground">{timerState.description}</div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleStop} size="sm" variant="default">
              <Square className="w-4 h-4 mr-1" />
              Stop
            </Button>
            <Button onClick={handleCancel} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Select value={selectedClientId} onValueChange={setSelectedClientId}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {activeClients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.company_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleStart} disabled={!selectedClientId} size="sm">
          <Play className="w-4 h-4 mr-1" />
          Start
        </Button>
      </div>
    </Card>
  );
};

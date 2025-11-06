import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar, Plus } from 'lucide-react';
import { Client } from '@/types/database';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import { TimeEntriesTable } from './TimeEntriesTable';
import { ManualTimeEntryDialog } from './ManualTimeEntryDialog';
import { formatDuration } from '@/hooks/useTimeTracker';
import { startOfToday, startOfWeek, startOfMonth, endOfToday } from 'date-fns';

interface TimeTrackingSectionProps {
  clients: Client[];
}

export const TimeTrackingSection: React.FC<TimeTrackingSectionProps> = ({ clients }) => {
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  
  const {
    entries,
    isLoading,
    filters,
    setFilters,
    deleteEntry,
    refreshEntries,
    getClientTotals,
    getTotalSeconds,
  } = useTimeEntries({ clients, autoRefresh: true });

  const handleDateRangeChange = (range: string) => {
    const now = new Date();
    switch (range) {
      case 'today':
        setFilters({
          ...filters,
          startDate: startOfToday().toISOString(),
          endDate: endOfToday().toISOString(),
        });
        break;
      case 'week':
        setFilters({
          ...filters,
          startDate: startOfWeek(now).toISOString(),
          endDate: now.toISOString(),
        });
        break;
      case 'month':
        setFilters({
          ...filters,
          startDate: startOfMonth(now).toISOString(),
          endDate: now.toISOString(),
        });
        break;
      case 'all':
      default:
        setFilters({
          ...filters,
          startDate: '',
          endDate: '',
        });
        break;
    }
  };

  const clientTotals = getClientTotals();
  const totalSeconds = getTotalSeconds();

  return (
    <div className="space-y-6">
      <ManualTimeEntryDialog
        open={isManualEntryOpen}
        onOpenChange={setIsManualEntryOpen}
        clients={clients}
        entry={null}
        onSuccess={refreshEntries}
      />
      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Time Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{formatDuration(totalSeconds)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Across {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time by Client</CardTitle>
          </CardHeader>
          <CardContent>
            {clientTotals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No time entries yet</p>
            ) : (
              <div className="space-y-2">
                {clientTotals.slice(0, 3).map((total) => (
                  <div key={total.client_id} className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate mr-2">
                      {total.client_name}
                    </span>
                    <span className="text-sm font-mono">{total.total_formatted}</span>
                  </div>
                ))}
                {clientTotals.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{clientTotals.length - 3} more clients
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={filters.clientId || 'all'}
              onValueChange={(value) =>
                setFilters({ ...filters, clientId: value === 'all' ? '' : value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleDateRangeChange} defaultValue="all">
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-auto">
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsManualEntryOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
              <Button variant="outline" size="sm" onClick={refreshEntries}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries Table */}
      <TimeEntriesTable
        entries={entries}
        onDelete={deleteEntry}
        onUpdate={refreshEntries}
        clients={clients}
        isLoading={isLoading}
      />
    </div>
  );
};

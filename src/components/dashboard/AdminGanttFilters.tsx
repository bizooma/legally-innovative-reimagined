import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AdminGanttFiltersProps {
  clients: Array<{ id: string; name: string }>;
  selectedClient: string;
  selectedStatus: string;
  searchQuery: string;
  onClientChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Not Started', label: 'Not Started' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'On Hold', label: 'On Hold' },
  { value: 'Completed', label: 'Completed' },
];

export function AdminGanttFilters({
  clients,
  selectedClient,
  selectedStatus,
  searchQuery,
  onClientChange,
  onStatusChange,
  onSearchChange,
  onClearFilters,
}: AdminGanttFiltersProps) {
  const hasActiveFilters = selectedClient !== 'all' || selectedStatus !== 'all' || searchQuery !== '';

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Client Filter */}
      <Select value={selectedClient} onValueChange={onClientChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Clients" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Clients</SelectItem>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px] max-w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          maxLength={100}
        />
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}

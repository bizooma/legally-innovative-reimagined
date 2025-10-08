import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { ProjectTask } from '@/types/task';

interface KanbanFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const KanbanFilters: React.FC<KanbanFiltersProps> = ({
  searchTerm,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Filters & Search</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto h-7 px-2"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xs">Search Tasks</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-xs">Filter by Priority</Label>
          <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort" className="text-xs">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Default Order</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="due_date">Due Date</SelectItem>
              <SelectItem value="created_at">Created Date</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

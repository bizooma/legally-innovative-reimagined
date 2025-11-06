import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import { Client } from '@/types/database';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeEntryWithClient, TimeEntry } from '@/types/timeEntry';
import { formatDuration } from '@/hooks/useTimeTracker';
import { ManualTimeEntryDialog } from './ManualTimeEntryDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TimeEntriesTableProps {
  entries: TimeEntryWithClient[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
  clients: Client[];
  isLoading: boolean;
}

export const TimeEntriesTable: React.FC<TimeEntriesTableProps> = ({
  entries,
  onDelete,
  onUpdate,
  clients,
  isLoading,
}) => {
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (entry: TimeEntryWithClient) => {
    setEditingEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setEditingEntry(null);
    onUpdate();
  };
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading time entries...</p>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No time entries found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <ManualTimeEntryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        clients={clients}
        entry={editingEntry}
        onSuccess={handleEditSuccess}
      />

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {format(new Date(entry.start_time), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="font-medium">
                  {entry.client_name || 'Unknown Client'}
                </TableCell>
                <TableCell>
                  {format(new Date(entry.start_time), 'hh:mm a')}
                </TableCell>
                <TableCell className="font-mono">
                  {entry.duration_seconds ? formatDuration(entry.duration_seconds) : '-'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {entry.description || '-'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Time Entry?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this time entry.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(entry.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </>
  );
};

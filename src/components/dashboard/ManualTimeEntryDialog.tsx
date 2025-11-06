import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Client } from '@/types/database';
import { TimeEntry } from '@/types/timeEntry';
import { timeTrackingService } from '@/services/timeTrackingService';
import { useToast } from '@/hooks/use-toast';

const timeEntrySchema = z.object({
  client_id: z.string().min(1, 'Client is required'),
  date: z.date({ required_error: 'Date is required' }),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  description: z.string().optional(),
}).refine((data) => {
  // Validate end time is after start time
  const [startHour, startMin] = data.start_time.split(':').map(Number);
  const [endHour, endMin] = data.end_time.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  return endMinutes > startMinutes;
}, {
  message: 'End time must be after start time',
  path: ['end_time'],
});

type TimeEntryFormData = z.infer<typeof timeEntrySchema>;

interface ManualTimeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  entry?: TimeEntry | null;
  onSuccess: () => void;
}

export const ManualTimeEntryDialog: React.FC<ManualTimeEntryDialogProps> = ({
  open,
  onOpenChange,
  clients,
  entry,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TimeEntryFormData>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      client_id: '',
      date: new Date(),
      start_time: '09:00',
      end_time: '17:00',
      description: '',
    },
  });

  // Populate form when editing an existing entry
  useEffect(() => {
    if (entry) {
      const startDate = new Date(entry.start_time);
      const endDate = entry.end_time ? new Date(entry.end_time) : new Date();
      
      form.reset({
        client_id: entry.client_id,
        date: startDate,
        start_time: format(startDate, 'HH:mm'),
        end_time: format(endDate, 'HH:mm'),
        description: entry.description || '',
      });
    } else {
      form.reset({
        client_id: '',
        date: new Date(),
        start_time: '09:00',
        end_time: '17:00',
        description: '',
      });
    }
  }, [entry, form]);

  const onSubmit = async (data: TimeEntryFormData) => {
    setIsSubmitting(true);
    try {
      // Combine date with times
      const startDateTime = new Date(data.date);
      const [startHour, startMin] = data.start_time.split(':').map(Number);
      startDateTime.setHours(startHour, startMin, 0, 0);

      const endDateTime = new Date(data.date);
      const [endHour, endMin] = data.end_time.split(':').map(Number);
      endDateTime.setHours(endHour, endMin, 0, 0);

      const durationSeconds = Math.floor(
        (endDateTime.getTime() - startDateTime.getTime()) / 1000
      );

      if (entry) {
        // Update existing entry
        await timeTrackingService.updateTimeEntry(entry.id, {
          client_id: data.client_id,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          duration_seconds: durationSeconds,
          description: data.description || null,
        });

        toast({
          title: 'Success',
          description: 'Time entry updated successfully',
        });
      } else {
        // Create new entry
        await timeTrackingService.createTimeEntry({
          client_id: data.client_id,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          duration_seconds: durationSeconds,
          description: data.description || null,
        });

        toast({
          title: 'Success',
          description: 'Time entry created successfully',
        });
      }

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error saving time entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to save time entry',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeClients = clients.filter((c) => c.status === 'active');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {entry ? 'Edit Time Entry' : 'Manual Time Entry'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className={cn('p-3 pointer-events-auto')}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="time"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="time"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What did you work on?"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : entry ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

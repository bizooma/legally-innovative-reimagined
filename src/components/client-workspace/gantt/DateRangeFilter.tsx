import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  startDate: Date;
  endDate: Date;
  onRangeChange: (start: Date, end: Date) => void;
}

export function DateRangeFilter({ startDate, endDate, onRangeChange }: DateRangeFilterProps) {
  const [tempStart, setTempStart] = useState<Date>(startDate);
  const [tempEnd, setTempEnd] = useState<Date>(endDate);

  const handleApply = () => {
    onRangeChange(tempStart, tempEnd);
  };

  const handlePreset = (days: number) => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - Math.floor(days / 2));
    const end = new Date(today);
    end.setDate(today.getDate() + Math.floor(days / 2));
    
    setTempStart(start);
    setTempEnd(end);
    onRangeChange(start, end);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {format(startDate, 'MMM d, yyyy')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={tempStart}
            onSelect={(date) => date && setTempStart(date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
          <div className="p-3 border-t">
            <Button onClick={handleApply} size="sm" className="w-full">Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <span className="text-muted-foreground">to</span>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {format(endDate, 'MMM d, yyyy')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={tempEnd}
            onSelect={(date) => date && setTempEnd(date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
          <div className="p-3 border-t">
            <Button onClick={handleApply} size="sm" className="w-full">Apply</Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex gap-1 ml-2">
        <Button variant="ghost" size="sm" onClick={() => handlePreset(60)}>
          60 days
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handlePreset(90)}>
          90 days
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handlePreset(120)}>
          120 days
        </Button>
      </div>
    </div>
  );
}

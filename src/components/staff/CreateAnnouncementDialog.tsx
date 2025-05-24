
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface CreateAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnnouncementCreated: (announcement: { id: string; title: string; content: string; created_at: string }) => void;
}

const CreateAnnouncementDialog: React.FC<CreateAnnouncementDialogProps> = ({
  open,
  onOpenChange,
  onAnnouncementCreated,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add effect to track when the dialog open state changes
  useEffect(() => {
    console.log('CreateAnnouncementDialog: open prop changed to:', open);
  }, [open]);

  console.log('CreateAnnouncementDialog render:', { open, title, content });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('CreateAnnouncementDialog: Form submitted', { title, content });
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create announcement object
      const newAnnouncement = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        created_at: new Date().toISOString(),
      };

      console.log('CreateAnnouncementDialog: Creating announcement', newAnnouncement);

      // Call the callback to add to parent state
      onAnnouncementCreated(newAnnouncement);

      // Reset form
      setTitle('');
      setContent('');
      onOpenChange(false);

      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    console.log('CreateAnnouncementDialog: Closing dialog');
    setTitle('');
    setContent('');
    onOpenChange(false);
  };

  // Debug the dialog rendering
  console.log('CreateAnnouncementDialog: About to render with open =', open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement that will be visible to all staff members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="announcement-title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              id="announcement-title"
              type="text"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="announcement-content" className="block text-sm font-medium">
              Content
            </label>
            <Textarea
              id="announcement-content"
              placeholder="Enter announcement content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !content.trim() || isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Announcement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;

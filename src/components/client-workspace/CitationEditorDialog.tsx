import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientCitation } from '@/services/diagramService';

interface CitationEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  citation: ClientCitation | null;
  clientId: string;
  onSave: (citation: ClientCitation) => Promise<void>;
}

const CitationEditorDialog: React.FC<CitationEditorDialogProps> = ({
  isOpen,
  onOpenChange,
  citation,
  clientId,
  onSave,
}) => {
  const [formData, setFormData] = useState<ClientCitation>({
    client_id: clientId,
    node_id: '',
    label: '',
    type: 'website',
    url: '',
    status: 'active',
  });

  useEffect(() => {
    if (citation) {
      setFormData(citation);
    } else {
      setFormData({
        client_id: clientId,
        node_id: `citation-${Date.now()}`,
        label: '',
        type: 'website',
        url: '',
        status: 'active',
      });
    }
  }, [citation, clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onOpenChange(false);
  };

  const citationTypes = [
    { value: 'website', label: 'Website' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'yelp', label: 'Yelp' },
    { value: 'google', label: 'Google Business' },
    { value: 'avvo', label: 'Avvo' },
    { value: 'directory', label: 'Directory' },
    { value: 'review', label: 'Review Site' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {citation ? 'Edit Citation' : 'Add New Citation'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="e.g., Main Website, Facebook Page"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {citationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url || ''}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {citation ? 'Update' : 'Add'} Citation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CitationEditorDialog;

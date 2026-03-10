import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit2, Save, X, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface TrainingEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: 'knowledge', label: 'Knowledge' },
  { value: 'instruction', label: 'Instruction' },
  { value: 'correction', label: 'Correction' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'policy', label: 'Policy' },
];

export function ChatbotTrainingManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('knowledge');
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['chatbot-training-entries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_training_entries')
        .select('*')
        .order('category')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as TrainingEntry[]) || [];
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (entry: { id?: string; title: string; content: string; category: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      if (entry.id) {
        const { error } = await supabase
          .from('chatbot_training_entries')
          .update({ title: entry.title, content: entry.content, category: entry.category })
          .eq('id', entry.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('chatbot_training_entries')
          .insert({ title: entry.title, content: entry.content, category: entry.category, created_by: session.user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-training-entries'] });
      resetForm();
      toast.success(editingId ? 'Entry updated' : 'Entry added');
    },
    onError: (e) => toast.error(e.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('chatbot_training_entries')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chatbot-training-entries'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('chatbot_training_entries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-training-entries'] });
      toast.success('Entry deleted');
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setTitle('');
    setContent('');
    setCategory('knowledge');
  };

  const startEdit = (e: TrainingEntry) => {
    setEditingId(e.id);
    setTitle(e.title);
    setContent(e.content);
    setCategory(e.category);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    upsertMutation.mutate({ id: editingId || undefined, title, content, category });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Add custom knowledge, instructions, or corrections that Biz will use in conversations.
        </p>
        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Entry
          </Button>
        )}
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="e.g., Holiday Hours" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              placeholder="Enter the knowledge or instruction text..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmit} disabled={upsertMutation.isPending} className="gap-2">
              <Save className="h-4 w-4" /> {editingId ? 'Update' : 'Save'}
            </Button>
            <Button size="sm" variant="ghost" onClick={resetForm} className="gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading entries...</p>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="mx-auto h-10 w-10 mb-2 opacity-50" />
          <p>No training entries yet</p>
          <p className="text-xs mt-1">Add knowledge to customize how Biz responds</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className={`border rounded-lg p-4 ${!e.is_active ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{e.title}</h4>
                    <Badge variant="outline" className="text-xs">{e.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">{e.content}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch
                    checked={e.is_active}
                    onCheckedChange={(checked) => toggleMutation.mutate({ id: e.id, is_active: checked })}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(e)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => deleteMutation.mutate(e.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
